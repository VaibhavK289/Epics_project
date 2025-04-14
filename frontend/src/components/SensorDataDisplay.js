import React, { useState, useEffect } from "react";
import { fetchLatestSensorData } from "../services/apiService";

const SensorDataDisplay = () => {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await fetchLatestSensorData();
        setSensorData(data.data || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch sensor data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getData();

    // Refresh data every 30 seconds
    const interval = setInterval(getData, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading sensor data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="sensor-data-container">
      <h2>Latest Sensor Readings</h2>
      {sensorData.length === 0 ? (
        <p>No sensor data available</p>
      ) : (
        <table className="sensor-table">
          <thead>
            <tr>
              <th>Sensor ID</th>
              <th>Value</th>
              <th>Timestamp</th>
              <th>Prediction</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.map((reading) => (
              <tr key={reading.id}>
                <td>{reading.sensor_id}</td>
                <td>{reading.value}</td>
                <td>{new Date(reading.timestamp).toLocaleString()}</td>
                <td>{reading.prediction_result}</td>
                <td>
                  {reading.confidence
                    ? `${(reading.confidence * 100).toFixed(2)}%`
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SensorDataDisplay;
