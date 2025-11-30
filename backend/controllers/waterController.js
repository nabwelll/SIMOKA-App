const PHSensor = require("../services/phSensor");
const TDSSensor = require("../services/tdsSensor");
const TempSensor = require("../services/tempSensor");
const {
  NormalStatus,
  WarningStatus,
  DangerStatus,
} = require("../services/waterStatus");

const { writeApi, Point } = require("../config/influx");

const sensors = [new PHSensor(), new TDSSensor(), new TempSensor()];

function evaluateStatus(value, range) {
  if (value < range.min || value > range.max) {
    return new DangerStatus();
  }
  if (value <= range.min + 0.5 || value >= range.max - 0.5) {
    return new WarningStatus();
  }
  return new NormalStatus();
}

exports.processWaterData = (data) => {
  const results = [];

  sensors.forEach((sensor) => {
    const value = sensor.readValue(data);
    const range = sensor.getSafeRange();
    const status = evaluateStatus(value, range);

    const point = new Point("water_quality")
      .tag("sensor", sensor.name)
      .floatField("value", value)
      .stringField("status", status.getLabel());

    writeApi.writePoint(point);

    results.push({
      sensor: sensor.name,
      value,
      unit: sensor.getUnit(),
      status: status.getLabel(),
      color: status.getColor(),
    });
  });

  return results;
};
