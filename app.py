import os
import json
from datetime import datetime
from flask import (Flask, jsonify, request, render_template)
from database import write_num_db

app = Flask(__name__)
app.secret_key = os.urandom(24)
UPLOAD_FOLDER = "content"


@app.route('/', methods=['GET'])
def index():
    # return jsonify({'status': 'success', "message": 'Yes, live!'}), 200
    return render_template('index.html')


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'status': 'error', 'message': 'No file part'}), 400

    file = request.files['file']
    name = request.form.get('name', '')

    if file.filename == '':
        return jsonify({'status': 'error', 'message': 'No selected file'}), 400

    # Save the file to the 'uploads' folder
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    return jsonify({'status': 'success', 'message': f'File {file.filename} uploaded successfully', 'file_path': file_path}), 200


@app.route('/save', methods=['POST'])
def save_into_db():
    try:
        # Get the number from the POST request
        number = request.form.get('number', type=int)

        # Check if the number is provided and is valid
        if number is None:
            return jsonify({'status': 'error', 'message': 'Invalid or missing number'}), 400

        # Call the write_db function to save the number to the database
        write_num_db(number)

        return jsonify({'status': 'success', 'message': f'Number {number} saved successfully!'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
