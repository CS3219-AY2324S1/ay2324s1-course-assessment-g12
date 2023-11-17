const express = require('express');
const axios = require("axios");
const cors = require("cors");

const PORT = 3001;
const databaseURL = "http://localhost:3005"

var app = express();
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

// ------------------ User Functions ------------------

app.delete("/user", async (req, res) => {
    try {
        console.log(req.query)
        const response = await axios.delete(`${databaseURL}/user`, { params: req.query, headers: req.headers });
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post("/user", async (req, res) => {
    try {
        const data = req.body;
        const response = await axios.post(`${databaseURL}/user`, data, {headers: req.headers});
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get("/user", async (req, res) => {
    try {
        console.log("get user")
        const response = await axios.get(`${databaseURL}/user`, { params: req.query, headers: req.headers });
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.patch("/user", async (req, res) => {
    try {
        const response = await axios.patch(`${databaseURL}/user`, req.body, {headers: req.headers});
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }
});

app.get("/user/check/email", async (req, res) => {
    try {
        const response = await axios.get(`${databaseURL}/user/check/email`, { params: req.query, headers: req.headers});
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }
});

app.get("/user/check/username", async (req, res) => {
    try {
        const response = await axios.get(`${databaseURL}/user/check/username`, { params: req.query, headers: req.headers });
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }
});

app.get("/user/verify", async (req, res) => {
    try {
        const response = await axios.get(`${databaseURL}/user/verify`, { params: req.query, headers: req.headers });
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }
});

app.get('/user/authenticate', async (req, res) => {
    try {
        const userData = await axios.get(`${databaseURL}/user`, { params: req.query, headers: req.headers });
        if (userData.data.role === 'admin') {
            res.send(true);
        } else {
            res.send(false);
        }
    } catch (error) {
        console.error(error)
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});