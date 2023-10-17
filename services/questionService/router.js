const express = require("express");
const cors = require("cors");
const axios = require("axios");
var app = express();
const databaseURL = "http://localhost:3005";
const PORT = 3002;
const jwt = require("jsonwebtoken")

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/question", authenticateToken, async(req, res) => {
    if (req.role != "admin") res.status(403).json({ error: 'You do not have the required permissions to add questions.' });
    const response = await axios.post(`${databaseURL}/question`, req.body);
    res.send(response.data);
})

app.get("/question", async(req, res) => {
    const response = await axios.get(`${databaseURL}/question`, {params: req.query});
    res.send(response.data);
})

app.patch("/question", async(req, res) => {
    const response = await axios.patch(`${databaseURL}/question`, req.body);
    res.send(response.data);
})

app.delete("/question", authenticateToken, async(req, res) => {
    if (req.role != "admin") res.status(403).json({ error: 'You do not have the required permissions to delete questions.' });
    const response = await axios.delete(`${databaseURL}/question`, {params: req.query});
    res.send(response.data);
})

app.get("/questions", async(req, res) => {
    const response = await axios.get(`${databaseURL}/questions`);
    res.send(response.data);
})

app.get("/questions/categories", async (req, res) => {
    try {
        const response = await axios.get(`${databaseURL}/questions/categories`, {params: req.query});
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
    }
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) return res.sendStatus(403);
        req.user = payload.username;
        req.role = payload.role;
        next();
    })
}

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
