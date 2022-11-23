const { InfluxDB } = require('@influxdata/influxdb-client');

const influxDB = new InfluxDB({
  url: process.env.INFLUXDB_URL,
  token: process.env.DOCKER_INFLUXDB_INIT_ADMIN_TOKEN,
});

module.exports = influxDB;
