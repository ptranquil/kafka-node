const {Kafka} = require("kafkajs");

/** Replace the IP_ADDR with the IP of KAFKA server */
exports.kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['IP_ADDR:9092']
})