const express = require('express');
var app = express();
const axios = require("axios");
const cors = require("cors");
const PORT = 3003;
const socket = require('socket.io');
const http = require('http');
const uuid = require('uuid');
const amqp = require("amqplib")

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

const queueURL = process.env.REACT_APP_ENV === 'local'
? 'http://localhost:3009'
: process.env.REACT_APP_ENV === 'docker'
? 'http://producer:3009'
: "http://35.198.205.80:3009";

const questionURL = process.env.REACT_APP_ENV === 'local'
? 'http://localhost:3002'
: process.env.REACT_APP_ENV === 'docker'
? 'http://question:3002'
: "http://35.198.205.80:3002";

const dbURL = process.env.REACT_APP_ENV === 'local'
? 'http://localhost:3005'
: process.env.REACT_APP_ENV === 'docker'
? 'http://database:3005'
: "http://database-service-service.default.svc.cluster.local:3005";
    // Generate a random integer between min (inclusive) and max (exclusive)
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

// Listen to the rabbitMQ
async function listenRabbitMQ() {
    const connection = await amqp.connect("amqp://rabbitmq");
    const channel = await connection.createChannel();

    // Declare Dead-Letter Exchange (DLX)
    await channel.assertExchange('myDLX', 'fanout', { durable: true });

    // Declare Dead-Letter Queue (DLQ)
    const myDLQ = await channel.assertQueue('myDLQ', { durable: true });
    await channel.bindQueue(myDLQ.queue, 'myDLX', 'DLQ');

    channel.consume(myDLQ.queue, (msg) => {
        const dataRet = JSON.parse(msg.content.toString());
        const user2Name = dataRet.message.username;
        console.log(user2Name+ " has exited the queue!")
        channel.ack(msg); // Acknowledge the expired message to remove it from the DLQ
    });

    await channel.assertExchange("difficultyExchange", "direct");

    // Establish queue for "Medium" difficulty
    const qMediumPython = await channel.assertQueue("Mediumpython3", {
        durable: true,
        messageTtl: 30000,
        deadLetterExchange: 'myDLX',
    });
    await channel.bindQueue(qMediumPython.queue, "difficultyExchange", "Mediumpython3");

    // Establish queue for "Medium" difficulty
    const qMediumJava = await channel.assertQueue("Mediumjava", {
        durable: true,
        messageTtl: 30000,
        deadLetterExchange: 'myDLX',
    });
    await channel.bindQueue(qMediumJava.queue, "difficultyExchange", "Mediumjava");

    // Establish queue for "Medium" difficulty
    const qMediumCpp = await channel.assertQueue("Mediumcpp", {
        durable: true,
        messageTtl: 30000,
        deadLetterExchange: 'myDLX',
    });
    await channel.bindQueue(qMediumCpp.queue, "difficultyExchange", "Mediumcpp");

    // Establish queue for "Hard" difficulty
    const qHardPython = await channel.assertQueue("Hardpython3", {
        durable: true,
        messageTtl: 30000,
        deadLetterExchange: 'myDLX',
    });
    await channel.bindQueue(qHardPython.queue, "difficultyExchange", "Hardpython3");

    // Establish queue for "Hard" difficulty
    const qHardJava = await channel.assertQueue("Hardjava", {
        durable: true,
        messageTtl: 30000,
        deadLetterExchange: 'myDLX',
    });
    await channel.bindQueue(qHardJava.queue, "difficultyExchange", "Hardjava");

    // Establish queue for "Hard" difficulty
    const qHardCpp = await channel.assertQueue("Hardcpp", {
        durable: true,
        messageTtl: 30000,
        deadLetterExchange: 'myDLX',
    });
    await channel.bindQueue(qHardCpp.queue, "difficultyExchange", "Hardcpp");

    // Establish queue for "Easy" difficulty
    const qEasyPython = await channel.assertQueue("Easypython3", {
        durable: true,
        messageTtl: 30000,
        deadLetterExchange: 'myDLX',
    });
    await channel.bindQueue(qEasyPython.queue, "difficultyExchange", "Easypython3");

    // Establish queue for "Easy" difficulty
    const qEasyJava = await channel.assertQueue("Easyjava", {
        durable: true,
        messageTtl: 30000,
        deadLetterExchange: 'myDLX',
    });
    await channel.bindQueue(qEasyJava.queue, "difficultyExchange", "Easyjava");

    // Establish queue for "Easy" difficulty
    const qEasyCpp = await channel.assertQueue("Easycpp", {
        durable: true,
        messageTtl: 30000,
        deadLetterExchange: 'myDLX',
    });
    await channel.bindQueue(qEasyCpp.queue, "difficultyExchange", "Easycpp");

    function handleEasyPython(data) {
        channel.get(qEasyPython.queue, { noAck: false })
            .then(msg => {
            if (msg) {
                const dataRet = JSON.parse(msg.content.toString());
                console.log(dataRet);
                // Process data or log the content of the unacked message here
                const user1Name = data.msg.username;
                const user1Socket = socketServer.sockets.sockets.get(data.msg.socketID);
                const user2Name = dataRet.message.username;
                const user2Socket = socketServer.sockets.sockets.get(dataRet.message.socketID);

                // createRoom(difficulty, data user 1, data user 2, socket user 1, socket user 2)
                createRoom("Easy", user1Name, user2Name, user1Socket, user2Socket, "python3")
                // Acknowledge the message once processed
                channel.ack(msg);
            }else{  
                const putQueue = async () => {
                    try {
                    const response = await axios.post(`${queueURL}/joinQueue`, data);
                    } catch (error) {
                    console.error('Error join queue:', error);
                    }
                };
                putQueue();
            }
            })
            .catch(err => {
                console.error('Error getting unacked messages:', err);
            });
    }

    function handleEasyJava(data) {
        channel.get(qEasyJava.queue, { noAck: false })
            .then(msg => {
            if (msg) {
                const dataRet = JSON.parse(msg.content.toString());
                console.log(dataRet);
                // Process data or log the content of the unacked message here
                const user1Name = data.msg.username;
                const user1Socket = socketServer.sockets.sockets.get(data.msg.socketID);
                const user2Name = dataRet.message.username;
                const user2Socket = socketServer.sockets.sockets.get(dataRet.message.socketID);

                // createRoom(difficulty, data user 1, data user 2, socket user 1, socket user 2)
                createRoom("Easy", user1Name, user2Name, user1Socket, user2Socket, "java")
                // Acknowledge the message once processed
                channel.ack(msg);
            }else{  
                const putQueue = async () => {
                    try {
                    const response = await axios.post(`${queueURL}/joinQueue`, data);
                    } catch (error) {
                    console.error('Error join queue:', error);
                    }
                };
                putQueue();
            }
            })
            .catch(err => {
                console.error('Error getting unacked messages:', err);
            });
    }

    function handleEasyCpp(data) {
        channel.get(qEasyCpp.queue, { noAck: false })
            .then(msg => {
            if (msg) {
                const dataRet = JSON.parse(msg.content.toString());
                console.log(dataRet);
                // Process data or log the content of the unacked message here
                const user1Name = data.msg.username;
                const user1Socket = socketServer.sockets.sockets.get(data.msg.socketID);
                const user2Name = dataRet.message.username;
                const user2Socket = socketServer.sockets.sockets.get(dataRet.message.socketID);

                // createRoom(difficulty, data user 1, data user 2, socket user 1, socket user 2)
                createRoom("Easy", user1Name, user2Name, user1Socket, user2Socket, "cpp")
                // Acknowledge the message once processed
                channel.ack(msg);
            }else{  
                const putQueue = async () => {
                    try {
                    const response = await axios.post(`${queueURL}/joinQueue`, data);
                    } catch (error) {
                    console.error('Error join queue:', error);
                    }
                };
                putQueue();
            }
            })
            .catch(err => {
                console.error('Error getting unacked messages:', err);
            });
    }

    function handleMediumPython(data) {
        channel.get(qMediumPython.queue, { noAck: false })
            .then(msg => {
            if (msg) {
                const dataRet = JSON.parse(msg.content.toString());
                console.log(dataRet);
                // Process data or log the content of the unacked message here
                const user1Name = data.msg.username;
                const user1Socket = socketServer.sockets.sockets.get(data.msg.socketID);
                const user2Name = dataRet.message.username;
                const user2Socket = socketServer.sockets.sockets.get(dataRet.message.socketID);

                // createRoom(difficulty, data user 1, data user 2, socket user 1, socket user 2)
                createRoom("Medium", user1Name, user2Name, user1Socket, user2Socket, "python3")
                // Acknowledge the message once processed
                channel.ack(msg);
            }else{  
                const putQueue = async () => {
                    try {
                    const response = await axios.post(`${queueURL}/joinQueue`, data);
                    } catch (error) {
                    console.error('Error join queue:', error);
                    }
                };
                putQueue();
            }
            })
            .catch(err => {
                console.error('Error getting unacked messages:', err);
            });
    }

    function handleMediumJava(data) {
        channel.get(qMediumJava.queue, { noAck: false })
            .then(msg => {
            if (msg) {
                const dataRet = JSON.parse(msg.content.toString());
                console.log(dataRet);
                // Process data or log the content of the unacked message here
                const user1Name = data.msg.username;
                const user1Socket = socketServer.sockets.sockets.get(data.msg.socketID);
                const user2Name = dataRet.message.username;
                const user2Socket = socketServer.sockets.sockets.get(dataRet.message.socketID);

                // createRoom(difficulty, data user 1, data user 2, socket user 1, socket user 2)
                createRoom("Medium", user1Name, user2Name, user1Socket, user2Socket, "java")
                // Acknowledge the message once processed
                channel.ack(msg);
            }else{  
                const putQueue = async () => {
                    try {
                    const response = await axios.post(`${queueURL}/joinQueue`, data);
                    } catch (error) {
                    console.error('Error join queue:', error);
                    }
                };
                putQueue();
            }
            })
            .catch(err => {
                console.error('Error getting unacked messages:', err);
            });
    }

    function handleMediumCpp(data) {
        channel.get(qMediumCpp.queue, { noAck: false })
            .then(msg => {
            if (msg) {
                const dataRet = JSON.parse(msg.content.toString());
                console.log(dataRet);
                // Process data or log the content of the unacked message here
                const user1Name = data.msg.username;
                const user1Socket = socketServer.sockets.sockets.get(data.msg.socketID);
                const user2Name = dataRet.message.username;
                const user2Socket = socketServer.sockets.sockets.get(dataRet.message.socketID);

                // createRoom(difficulty, data user 1, data user 2, socket user 1, socket user 2)
                createRoom("Medium", user1Name, user2Name, user1Socket, user2Socket, "cpp")
                // Acknowledge the message once processed
                channel.ack(msg);
            }else{  
                const putQueue = async () => {
                    try {
                    const response = await axios.post(`${queueURL}/joinQueue`, data);
                    } catch (error) {
                    console.error('Error join queue:', error);
                    }
                };
                putQueue();
            }
            })
            .catch(err => {
                console.error('Error getting unacked messages:', err);
            });
    }

    function handleHardPython(data) {
        channel.get(qHardPython.queue, { noAck: false })
            .then(msg => {
            if (msg) {
                const dataRet = JSON.parse(msg.content.toString());
                console.log(dataRet);
                // Process data or log the content of the unacked message here
                const user1Name = data.msg.username;
                const user1Socket = socketServer.sockets.sockets.get(data.msg.socketID);
                const user2Name = dataRet.message.username;
                const user2Socket = socketServer.sockets.sockets.get(dataRet.message.socketID);

                // createRoom(difficulty, data user 1, data user 2, socket user 1, socket user 2)
                createRoom("Hard", user1Name, user2Name, user1Socket, user2Socket, "python3")
                // Acknowledge the message once processed
                channel.ack(msg);
            }else{  
                const putQueue = async () => {
                    try {
                    const response = await axios.post(`${queueURL}/joinQueue`, data);
                    } catch (error) {
                    console.error('Error join queue:', error);
                    }
                };
                putQueue();
            }
            })
            .catch(err => {
                console.error('Error getting unacked messages:', err);
            });
    }

    function handleHardJava(data) {
        channel.get(qHardJava.queue, { noAck: false })
            .then(msg => {
            if (msg) {
                const dataRet = JSON.parse(msg.content.toString());
                console.log(dataRet);
                // Process data or log the content of the unacked message here
                const user1Name = data.msg.username;
                const user1Socket = socketServer.sockets.sockets.get(data.msg.socketID);
                const user2Name = dataRet.message.username;
                const user2Socket = socketServer.sockets.sockets.get(dataRet.message.socketID);

                // createRoom(difficulty, data user 1, data user 2, socket user 1, socket user 2)
                createRoom("Hard", user1Name, user2Name, user1Socket, user2Socket, "java")
                // Acknowledge the message once processed
                channel.ack(msg);
            }else{  
                const putQueue = async () => {
                    try {
                    const response = await axios.post(`${queueURL}/joinQueue`, data);
                    } catch (error) {
                    console.error('Error join queue:', error);
                    }
                };
                putQueue();
            }
            })
            .catch(err => {
                console.error('Error getting unacked messages:', err);
            });
    }

    function handleHardCpp(data) {
        channel.get(qHardCpp.queue, { noAck: false })
            .then(msg => {
            if (msg) {
                const dataRet = JSON.parse(msg.content.toString());
                console.log(dataRet);
                // Process data or log the content of the unacked message here
                const user1Name = data.msg.username;
                const user1Socket = socketServer.sockets.sockets.get(data.msg.socketID);
                const user2Name = dataRet.message.username;
                const user2Socket = socketServer.sockets.sockets.get(dataRet.message.socketID);

                // createRoom(difficulty, data user 1, data user 2, socket user 1, socket user 2)
                createRoom("Hard", user1Name, user2Name, user1Socket, user2Socket, "cpp")
                // Acknowledge the message once processed
                channel.ack(msg);
            }else{  
                const putQueue = async () => {
                    try {
                    const response = await axios.post(`${queueURL}/joinQueue`, data);
                    } catch (error) {
                    console.error('Error join queue:', error);
                    }
                };
                putQueue();
            }
            })
            .catch(err => {
                console.error('Error getting unacked messages:', err);
            });
    }

    function createRoom(difficulty, userData1, userData2, socketUser1, socketUser2, language) {
        const room = {
            id: uuid.v4(),
            difficulty: difficulty,
            status: "waiting",
            submit: [],
            question: null,
            code: null,
            dataUser1: userData1,
            dataUser2: userData2,
            isFinished: false,
            user1Socket: socketUser1.id,
            user2Socket: socketUser2.id,
            language: language
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
            if (question.content.length == 0) {
                fetchQuestions();
            }else {
                room.question = question;
                socketServer.to(room.id).emit("matchFound", room.id, question, language);
            }
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
            current_room.isFinished = true;
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
                            username :  current_room.dataUser1,
                            question : current_room.question.title,
                            partner : current_room.dataUser2,
                            completed : true,
                            date : dateToday,
                            code : current_room.code
                        },
                    });
                    const object2 = await axios.post(`${dbURL}/user/question`, {
                        params: {
                            username :  current_room.dataUser2,
                            question : current_room.question.title,
                            partner : current_room.dataUser1,
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

        socket.on("joinQueue", (difficulty, userData, language) => {
            console.log(socket + "User joined on difficulty: " + difficulty);
            const message = {
                username: userData.username,
                socketID: socket.id
            }
            const data = {
                "logType": difficulty+language,
                "msg": message,
                "exchangeName": "difficultyExchange"
            }
            console.log(data.logType)
            if (difficulty === "Easy") {
                if (language === "python3") {
                    handleEasyPython(data);
                } else if (language === "cpp") {
                    handleEasyCpp(data);
                } else {
                    handleEasyJava(data);
                }
            } else if (difficulty === "Medium") {
                if (language === "python3") {
                    handleMediumPython(data);
                } else if (language === "cpp") {
                    handleMediumCpp(data);
                } else {
                    handleMediumJava(data);
                }
            } else if (difficulty === "Hard") {
                if (language === "python3") {
                    handleHardPython(data);
                } else if (language === "cpp") {
                    handleHardCpp(data);
                } else {
                    handleHardJava(data);
                }
            }
        });

        // This is redundant now
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

        socket.on("compile_code", (data, room, language) => {
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
                    language: language,
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
            const socketID = socket.id;
            
            const session = new Map(
                [...rooms]
                .filter(([roomID, room]) => room.user1Socket === socketID || room.user2Socket === socketID )
            );
              
            console.info([...session]); 

            let current_room = session.values().next().value;
            console.log(current_room);
            
            console.log("qworuyiu");
            console.log(session.size); 
            
            if (session.size > 0) {
                session.forEach(room => {
                    socketServer.to(room.id).emit("partner_left");
                });
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
                const day = String(now.getDate()).padStart(2, '0');

                const dateToday = `${year}-${month}-${day}`;

                const submitAttempt = async () => {
                    try {
                        
                    console.log("submitting asfg")
                    const object = await axios.post(`${dbURL}/user/question`, {
                        params: {
                            username :  current_room.dataUser1,
                            question : current_room.question.title,
                            partner : current_room.dataUser2,
                            completed : current_room.isFinished,
                            date : dateToday,
                            code : current_room.code
                        },
                    });
                    const object2 = await axios.post(`${dbURL}/user/question`, {
                        params: {
                            username :  current_room.dataUser2,
                            question : current_room.question.title,
                            partner : current_room.dataUser1,
                            completed : current_room.isFinished,
                            date : dateToday,
                            code : current_room.code
                        },
                    });
                    } catch (error) {
                    console.error('Error submitting attempt:', error);
                    }
                };
                console.log("try submitting attempt")
                submitAttempt();
                console.log("submitting attempt")
            }
        });

        socket.on("send-message", (userMessage, senderUserData, room) => {
            message = senderUserData.username + ": " + userMessage;
            socketServer.to(room).emit("get-message", message);
            console.log("message sent: " + message)
        });
    });
}

listenRabbitMQ();