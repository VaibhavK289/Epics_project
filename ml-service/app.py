from flask import Flask, request, jsonify
import joblib
import numpy as np
import os
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Load model
model_path = os.environ.get('MODEL_PATH', 'models/model.pkl')
try:
    model = joblib.load(model_path)
    print(f"Model loaded from {model_path}")
except Exception as e:
    print(f"Error loading model: {str(e)}")
    model = None

@app.route('/health', methods=['GET'])
def health():
    if model is None:
        return jsonify({'status': 'error', 'message': 'Model not loaded'}), 500
    return jsonify({'status': 'ok'})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if model is None:
            return jsonify({
                'success': False,
                'error': 'Model not loaded'
            }), 500
            
        data = request.get_json()
        features = np.array(data['features']).reshape(1, -1)
        
        # Make prediction
        prediction = model.predict(features)
        
        # If model provides probability, get it
        confidence = None
        if hasattr(model, 'predict_proba'):
            prob = model.predict_proba(features)
            confidence = float(np.max(prob))
        
        return jsonify({
            'success': True,
            'prediction': prediction.tolist(),
            'confidence': confidence
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)