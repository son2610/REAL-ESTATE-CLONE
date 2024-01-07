// const redis = require("redis");

// const client = await redis
//     .createClient()
//     .on("error", (err) => console.log("Redis Client Error", err))
//     .connect();

// console.log("da chay vao day");
// // await client.set("key", "value");
// // const value = await client.get("key");
// // await client.disconnect();

// module.exports = client;

const redis = require("redis");

const client = redis.createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

const connectionRedis = async () => {
    await client.connect();
    // console.log("Redis connected !!!");
};

connectionRedis();

module.exports = client;
