// API configuration
const API_CONFIG = {
  BACKEND_URL: process.env.REACT_APP_API_URL || "http://localhost:4000",
  GATEWAY_URL: process.env.REACT_APP_GATEWAY_URL || "http://localhost:3001",

  // API endpoints
  endpoints: {
    sensorData: "/api/latest-data",
    sensorReadings: "/api/sensor-readings",
    gatewayData: "/api/sensor-data",
  },
};

export default API_CONFIG;