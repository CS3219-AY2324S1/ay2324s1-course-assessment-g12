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
        const data = req.body;
        const response = await write.addUser(data);
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
        const data = req.body.data;
        console.log(data);
        const response = await write.updateUser(username, data);
        res.send(response);
    } catch (error) {
        console.error(error);
    }
});

app.get("/user/check", async (req, res) => {
    try {
        const email = req.query.email;
        const exists = await read.checkUserExists(email);
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

app.get("/user/verify", async (req, res) => {
    try {
        const token = req.query.token;
        const uid = await read.getUidFromToken(token);
        console.log(uid); 
        res.status(200).send({ uid: uid });
    } catch (error) {
        console.error(error);
    }
});

app.post('/user/question', async (req, res) => {
    try {
        const username = req.body.username;
        const question = req.body.question;
        const partner = req.body.partner;
        const completed = req.body.completed;
        const date = req.body.date;
        const code = req.body.code;
        const response = await write.addQuestionToUser(username, question, partner, completed, date, code);
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }   
})

app.get('/user/questions', async (req, res) => {
    try {
        const username = req.query.username;
        const response = await read.getQuestionsFromUser(username);
        res.send(response);
    } catch (error) {
        console.error(error);
    }   
})

// ------------------ Question Functions ------------------

app.post("/question", async (req, res) => {
    try {
        const title = req.body.title;
        const categories = req.body.categories;
        const difficulty = req.body.difficulty;
        const content = req.body.content;
        const response = await write.addQuestion(
            title,
            categories,
            difficulty,
            content
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

app.patch("/question", async (req, res) => {
    try {
        const title = req.body.title;
        const data = req.body.data;
        await write.updateQuestion(title, data);
        res.status(200).send("Question updated");
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

app.post("/question/visit", async (req, res) => {
    try {
        const title = req.body.title;
        const response = await write.incrementVisits(title);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.get("/questions/filter", async (req, res) => {
    try {
        const categories = req.query.categories;
        const difficulty = req.query.difficulty;
        const limit = req.query.limit;
        var response = null;
        if (categories === undefined) {
            response = await read.getAllQuestions();
        } else {
            response = await read.filterQuestions(categories, difficulty, limit);
        }
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
    }
})

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
