# File: backend/app.py
from flask import Flask, request, jsonify, render_template
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import pandas as pd
import requests
import logging
# Import necessary libraries for Hugging Face integration
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline

# Initialize logging
logging.basicConfig(level=logging.INFO)

# Initialize Flask app and Socket.IO
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app)

# After initializing your Flask app
CORS(app)

# File path for conversation data
data_store = 'data/conversations.csv'

# Initialize the Hugging Face pipeline globally to avoid reloading it on each request
chat_pipeline = None

# Load a local model or Hugging Face model based on connectivity
def load_model():
    """Load the model based on connectivity."""
    try:
        if is_online():
            logging.info("Online: Loading model from Hugging Face.")
            chat_pipeline = pipeline("text-generation", model="microsoft/DialoGPT-medium")
        else:
            logging.info("Offline: Loading local model.")
            model = pd.read_pickle('models/chat_model.pkl')
            chat_pipeline = lambda x: model.predict([x])[0]  # Mock pipeline function for local model
        return chat_pipeline
    except Exception as e:
        logging.error(f"Error loading model: {e}")
        return None

model, tokenizer = load_model()


def is_online():
    """Check internet connectivity."""
    try:
        requests.get("http://www.google.com", timeout=5)
        return True
    except requests.ConnectionError:
        return False


@app.route('/')
def home():
    """Serve the home page."""
    return render_template('index.html')

@socketio.on('chat')
def handle_chat(message):
    """Handle chat messages via WebSocket."""
    logging.info(f'Received message: {message}')
    response = predict_chat_message(message)
    emit('chat', response)

def predict_chat_message(input_data):
    """Predict the response for a given input message."""
    global chat_pipeline
    if not chat_pipeline:
        chat_pipeline = load_model()
    if chat_pipeline:
        try:
            response = chat_pipeline(input_data)[0]['generated_text']
            return response
        except Exception as e:
            logging.error(f"Error generating response: {e}")
            return "Sorry, I can't respond right now."
    else:
        return "Model not loaded."

@app.route('/collect', methods=['POST'])
def collect_data():
    """Collect and store conversation data."""
    content = request.json
    try:
        df = pd.DataFrame([content])
        df.to_csv(data_store, mode='a', header=False, index=False)
        return jsonify({"status": "success"})
    except Exception as e:
        logging.error(f"Error saving data: {e}")
        return jsonify({"status": "failure", "error": str(e)})

@app.route('/predict', methods=['POST'])
def predict():
    """Predict response for a given input text via HTTP."""
    content = request.json
    response = predict_chat_message(content['input_text'])
    return jsonify({"response": response})

if __name__ == '__main__':
    chat_pipeline = load_model()  # Load the model when starting the app
    socketio.run(app, debug=True)