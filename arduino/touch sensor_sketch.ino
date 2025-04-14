#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// Define sensor pins
#define SENSOR_PIN A0

// WiFi settings
const char* ssid = "YourWiFiSSID";
const char* password = "YourWiFiPassword";
const char* serverUrl = "http://your-gateway-address:3001/api/sensor-data";

void setup() {
  Serial.begin(9600);
  pinMode(SENSOR_PIN, INPUT);
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected");
}

void loop() {
  // Read sensor data
  int sensorValue = analogRead(SENSOR_PIN);
  
  // Create JSON payload
  StaticJsonDocument<200> doc;
  doc["sensor_id"] = "sensor1";
  doc["value"] = sensorValue;
  doc["timestamp"] = millis();
  
  // Serialize JSON
  String jsonData;
  serializeJson(doc, jsonData);
  
  // Send data to server
  if(WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    
    int httpCode = http.POST(jsonData);
    if(httpCode > 0) {
      String response = http.getString();
      Serial.println(response);
    } else {
      Serial.println("Error sending data");
    }
    http.end();
  }
  
  delay(5000); // Send data every 5 seconds
}