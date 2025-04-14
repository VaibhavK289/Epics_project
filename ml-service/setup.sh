#!/bin/bash
mkdir -p models
cd models
git clone https://github.com/Epics-IoT-Project-Devs/ML-Model.git temp
cp temp/model.pkl .
rm -rf temp
cd ..
echo "Model setup complete!"