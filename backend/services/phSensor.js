const Sensor = require("./Sensor");

class PHSensor extends Sensor {
  constructor() {
    super("pH");
  }

  readValue(data) {
    return data.ph;
  }

  getUnit() {
    return "pH";
  }

  getSafeRange() {
    return { min: 6.5, max: 8.5 };
  }
}

module.exports = PHSensor;
