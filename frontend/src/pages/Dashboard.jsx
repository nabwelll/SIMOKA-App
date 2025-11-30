import { useEffect, useState } from "react";

// Using your existing imports (mocked for demo)
class SensorData {
  constructor(name, unit, min, max) {
    this.name = name;
    this.unit = unit;
    this.min = min;
    this.max = max;
  }
  getStatus(value) {
    if (value < this.min) return { label: "Low", color: "#ef4444" };
    if (value > this.max) return { label: "High", color: "#f59e0b" };
    return { label: "Normal", color: "#10b981" };
  }
}

function SensorChart({ title, data }) {
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const gradientId = `gradient-${title.replace(/\s+/g, "-")}`;

  return (
    <div style={{ height: "100%" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 300 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#3b82f6", stopOpacity: 0.3 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#3b82f6", stopOpacity: 0 }}
            />
          </linearGradient>
        </defs>
        <polygon
          points={`0,120 ${data
            .map((val, i) => {
              const x = (i / (data.length - 1 || 1)) * 300;
              const y = 120 - ((val - min) / range) * 100;
              return `${x},${y}`;
            })
            .join(" ")} 300,120`}
          fill={`url(#${gradientId})`}
        />
        <polyline
          points={data
            .map((val, i) => {
              const x = (i / (data.length - 1 || 1)) * 300;
              const y = 120 - ((val - min) / range) * 100;
              return `${x},${y}`;
            })
            .join(" ")}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2.5"
        />
      </svg>
    </div>
  );
}

async function getWaterData() {
  return {
    pH: (7 + Math.random() * 2 - 1).toFixed(2),
    temperature: (27 + Math.random() * 4 - 2).toFixed(1),
    TDS: (250 + Math.random() * 100 - 50).toFixed(0),
  };
}

const phSensor = new SensorData("pH", "pH", 6.5, 8.5);
const tempSensor = new SensorData("Temperature", "°C", 20, 35);
const tdsSensor = new SensorData("TDS", "ppm", 0, 500);

export default function Dashboard() {
  const [ph, setPh] = useState([]);
  const [temp, setTemp] = useState([]);
  const [tds, setTds] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await getWaterData();

      setPh((prev) => [...prev.slice(-20), Number(data.pH)]);
      setTemp((prev) => [...prev.slice(-20), Number(data.temperature)]);
      setTds((prev) => [...prev.slice(-20), Number(data.TDS)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const lastPh = ph[ph.length - 1] || 0;
  const lastTemp = temp[temp.length - 1] || 0;
  const lastTds = tds[tds.length - 1] || 0;

  const phStatus = phSensor.getStatus(lastPh);
  const tempStatus = tempSensor.getStatus(lastTemp);
  const tdsStatus = tdsSensor.getStatus(lastTds);

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #020617, #1e3a8a, #0f172a)",
    padding: "32px",
  };

  const maxWidthStyle = {
    maxWidth: "1280px",
    margin: "0 auto",
  };

  const headerContainerStyle = {
    marginBottom: "40px",
  };

  const headerFlexStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  };

  const iconBoxStyle = {
    width: "48px",
    height: "48px",
    background: "#3b82f6",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const h1Style = {
    fontSize: "36px",
    fontWeight: "bold",
    color: "white",
    margin: 0,
  };

  const subtitleStyle = {
    color: "#93c5fd",
    fontSize: "14px",
    marginTop: "4px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
    marginBottom: "32px",
  };

  const cardStyle = {
    background:
      "linear-gradient(to bottom right, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.5))",
    backdropFilter: "blur(12px)",
    borderRadius: "16px",
    padding: "24px",
    border: "1px solid rgba(71, 85, 105, 0.5)",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  };

  const cardHeaderStyle = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: "16px",
    gap: "12px",
  };

  const labelStyle = {
    color: "#94a3b8",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "4px",
    maxWidth: "200px",
    lineHeight: "1.3",
  };

  const valueContainerStyle = {
    display: "flex",
    alignItems: "baseline",
    gap: "8px",
  };

  const valueStyle = {
    fontSize: "36px",
    fontWeight: "bold",
    color: "white",
  };

  const unitStyle = {
    fontSize: "18px",
    color: "#94a3b8",
  };

  const badgeStyle = (color) => ({
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: color,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
    flexShrink: 0,
    whiteSpace: "nowrap",
  });

  const rangeStyle = {
    fontSize: "12px",
    color: "#64748b",
    marginBottom: "12px",
  };

  const miniChartStyle = {
    height: "64px",
    marginLeft: "-8px",
    marginRight: "-8px",
  };

  const detailedCardStyle = {
    ...cardStyle,
    marginBottom: "24px",
  };

  const chartTitleStyle = {
    fontSize: "20px",
    fontWeight: "600",
    color: "white",
    marginBottom: "16px",
  };

  const detailedChartStyle = {
    height: "192px",
  };

  return (
    <div style={containerStyle}>
      <div style={maxWidthStyle}>
        {/* Header */}
        <div style={headerContainerStyle}>
          <div style={headerFlexStyle}>
            <div style={iconBoxStyle}>
              <svg
                style={{ width: "28px", height: "28px", color: "white" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <h1 style={h1Style}>SIMOKA</h1>
              <p style={subtitleStyle}>
                Sistem Monitoring Kualitas Air •{" "}
                <span style={{ fontStyle: "Italic" }}>
                  Terintegrasi dengan Perangkat IoT
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Status Overview Cards */}
        <div style={gridStyle}>
          {/* pH Card */}
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <div>
                <p style={labelStyle}>pH Level</p>
                <div style={valueContainerStyle}>
                  <span style={valueStyle}>{lastPh.toFixed(2)}</span>
                  <span style={unitStyle}>pH</span>
                </div>
              </div>
              <div style={badgeStyle(phStatus.color)}>{phStatus.label}</div>
            </div>
            <div style={rangeStyle}>
              Normal: {phSensor.min} - {phSensor.max} pH
            </div>
            <div style={miniChartStyle}>
              <SensorChart title="pH" data={ph} />
            </div>
          </div>

          {/* Temperature Card */}
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <div>
                <p style={labelStyle}>Temperature</p>
                <div style={valueContainerStyle}>
                  <span style={valueStyle}>{lastTemp.toFixed(1)}</span>
                  <span style={unitStyle}>°C</span>
                </div>
              </div>
              <div style={badgeStyle(tempStatus.color)}>{tempStatus.label}</div>
            </div>
            <div style={rangeStyle}>
              Normal: {tempSensor.min} - {tempSensor.max} °C
            </div>
            <div style={miniChartStyle}>
              <SensorChart title="Temperature" data={temp} />
            </div>
          </div>

          {/* TDS Card */}
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <div>
                <p style={labelStyle}>Total Dissolved Solid</p>
                <div style={valueContainerStyle}>
                  <span style={valueStyle}>{lastTds.toFixed(0)}</span>
                  <span style={unitStyle}>ppm</span>
                </div>
              </div>
              <div style={badgeStyle(tdsStatus.color)}>{tdsStatus.label}</div>
            </div>
            <div style={rangeStyle}>
              Normal: {tdsSensor.min} - {tdsSensor.max} ppm
            </div>
            <div style={miniChartStyle}>
              <SensorChart title="TDS" data={tds} />
            </div>
          </div>
        </div>

        {/* Detailed Charts */}
        <div>
          {/* pH Chart */}
          <div style={detailedCardStyle}>
            <h3 style={chartTitleStyle}>pH Sensor</h3>
            <div style={detailedChartStyle}>
              <SensorChart title="pH Sensor" data={ph} />
            </div>
          </div>

          {/* Temperature Chart */}
          <div style={detailedCardStyle}>
            <h3 style={chartTitleStyle}>Temperature</h3>
            <div style={detailedChartStyle}>
              <SensorChart title="Temperature" data={temp} />
            </div>
          </div>

          {/* TDS Chart */}
          <div style={detailedCardStyle}>
            <h3 style={chartTitleStyle}>TDS</h3>
            <div style={detailedChartStyle}>
              <SensorChart title="TDS" data={tds} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
