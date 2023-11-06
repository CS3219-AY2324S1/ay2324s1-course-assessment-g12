const express = require('express');
var app = express();
const axios = require("axios");
const cors = require("cors");
const PORT = 3003;
const backendURL = "http://localhost:3005"
const socket = require('socket.io');
const http = require('http');
const uuid = require('uuid');

const rooms = new Map();

const easyQueue = [];
const mediumQueue = [];
const hardQueue = [];

// const server = http.createServer(app);
const socketServer = require('socket.io')(3003, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3006"],
    }
});

const questionURL = 'http://localhost:3002';
const dbURL = 'http://localhost:3005';
    // Generate a random integer between min (inclusive) and max (exclusive)
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

function createRoom(user1, user2, difficulty, socket, userData1, userData2) {
    const room = {
        id: uuid.v4(),
        difficulty: difficulty,
        players: [user1, user2],
        status: "waiting",
        submit: [],
        question: null,
        code: null,
        dataUser1: userData1,
        dataUser2: userData2,
    };
    console.log("room" + room.id);
    rooms.set(room.id, room);
    console.log("room");
    user1.join(room.id);
    user2.join(room.id);
    console.log("matched");
    const fetchQuestions = async () => {
        try {
          const response = await axios.get(`${questionURL}/questions/filter`, {
            params: {
              categories: [],
              difficulty: difficulty,
              limit: 'List All',
            },
          });
          const idx = getRandomInt(0, response.data.length)
          const question = response.data[idx];
          room.question = question;
          socket.to(room.id).emit("matchFound", room.id, user1.id, user2.id, question);
          user2.to(room.id).emit("matchFound", room.id, user1.id, user2.id, question);
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      };
    fetchQuestions();
}

socketServer.on("connection", (socket) => {
    console.log("Socket connected: " + socket.id);

    socket.on("submit_question", (socket_id, room) => {
        console.log("submitting question");
        const current_room = rooms.get(room);
        const player_1 = current_room.players[0];
        const player_2 = current_room.players[1];
        const submitQueue = current_room.submit;
        if (submitQueue.length === 0 ) {
            submitQueue.push(socket_id);
            const message = "System: " + socket_id + " has queue for submit, waiting for other user."; 
            player_1.to(room).emit("get-message", message);
            player_2.to(room).emit("get-message", message);
        }else if (socket_id !== submitQueue[0]) {
            player_1.to(room).emit("leave_room");
            player_2.to(room).emit("leave_room");
            const now = new Date();
            const day = now.getDay(); // returns a number representing the day of the week, starting with 0 for Sunday
            const hours = now.getHours();
            const minutes = now.getMinutes();

            const submitAttempt = async () => {
                try {
                  const object = await axios.get(`${dbURL}/user/question`, {
                    params: {
                        username :  player_1,
                        question : player_1,
                        partner : player_2,
                        completed : true,
                        date : day,
                        code : current_room.code
                    },
                  });
                } catch (error) {
                  console.error('Error submitting attempt:', error);
                }
              };
            submitAttempt();
             
        }
    });

    socket.on("joinQueue", (difficulty, userData) => {
        console.log(socket + "User joined on difficulty: " + difficulty);
        var match = null;
        data = {
            socket: socket,
            userData: userData
        }
        if (difficulty === "Easy") {
            if (easyQueue.length > 0) {
                match = easyQueue.shift();
            } else {
                easyQueue.push(data);
            }
        } else if (difficulty === "Medium") {
            if (mediumQueue.length > 0) {
                match = mediumQueue.shift();
            } else {
                mediumQueue.push(data);
            }
        } else if (difficulty === "Hard") {
            if (hardQueue.length > 0) {
                match = hardQueue.shift();
            } else {
                hardQueue.push(data);
            }
        }
        //console.log(socket.id + " " + match.socket);
        if(match !== null) {
            console.log("match" + match.id);
            createRoom(socket, match.socket, difficulty, socket, data.userData, match.userData);
            console.log("user 1= "+data.userData.username);
            console.log("user 2= "+ match.userData.username);
        }
    });

    socket.on("timeout", (difficulty) => {
        console.log(socket + "User exited on difficulty: " + difficulty);
        
        if (difficulty === "Easy") {
            easyQueue.shift();  
        } else if (difficulty === "Medium") {
            mediumQueue.shift();  
        } else {
            hardQueue.shift();
        }

        console.log(easyQueue)
        console.log(mediumQueue)
        console.log(hardQueue)
    });

    socket.on("compile_code", (data, room) => {
        var config = {
            method: 'post',
            url: 'https://online-code-compiler.p.rapidapi.com/v1/',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '3dc08aa7c6msh757331c2706afc7p1a327bjsn1963009b32c9',
                'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
              },
            data: {
                language: 'python3',
                version: 'latest',
                code: data,
                input: null
            }
        };
        room.code = data;

        axios(config)
        .then(function (response) {
            const current_room = rooms.get(room);
            const player_1 = current_room.players[0];
            const player_2 = current_room.players[1];
            player_1.to(room).emit("compile_result", response.data.output);
            player_2.to(room).emit("compile_result", response.data.output);
        })
        .catch(function (error) {
            console.log(error);
        });
    });

    socket.on("cancel", (difficulty) => {
        console.log(socket + "User canceled on difficulty: " + difficulty);
        
        if (difficulty === "Easy") {
            easyQueue.shift();  
        } else if (difficulty === "Medium") {
            mediumQueue.shift();  
        } else {
            hardQueue.shift();
        }
    });

    socket.on("renew", (difficulty) => {
        console.log(socket + "User canceled on difficulty: " + difficulty);
    });

    socket.on("disconnect", () => {
        console.log("Socket disconnected: " + socket.id);
    });

    socket.on("send-message", (userMessage, socket_id, room) => {
        console.log(socket_id + " sent message to room " + room);
        const current_room = rooms.get(room);
        const player_1 = current_room.players[0];
        const player_2 = current_room.players[1];
        message = "";
        console.log(room)
        console.log(player_2.id)
        console.log(player_1.id)
        console.log(socket_id)
        if (player_1.id === socket_id) {
            message = current_room.dataUser1.username + ": " + userMessage;
        } else {
            message = current_room.dataUser2.username + ": " + userMessage;
        }
        console.log(message);
        player_1.to(room).emit("get-message", message);
        player_2.to(room).emit("get-message", message);
    
    });
});
