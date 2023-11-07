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

function createRoom(difficulty, userData1, userData2, socketUser1, socketUser2) {
    const room = {
        id: uuid.v4(),
        difficulty: difficulty,
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
    socketUser1.join(room.id);
    socketUser2.join(room.id);
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
          socketServer.to(room.id).emit("matchFound", room.id, question);
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      };
    fetchQuestions();
}

socketServer.on("connection", (socket) => {
    console.log("Socket connected: " + socket.id);

    socket.on("submit_question", (senderUserData, room) => {
        console.log("submitting question");
        const current_room = rooms.get(room);
        const submitQueue = current_room.submit;
        if (submitQueue.length === 0 ) {
            submitQueue.push(senderUserData.username);
            const message = "System: " + senderUserData.username + " has queue for submit, waiting for other user."; 
            socketServer.to(room).emit("get-message", message);
        }else if (senderUserData.username !== submitQueue[0]) {
            socketServer.to(room).emit("leave_room");
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const day = String(now.getDate()).padStart(2, '0');

            const dateToday = `${year}-${month}-${day}`;

            const submitAttempt = async () => {
                try {
                  const object = await axios.post(`${dbURL}/user/question`, {
                    params: {
                        username :  current_room.dataUser1.username,
                        question : current_room.question.title,
                        partner : current_room.dataUser2.username,
                        completed : true,
                        date : dateToday,
                        code : current_room.code
                    },
                  });
                  const object2 = await axios.post(`${dbURL}/user/question`, {
                    params: {
                        username :  current_room.dataUser2.username,
                        question : current_room.question.title,
                        partner : current_room.dataUser1.username,
                        completed : true,
                        date : dateToday,
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
            // createRoom(difficulty, data user 1, data user 2, socket user 1, socket user 2)
            createRoom(difficulty, data.userData, match.userData, data.socket, match.socket);
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
        const current_room = rooms.get(room);
        current_room.code = data;

        axios(config)
        .then(function (response) {
            socketServer.to(room).emit("compile_result", response.data.output);
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

    socket.on("send-message", (userMessage, senderUserData, room) => {
        message = senderUserData.username + ": " + userMessage;
        socketServer.to(room).emit("get-message", message);
        console.log("message sent: " + message)
    });
});