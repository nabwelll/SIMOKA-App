const mqtt = require("mqtt");
const { processWaterData } = require("../controllers/waterController");

const mqttClient = mqtt.connect("mqtt://localhost:1883");

mqttClient.on("connect", () => {
  console.log("MQTT Connected");
  mqttClient.subscribe("water/quality");
});

mqttClient.on("message", (topic, message) => {
  if (topic === "water/quality") {
    try {
      const data = JSON.parse(message.toString());

      console.log("Incoming data:", data);

      const results = processWaterData(data);

      console.log("Processed:", results);
    } catch (error) {
      console.error("Error processing data:", error.message);
    }
  }
});

module.exports = mqttClient;
