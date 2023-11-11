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
        console.log(req.query)
        const response = await axios.delete(`${databaseURL}/user`, {params: req.query});
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

app.get("/user/check/email", async (req, res) => {
    try {
        const response = await axios.get(`${databaseURL}/user/check/email`, { params: req.query });
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }
});

app.get("/user/check/username", async (req, res) => {
    try {
        const response = await axios.get(`${databaseURL}/user/check/username`, { params: req.query });
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});