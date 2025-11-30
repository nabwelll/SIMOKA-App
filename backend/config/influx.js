const { InfluxDB, Point } = require("@influxdata/influxdb-client");

const token = "water-token";
const org = "water-org";
const bucket = "water-data";

const client = new InfluxDB({
  url: "http://localhost:8086",
  token,
});

const writeApi = client.getWriteApi(org, bucket);

module.exports = { writeApi, Point };
