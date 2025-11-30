export default class SensorData {
  constructor(name, unit, min, max) {
    this.name = name;
    this.unit = unit;
    this.min = min;
    this.max = max;
  }

  getStatus(value) {
    if (value < this.min || value > this.max)
      return { label: "Danger", color: "red" };

    if (value < this.min + 0.5 || value > this.max - 0.5)
      return { label: "Warning", color: "orange" };

    return { label: "Normal", color: "green" };
  }
}
