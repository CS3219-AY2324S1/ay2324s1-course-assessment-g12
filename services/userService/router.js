const express = require('express');
var app = express();
const axios = require("axios");
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

app.post("/checkUserExists", async (req, res) => {
    try {
        const response = await axios.post(`${backendURL}/checkUserExists`, req.body);
        res.send(response);
    } catch (error) {
        console.error(error);
    }
});

app.post("/handleLogin", async (req, res) => {
    try {
        const response = await axios.post(`${backendURL}/handleLogin`, req.body);
        res.send(response);
    } catch (error) {
        console.error(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});