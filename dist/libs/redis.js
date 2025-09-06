import { createClient } from "redis";
// Base Redis client
const redis = createClient({
    url: "redis://localhost:6379",
});
redis.on("error", (err) => console.error("Redis Client Error", err));
(async () => {
    await redis.connect();
    console.log("Redis connected");
})();
// Publisher and Subscriber (duplicates of the main client)
export const publisher = redis.duplicate();
export const subscriber = redis.duplicate();
(async () => {
    await publisher.connect();
    await subscriber.connect();
})();
//# sourceMappingURL=redis.js.map