const amqp = require("amqplib")
const url = "amqp://rabbitmq"

class Producer {
    channel;

    async createChannel() {
        const connection = await amqp.connect(url)
        this.channel = await connection.createChannel();
    }

    async publishMessage(routingKey, msg, exhangeName) {
        if(!this.channel){
            await this.createChannel();
        }

        await this.channel.assertExchange(exhangeName, "direct")

        const logDetail = {
            logType: routingKey,
            message: msg
        }

        await this.channel.publish(exhangeName, routingKey, 
            Buffer.from(JSON.stringify(logDetail))
        )
        //console.log("the message ${msg} is sent to exchange ${exchangeName}");
    }
}

module.exports = Producer;