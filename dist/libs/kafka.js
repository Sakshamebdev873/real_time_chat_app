import { Kafka } from "kafkajs";
const kafka = new Kafka({
    clientId: "chat-app",
    brokers: ["localhost:9092"],
});
export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "chat-group" });
export const admin = kafka.admin(); // ✅ add this
export const initKafka = async () => {
    await producer.connect();
    await consumer.connect();
    await admin.connect(); // ✅ must connect before topic ops
    await admin.createTopics({
        topics: [
            { topic: "chat-messages", numPartitions: 1, replicationFactor: 1 },
            { topic: "group-messages", numPartitions: 1, replicationFactor: 1 },
        ],
    });
};
//# sourceMappingURL=kafka.js.map