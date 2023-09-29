const express = require("express");
const write = require("./writeFunctions.js");
const read = require("./readFunctions.js");
const cors = require("cors");
var app = express();
const PORT = 3005;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/checkUserExists", async (req, res) => {
    try {
        const { email, password } = req.body;
        const exists = await read.checkUserExists(email, password);
        if (exists) {
            res.status(200).json({ userExists: true });
        } else {
            res.status(200).json({ userExists: false });
        }
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
        const username = req.body.username;
        console.log(username)
        await write.removeUser(username);
        res.send('User removed');
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
        const password = req.body.password;
        const response = await write.addUser(username, email, password, language, level);
        res.send(response);
    } catch (error) {
        console.error(error);
    }
})

app.get("/get", async (req, res) => {
    try {
        const username = req.query.username;
        const response = await read.getUser(username);
        res.send(response);
    } catch (error) {
        console.error(error);
    }
})

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
