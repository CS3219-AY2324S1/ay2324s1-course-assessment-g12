const express = require("express");
const cors = require("cors")
const app = express();
const Producer = require("./producer");
const producer = new Producer();

app.use(express.json());
app.use(cors())

app.post("/joinQueue", async(req, res, next) => {
    console.log("Joining Queue")
    await producer.publishMessage(req.body.logType, req.body.msg, req.body.exchangeName);
    res.send();
})

app.listen(3009, () => {
    console.log("RabbitMQ is 3009")
})