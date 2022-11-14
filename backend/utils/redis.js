const { createClient } = require('redis');

const client = createClient({
  url: process.env.REDIS_URL,
  legacyMode: true,
});

function connectRedis() {
  client.connect().then(() => {
    console.log('Redis connected');
  }).catch((err) => {
    console.log(err);
    console.log('Retrying redis connection in 5 seconds');
    setTimeout(connectRedis, 5000);
  });
}

connectRedis();

module.exports = client;
