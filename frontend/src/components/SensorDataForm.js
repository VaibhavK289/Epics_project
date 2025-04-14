import React, { useState } from "react";
import { sendSensorData } from "../services/apiService";

const SensorDataForm = () => {
  const [formData, setFormData] = useState({
    sensor_id: "",
    value: "",
    timestamp: Date.now(),
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "value" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus("sending");
      const data = {
        ...formData,
        timestamp: Date.now(),
      };

      await sendSensorData(data);
      setStatus("success");

      // Reset form
      setFormData({
        sensor_id: "",
        value: "",
        timestamp: Date.now(),
      });

      // Clear success message after 3 seconds
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      setStatus("error");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="sensor-form-container">
      <h2>Submit Sensor Reading</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="sensor_id">Sensor ID:</label>
          <input
            type="text"
            id="sensor_id"
            name="sensor_id"
            value={formData.sensor_id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="value">Sensor Value:</label>
          <input
            type="number"
            id="value"
            name="value"
            step="0.01"
            value={formData.value}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Submit"}
        </button>

        {status === "success" && (
          <div className="success-message">Data successfully submitted!</div>
        )}

        {status === "error" && (
          <div className="error-message">
            Failed to submit data. Please try again.
          </div>
        )}
      </form>
    </div>
  );
};

export default SensorDataForm;
