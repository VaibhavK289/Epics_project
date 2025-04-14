import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SensorDashboard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initial data fetch
    fetchData();

    // Set up interval for real-time updates
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/latest-data");
      setSensorData(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch sensor data");
      setLoading(false);
    }
  };

  // Prepare chart data
  const chartData = {
    labels: sensorData.map((d) =>
      new Date(parseInt(d.timestamp)).toLocaleTimeString()
    ),
    datasets: [
      {
        label: "Sensor Values",
        data: sensorData.map((d) => d.value),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Predictions",
        data: sensorData.map((d) => d.prediction_result[0]), // Assuming prediction is a single value
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
    ],
  };

  // Chart options
  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  if (loading) return <div className="loading">Loading sensor data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-container">
      <h1>IoT Sensor Dashboard</h1>

      <div className="chart-container">
        <h2>Sensor Values & Predictions</h2>
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="latest-readings">
        <h2>Latest Readings</h2>
        <table className="readings-table">
          <thead>
            <tr>
              <th>Sensor ID</th>
              <th>Value</th>
              <th>Time</th>
              <th>Prediction</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.map((reading) => (
              <tr key={reading.id}>
                <td>{reading.sensor_id}</td>
                <td>{reading.value}</td>
                <td>
                  {new Date(parseInt(reading.timestamp)).toLocaleString()}
                </td>
                <td>{reading.prediction_result[0]}</td>
                <td>
                  {reading.confidence
                    ? (reading.confidence * 100).toFixed(2) + "%"
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SensorDashboard;
