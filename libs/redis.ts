import { createClient } from "redis";

export const redis = createClient({
  url: "redis://localhost:6379",
});

redis.on("error", (err) => console.error("Redis Client error", err));
(async () => {
  await redis.connect();
  console.log("Redis connected");
})();
export const subscriber = redis.duplicate();
export const publisher = redis.duplicate();

(async () => {
  await subscriber.connect();
  await publisher.connect();
})();
