require('dotenv').config({path: __dirname + '/.env'});
const express = require('express');
const axios = require("axios");
const cors = require("cors");
const PORT = 3001;
const databaseURL = "http://localhost:3005"
const jwt = require('jsonwebtoken');

var app = express();
app.use(express.json());
app.use(cors());

// ------------------ User Functions ------------------

app.delete("/user", async (req, res) => {
    try {
        const response = await axios.delete(`${databaseURL}/user`, req.body);
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post("/user", async (req, res) => {
    try {
        const data = req.body;
        const response = await axios.post(`${databaseURL}/user`, data);
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get("/user", async (req, res) => {
    try {
        const response = await axios.get(`${databaseURL}/user`, { params: req.query });
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.patch("/user", async (req, res) => {
    try {
        const response = await axios.patch(`${databaseURL}/user`, req.body);
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }
});

app.get("/user/check", async (req, res) => {
    try {
        const response = await axios.get(`${databaseURL}/user/check`, { params: req.query });
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }
});

app.post("/token", async (req, res) => {
    try {

        const userData = await axios.get(`${databaseURL}/user`, { params: req.body });
        const refreshToken = userData.refreshToken;
        if (refreshToken === null) return res.sendStatus(401);
        const payload = {
            username: userData.username,
            email: userData.email,
            role: userData.role
        }
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.json({ accessToken: accessToken });
    } catch (error) {
        console.error(error);
    }
})

app.post("/signup", async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const role = req.body.role;

        const payload = {
            username: username,
            email: email,
            role: role
        }

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
        res.json({accessToken: accessToken, refreshToken: refreshToken})
    } catch (error) {
        console.error(error);
    }
})

app.post('/user/question', async (req, res) => {
    try {
        const response = await axios.post(`${databaseURL}/user/question`, req.body);
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }   
})

app.get('/user/questions', async (req, res) => {
    try {
        const response = await axios.get(`${databaseURL}/user/questions`, { params: req.query });
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});