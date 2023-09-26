const express = require("express");
const write = require("./writeFunctions.js");
s;
var app = express();
const PORT = 3005;

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/removeUser", async (req, res) => {
    try {
        const userID = req.params.userID;
        res = await write.removeUser(userID);
        return res;
    } catch (error) {
        console.error(error);
    }
});

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
