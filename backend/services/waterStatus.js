class WaterStatus {
  getLabel() {
    throw new Error("Method getLabel() must be implemented");
  }

  getColor() {
    throw new Error("Method getColor() must be implemented");
  }
}

class NormalStatus extends WaterStatus {
  getLabel() {
    return "Normal";
  }
  getColor() {
    return "green";
  }
}

class WarningStatus extends WaterStatus {
  getLabel() {
    return "Warning";
  }
  getColor() {
    return "orange";
  }
}

class DangerStatus extends WaterStatus {
  getLabel() {
    return "Danger";
  }
  getColor() {
    return "red";
  }
}

module.exports = { NormalStatus, WarningStatus, DangerStatus };
