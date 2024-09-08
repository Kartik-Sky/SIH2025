import os
import json
from datetime import datetime
from flask import (Flask, jsonify, request, render_template)
from main_functions import fetch_tests


app = Flask(__name__)
app.secret_key = os.urandom(24)
UPLOAD_FOLDER = "content"


@app.route('/', methods=['GET'])
def index():
    # return jsonify({'status': 'success', "message": 'Yes, live!'}), 200
    return render_template('index.html')



# upload file to server
# content embedded in form 
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


# get the patients tests record from patient id:
# {"patient_id": "P001"}
@app.route('/old_tests', methods=['POST'])
def get_past_tests():
    try:
        # Get JSON data from the POST request body
        json_input = request.get_json()

        # Validate if the 'patient_id' field is present in the JSON
        if 'patient_id' not in json_input:
            return jsonify({'status': 'error', 'message': 'Missing patient_id in JSON'}), 400

        # Extract the patient_id from the JSON data
        patient_id = json_input['patient_id']

        # Call the fetch_tests function to get the test records
        test_records = fetch_tests(patient_id)

        # If no records are found, return a message
        if not test_records:
            return jsonify({'status': 'error', 'message': 'No test records found for the patient'}), 404

        # Return the test records as JSON
        return jsonify({'status': 'success', 'data': test_records}), 200
    except Exception as e:
        # Handle any exceptions and return an error message
        return jsonify({'status': 'error', 'message': str(e)}), 500

# save the json into database
# @app.route('/save_into_db', methods=['POST'])
# def save_into_db():
#     try:
#         # Get JSON data from the POST request
#         json_input = request.get_json()

#         # Check if the input is valid JSON
#         if not json_input:
#             return jsonify({'status': 'error', 'message': 'Invalid JSON input'}), 400

#         # Pass the JSON data to the function that inserts it into the database
#         put_data_from_json(json_input)

#         return jsonify({'status': 'success', 'message': 'Data saved successfully!'}), 200
#     except Exception as e:
#         return jsonify({'status': 'error', 'message': str(e)}), 500


# # save the json into database
# @app.route('/load_from_db', methods=['GET'])
# def load_from_db():
#     try:
#         # Call the imported function to get data in JSON format
#         data = get_data_in_json()

#         # Return the fetched data as a JSON response
#         return jsonify({'status': 'success', 'data': data}), 200
#     except Exception as e:
#         # Handle any exceptions that occur and return a 500 error response
#         return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
