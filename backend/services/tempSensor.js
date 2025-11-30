const Sensor = require("./Sensor");

class TempSensor extends Sensor {
  constructor() {
    super("Temperature");
  }

  readValue(data) {
    return data.temperature;
  }

  getUnit() {
    return "°C";
  }

  getSafeRange() {
    return { min: 20, max: 30 };
  }
}

module.exports = TempSensor;
