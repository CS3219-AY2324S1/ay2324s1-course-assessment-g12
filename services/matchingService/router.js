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

function createRoom(user1, user2, difficulty, socket) {
    console.log("rooasdfadas");
    const room = {
        id: uuid.v4(),
        difficulty: difficulty,
        players: [user1, user2],
        status: "waiting",
    };
    console.log("room" + room.id);
    rooms.set(room.id, room);
    console.log("room");
    user1.join(room.id);
    console.log("asdfa");
    user2.join(room.id);
    socket.to(room.id).emit("matchFound", room.id, user1.id, user2.id);
    user2.to(room.id).emit("matchFound", room.id, user1.id, user2.id);
    console.log("matched");
    return room;
}

socketServer.on("connection", (socket) => {
    console.log("Socket connected: " + socket.id);

    socket.on("joinQueue", (difficulty) => {
        console.log(socket + "User joined on difficulty: " + difficulty);
        var match = null;
        if (difficulty === "Easy") {
            if (easyQueue.length > 0) {
                match = easyQueue.shift();
            } else {
                easyQueue.push(socket);
            }
        } else if (difficulty === "Medium") {
            if (mediumQueue.length > 0) {
                match = mediumQueue.shift();
            } else {
                mediumQueue.push(socket);
            }
        } else if (difficulty === "Hard") {
            if (hardQueue.length > 0) {
                match = hardQueue.shift();
            } else {
                hardQueue.push(socket);
            }
        }
        console.log(socket.id + " " + match);
        if(match !== null) {
            console.log("match" + match.id);
            createRoom(socket, match, difficulty, socket);
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
});

//server.listen(PORT, () => {
//    console.log("Listening on port " + PORT);
//});