const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("Dummy device connected to MQTT");

  setInterval(() => {
    const sensors = [
      { sensor: "pH", value: (6 + Math.random() * 2).toFixed(2) },
      { sensor: "TDS", value: (300 + Math.random() * 200).toFixed(0) },
      { sensor: "TSS", value: (10 + Math.random() * 40).toFixed(0) },
      { sensor: "temperature", value: (25 + Math.random() * 5).toFixed(1) },
    ];

    sensors.forEach((data) => {
      client.publish(`water/sensor/${data.sensor}`, JSON.stringify(data));
      console.log("Sent:", data);
    });
  }, 5000);
});
