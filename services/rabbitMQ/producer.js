const amqp = require("amqplib")
const url = "amqp://localhost"

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
    }
}

module.exports = Producer;