const express = require("express");
const cors = require("cors");
const axios = require("axios");
var app = express();
const databaseURL = "http://database:3005";
const PORT = 3002;
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cors());

app.use(async (req, res, next) => {
    try {
        var accessToken = null;
        const clientIP = req.headers.host.split(":")[0];
        console.log("request from: " + clientIP);
        if (req.headers.authorization)
            accessToken = req.headers.authorization.split("Bearer ")[1];
        const isAuthenticated = await axios.get(
            `${databaseURL}/user/authenticate`,
            {
                params: req.query,
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );
        if (isAuthenticated.data) next();
    } catch (error) {
        if (error.response && error.response.status === 401) {
            res.status(error.response.status).json({
                error: error.response.data.error,
            });
        } else console.error(error);
    }
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/question", async (req, res) => {
    console.log("hello");
    const response = await axios.post(`${databaseURL}/question`, req.body, {
        headers: req.headers,
    });
    res.send(response.data);
});

app.get("/question", async (req, res) => {
    const response = await axios.get(`${databaseURL}/question`, {
        params: req.query,
        headers: req.headers,
    });
    res.send(response.data);
});

app.patch("/question", async (req, res) => {
    const response = await axios.patch(`${databaseURL}/question`, req.body, {
        headers: req.headers,
    });
    res.send(response.data);
});

app.delete("/question", async (req, res) => {
    const response = await axios.delete(`${databaseURL}/question`, {
        params: req.query,
        headers: req.headers,
    });
    res.send(response.data);
});

app.get("/questions", async (req, res) => {
    const response = await axios.get(`${databaseURL}/questions`, {
        headers: req.headers,
    });
    res.send(response.data);
});

app.get("/questions/filter", async (req, res) => {
    try {
        const response = await axios.get(`${databaseURL}/questions/filter`, {
            params: req.query,
            headers: req.headers,
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
    }
});

app.post("/question/visit", async (req, res) => {
    try {
        const response = await axios.post(
            `${databaseURL}/question/visit`,
            req.body,
            { headers: req.headers }
        );
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
    }
});

app.post("/question/like", async (req, res) => {
    try {
        const email = req.body.email;
        const accessToken = req.headers.authorization.split("Bearer ")[1];
        const userData = await axios.get(`${databaseURL}/user`, {
            params: { email: email },
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log("user data: " + userData);

        const username = userData.data.username;
        console.log("here with me");
        const response = await axios.post(
            `${databaseURL}/question/like`,
            {
                username: username,
                title: req.body.title,
                liked: req.body.liked,
            },
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }
});

app.get("/questions/like", async (req, res) => {
    try {
        console.log("here");
        console.log(req.query.email);
        const email = req.query.email;
        const userData = await axios.get(`${databaseURL}/user`, {
            params: { email: email },
            headers: req.headers,
        });
        const username = userData.data.username;
        const response = await axios.get(`${databaseURL}/questions/like`, {
            params: { username: username },
            headers: req.headers,
        });
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }
});

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
