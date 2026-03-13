const amqp = require('amqplib');
require('dotenv').config();

let connection = null;
let channel = null;

const connectRabbitMQ = async () => {
    try {
        connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');

        // Ensure queue exists
        await channel.assertQueue('order_queue', { durable: true });

        return { connection, channel };
    } catch (error) {
        console.error('RabbitMQ Connection Error:', error);
        console.warn('Backend will continue without RabbitMQ (Saga pattern will be disabled)');
    }
};

const getChannel = () => channel;

module.exports = { connectRabbitMQ, getChannel };
