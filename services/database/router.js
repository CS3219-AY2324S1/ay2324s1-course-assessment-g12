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

app.use(async (req, res, next) => {
    console.log("auth header " + req.header('Authorization'))
    const idToken = req.header('Authorization')?.replace('Bearer ', '');

    if (!idToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    read.getAuth.verifyIdToken(idToken)
        .then((decodedToken) => {
            req.user = decodedToken;
            next();
        })
        .catch((error) => {
            console.error('Error verifying Firebase token:', error);
            return res.status(401).json({ error: 'Unauthorized' });
        });
});

// ------------------ User Functions ------------------

app.delete("/user", async (req, res) => {
    try {
        const username = req.query.username;
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
            console.log("can you hear me sos")
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
        const response = await write.updateUser(username, data);
        res.send(response);
    } catch (error) {
        console.error(error);
    }
});

app.get("/user/check/email", async (req, res) => {
    try {
        const email = req.query.email;
        const exists = await read.checkUserExistsByEmail(email);
        if (exists) {
            res.status(200).send({ emailExists: true });
        } else {
            res.status(200).json({ emailExists: false });
        }
    } catch (error) {
        console.error(error);
    }
});

app.get("/user/check/username", async (req, res) => {
    try {
        const username = req.query.username;
        const exists = await read.checkUserExistsByUsername(username);
        if (exists) {
            res.status(200).send({ usernameExists: true });
        } else {
            res.status(200).json({ usernameExists: false });
        }
    } catch (error) {
        console.error(error);
    }
});

app.get("/user/verify", async (req, res) => {
    try {
        console.log("Request received in database service to verify user")
        const token = req.query.token;
        const uid = await read.getUidFromToken(token);
        res.status(200).send({ uid: uid });
    } catch (error) {
        console.error(error);
    }
});

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
        console.log(title)
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
        if (categories === undefined && difficulty === undefined && limit === undefined) {
            response = await read.getAllQuestions();
        } else {
            response = await read.filterQuestions(categories, difficulty, limit);
            console.log(response)
            await response.sort(function(a, b) {
                return b.visits - a.visits;
            })
        }
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
    }
})

app.post("/question/like", async(req, res) => {
    try {
        const title = req.body.title;
        const username = req.body.username;
        const liked = req.body.liked;

        await write.incrementVisits(title, liked);

        const response = await write.addLike(username, title, liked);
        
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
    }
})

app.get("/questions/like", async(req, res) => {
    try {
        const username = req.query.username;
        console.log("hehehehe")
        const response = await read.getLikedQuestions(username);
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
    }
})

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
