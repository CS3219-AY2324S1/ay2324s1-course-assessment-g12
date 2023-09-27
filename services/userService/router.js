const express = require('express');
var app = express();
const axios = require("axios");
const external = require("./external.js")
const PORT = 3001;
const backendURL = "https://localhost:3005"

app.post("/removeUser", async (req, res) => {
    try {
        const response = await axios.post(`${backendURL}/delete`, req.params);
        res.send(response);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post("/addUser", async (req, res) => {
    try {
        const response = await axios.post(`${backendURL}/add`, req.params);
        res.send(response);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get("/getUser", async (req, res) => {
    try {
        const response = await axios.get(`${backendURL}/get`, req.params);
        res.send(response);
    } catch (error) {
        console.error(error);
    }
})