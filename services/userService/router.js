const express = require('express');
var app = express();
const axios = require("axios");
const cors = require("cors");
const PORT = 3001;
const databaseURL = "http://localhost:3005"
const userURL = "http://localhost:3001"
const jwt = require("jsonwebtoken")
const external = require("./external.js")

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

app.post("/checkUserExists", async (req, res) => {
    try {
        const response = await axios.post(`${databaseURL}/checkUserExists`, req.body);
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }
});

app.get("/userToken", async (req, res) => {
    try {
        const username = req.query.username;
        const response = await axios.get(`${databaseURL}/user`, { params: { username: username } });

        const payload = {
            username: response.data.username,
            email: response.data.email,
            role: response.data.role
        }
        const secretKey = await axios.get(`${userURL}/secretKey`, { params: { username: username } });

        const token = jwt.sign(payload, secretKey.data);
        console.log("User token generated: " + token)
        res.send(token)
    } catch (error) {
        console.error(error);
    }
})

app.get("/secretKey", async (req, res) => {
    try {
        const username = req.query.username;
        const response = await external.hashUsername(username);
        res.send(response);
    } catch (error) {
        console.error(error);
    }
})

// ------------------ Signup/Login Functions ------------------

app.post("/user/signup", async (req, res) => {
    try {
        const response = await axios.post(`${databaseURL}/user/signup`, req.body);
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }
});

app.post("/user/login", async (req, res) => {
    try {
        const response = await axios.post(`${databaseURL}/user/login`, req.body);
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});