require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// ML service configuration
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:5000";

// Endpoint to receive sensor data
app.post("/api/sensor-readings", async (req, res) => {
  const client = await pool.connect();

  try {
    // Start transaction
    await client.query("BEGIN");

    const { sensor_id, value, timestamp, received_at } = req.body;

    // Insert sensor reading
    const dbResult = await client.query(
      "INSERT INTO sensor_readings(sensor_id, value, timestamp, received_at) VALUES($1, $2, $3, $4) RETURNING id",
      [sensor_id, value, timestamp, received_at]
    );

    const sensorReadingId = dbResult.rows[0].id;

    // Get prediction from ML service
    const mlResponse = await axios.post(`${ML_SERVICE_URL}/predict`, {
      features: [value], // Adjust based on your model's expected input
    });

    // Store prediction
    await client.query(
      "INSERT INTO predictions(sensor_reading_id, prediction_result, confidence) VALUES($1, $2, $3)",
      [
        sensorReadingId,
        mlResponse.data.prediction,
        mlResponse.data.confidence || null,
      ]
    );

    // Commit transaction
    await client.query("COMMIT");

    res.status(200).json({
      status: "success",
      data: {
        sensor_reading_id: sensorReadingId,
        prediction: mlResponse.data.prediction,
      },
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error processing data:", error);
    res.status(500).json({ status: "error", message: error.message });
  } finally {
    client.release();
  }
});

// Endpoint to get latest readings and predictions
app.get("/api/latest-data", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT sr.id, sr.sensor_id, sr.value, sr.timestamp, sr.received_at, 
             p.prediction_result, p.confidence
      FROM sensor_readings sr
      JOIN predictions p ON sr.id = p.sensor_reading_id
      ORDER BY sr.created_at DESC
      LIMIT 10
    `);

    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
