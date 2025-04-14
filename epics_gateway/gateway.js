require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
const backendUrl = process.env.BACKEND_URL || "http://localhost:4000";

app.use(cors());
app.use(bodyParser.json());

// Endpoint to receive data from Arduino
app.post("/api/sensor-data", async (req, res) => {
  try {
    const sensorData = req.body;

    // Add receipt timestamp
    sensorData.received_at = new Date().toISOString();

    console.log("Received sensor data:", sensorData);

    // Forward to main backend
    await axios.post(`${backendUrl}/api/sensor-readings`, sensorData);

    res.status(200).send({ status: "success" });
  } catch (error) {
    console.error("Error processing sensor data:", error);
    res.status(500).send({ status: "error", message: error.message });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Data Gateway running on port ${port}`);
});
