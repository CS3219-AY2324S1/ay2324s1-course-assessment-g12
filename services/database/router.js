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

// ------------------ Signup/Login Functions ------------------

app.post("/user/check", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const exists = await read.checkUserExists(email, password);
        console.log(exists);
        if (exists) {
            res.status(200).send({ userExists: true });
        } else {
            res.status(200).json({ userExists: false });
        }
    } catch (error) {
        console.error(error);
    }
});

app.post("/user/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const response = await write.handleLogin(email, password);
        res.send(response);
    } catch (error) {
        console.error(error);
    }
});

app.post("/user/signup", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const response = await write.handleSignup(email, password);
        res.send(response);
    } catch (error) {
        console.error(error);
    }
});

// ------------------ User Functions ------------------

app.delete("/user", async (req, res) => {
    try {
        const username = req.body.username;
        console.log(username);
        await write.removeUser(username);
        res.send("User removed");
    } catch (error) {
        console.error(error);
    }
});

app.post("/user", async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const language = req.body.language;
        const level = req.body.level;
        const password = req.body.password;
        const role = req.body.role;
        const response = await write.addUser(
            username,
            email,
            password,
            language,
            level,
            role
        );
        res.send(response);
    } catch (error) {
        console.error(error);
    }
});

app.get("/user", async (req, res) => {
    try {
        const username = req.query.username;
        const email = req.query.email;
        var response = null;
        if (username !== undefined) {
            response = await read.getUser(username, "username");
        } else {
            response = await read.getUser(email, "email");
        }
        res.send(response);
    } catch (error) {
        console.error(error);
    }
});

app.patch("/user", async (req, res) => {
    try {
        const username = req.body.username;
        const language = req.body.language;
        const level = req.body.level;
        const response = await write.updateUser(username, language, level);
        res.send(response);
    } catch (error) {
        console.error(error);
    }
});

// ------------------ Question Functions ------------------

app.post("/question", async (req, res) => {
    try {
        const title = req.body.title;
        const category = req.body.category;
        const difficulty = req.body.difficulty;
        const description = req.body.description;
        const response = await write.addQuestion(
            title,
            category,
            difficulty,
            description
        );
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/question", async (req, res) => {
    try {
        const title = req.query.title;
        response = await read.getQuestion(title);

        if (response === null) {
            res.status(404).send("Question not found");
        }
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/questions", async (req, res) => {
    try {
        response = await read.getAllQuestions();
        if (response === null) {
            res.status(404).send("Question not found");
        }
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete("/question", async (req, res) => {
    try {
        const title = req.query.title;
        await write.deleteQuestion(title);
        res.status(200).send("Question deleted");
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
