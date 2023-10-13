const express = require('express');
var app = express();
const axios = require("axios");
const cors = require("cors");
const PORT = 3001;
const backendURL = "http://localhost:3005"

app.use(express.json());
app.use(cors());

app.delete("/user", async (req, res) => {
    try {
        const response = await axios.delete(`${backendURL}/user`, req.body);
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post("/user", async (req, res) => {
    try {
        const data = req.body;
        const response = await axios.post(`${backendURL}/user`, data);
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get("/user", async (req, res) => {
    try {
        const response = await axios.get(`${backendURL}/user`, {params: req.query});
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.post("/checkUserExists", async (req, res) => {
    try {
        const response = await axios.post(`${backendURL}/checkUserExists`, req.body);
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }
});

app.post("/handleSignup", async (req, res) => {
    try {
        const response = await axios.post(`${backendURL}/handleSignup`, req.body);
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }
});

app.post("/handleLogin", async (req, res) => {
    try {
        const response = await axios.post(`${backendURL}/handleLogin`, req.body);
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }
});

app.patch("/user", async (req, res) => {
    try {
        const response = await axios.patch(`${backendURL}/user`, req.body);
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});