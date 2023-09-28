const express = require("express");
const write = require("./writeFunctions.js");
const read = require("./readFunctions.js");
var app = express();
const PORT = 3005;

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/checkUserExists", async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await read.checkUserExists(email, password);
        res.send(response);
    } catch (error) {
        console.error(error);
    }
});

app.post("/handleLogin", async (req, res) => {
    try {
        const email = req.body.email; 
        const password = req.body.password;
        const response = await write.handleLogin(email, password); 
        res.send(response);
    } catch (error) {
        console.error(error);
    }
});

app.post("/delete", async (req, res) => {
    try {
        const uid = req.params.uid;
        const response = await write.removeUser(uid);
        res.send(response);
    } catch (error) {
        console.error(error);
    }
});

app.post("/add", async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const language = req.body.language;
        const level = req.body.level;
        const response = await write.addUser(username, email, language, level);
        res.send(response);
    } catch (error) {
        console.error(error);
    }
})

app.get("/get", async (req, res) => {
    try {
        const username = req.params.username;
        const response = await read.getUser(username);
        res.send(response);
    } catch (error) {
        console.error(error);
    }
})

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
