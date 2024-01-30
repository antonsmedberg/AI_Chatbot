# File: backend/app.py

from flask import Flask, request, jsonify, render_template
from flask_socketio import SocketIO
import pandas as pd

# Initialize Flask app and Socket.IO
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app)

# File path for conversation data
data_store = 'data/conversations.csv'

# Load the model
model = pd.read_pickle('models/chat_model.pkl')

@app.route('/')
def home():
    return render_template('index.html')

# Socket.IO event handler for chat messages
@socketio.on('chat')
def handle_chat(message):
    print('Received message: ' + message)
    socketio.emit('chat', message)

# Route to collect conversation data
@app.route('/collect', methods=['POST'])
def collect_data():
    content = request.json
    # Assume content contains 'input_text', 'response_text', 'timestamp'
    df = pd.DataFrame([content])
    df.to_csv(data_store, mode='a', header=False, index=False)
    return jsonify({"status": "success"})

# Route for making predictions using the model
@app.route('/predict', methods=['POST'])
def predict():
    content = request.json
    input_data = content['input_text']
    # Preprocess input_data as required
    # Ensure your model and input data are compatible
    prediction = model.predict([input_data])
    return jsonify({"response": prediction[0]})

# Run the Flask app
if __name__ == '__main__':
    # If you're using eventlet or gevent for Socket.IO, 
    # you should use socketio.run() instead of app.run()
    socketio.run(app, debug=True)
