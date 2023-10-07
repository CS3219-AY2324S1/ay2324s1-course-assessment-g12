const express = require("express");
const cors = require("cors");
const axios = require("axios");
var app = express();
const databaseURL = "http://localhost:3005";
const PORT = 3002;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/question", async(req, res) => {
    const response = await axios.post(`${databaseURL}/question`, req.body);
    res.send(response.data);
})

app.get("/question", async(req, res) => {
    const response = await axios.get(`${databaseURL}/question`, {params: req.query});
    res.send(response.data);
})

app.delete("/question", async(req, res) => {
    const response = await axios.delete(`${databaseURL}/question`, {params: req.query});
    res.send(response.data);
})

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
