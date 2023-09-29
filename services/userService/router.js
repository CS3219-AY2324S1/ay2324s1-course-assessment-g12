const express = require('express');
var app = express();
const axios = require("axios");
const cors = require("cors");
const PORT = 3001;
const backendURL = "http://localhost:3005"

app.use(express.json());
app.use(cors());

app.post("/removeUser", async (req, res) => {
    try {
        const response = await axios.post(`${backendURL}/delete`, req.body);
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post("/addUser", async (req, res) => {
    try {
        const data = req.body;
        const response = await axios.post(`${backendURL}/add`, data);
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get("/getUser", async (req, res) => {
    try {
        const response = await axios.get(`${backendURL}/get`, {params: req.query});
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
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