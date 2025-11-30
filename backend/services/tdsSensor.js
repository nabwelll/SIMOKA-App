const Sensor = require("./Sensor");

class TDSSensor extends Sensor {
  constructor() {
    super("TDS");
  }

  readValue(data) {
    return data.tds;
  }

  getUnit() {
    return "ppm";
  }

  getSafeRange() {
    return { min: 0, max: 500 };
  }
}

module.exports = TDSSensor;
