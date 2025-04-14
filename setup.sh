#!/bin/bash
echo "Setting up IoT ML Project..."

# Download ML model
echo "Setting up ML model..."
cd ml-service
./setup.sh
cd ..

# Setup database
echo "Setting up database schema..."
docker-compose up -d postgres
sleep 5  # Wait for postgres to start

docker-compose exec postgres psql -U postgres -d iot_project -f /app/db/schema.sql

echo "Setup complete! You can now run 'docker-compose up' to start all services."