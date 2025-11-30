class Sensor {
  constructor(name) {
    this.name = name;
  }

  readValue() {
    throw new Error("Method readValue() must be implemented");
  }

  getUnit() {
    throw new Error("Method getUnit() must be implemented");
  }

  getSafeRange() {
    throw new Error("Method getSafeRange() must be implemented");
  }
}

module.exports = Sensor;
