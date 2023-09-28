const express = require("express");
const write = require("./writeFunctions.js");
const read = require("./readFunctions.js");
const external = require("./external.js")
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

app.post("/removeUser", async (req, res) => {
    try {
        const userID = req.params.userID;
        const response = await write.removeUser(userID);
        res.send(response);
    } catch (error) {
        console.error(error);
    }
});

app.post("/addUser", async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const language = req.body.language;
        const level = req.body.level;
        const uid = await external.generateUID(username);
        const response = await write.addUser(username, email, password, language, level, uid);
        res.send(response);
    } catch (error) {
        console.error(error);
    }
})

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
