import API_CONFIG from "../config/api";

// Service for backend API calls
export const fetchLatestSensorData = async () => {
  try {
    const response = await fetch(
      `${API_CONFIG.BACKEND_URL}${API_CONFIG.endpoints.sensorData}`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    throw error;
  }
};

// Service for gateway API calls
export const sendSensorData = async (sensorData) => {
  try {
    const response = await fetch(
      `${API_CONFIG.GATEWAY_URL}${API_CONFIG.endpoints.gatewayData}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sensorData),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending sensor data:", error);
    throw error;
  }
};
