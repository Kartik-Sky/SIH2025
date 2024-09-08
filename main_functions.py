import sqlite3
import json
conn = sqlite3.connect('main.db')
cursor = conn.cursor()


def fetch_tests(Patient_ID):
    # Connect to SQLite database
    conn = sqlite3.connect('main.db')
    cursor = conn.cursor()

    # Fetch column names
    cursor.execute("PRAGMA table_info(TESTS)")
    columns_info = cursor.fetchall()
    column_names = [info[1] for info in columns_info]

    # Fetch test records for the given Patient_ID using parameterized query to prevent SQL injection
    cursor.execute("SELECT * FROM TESTS WHERE PATIENT_ID = ?", (Patient_ID,))
    records = cursor.fetchall()

    # Create a list of dictionaries with column names as keys
    tests = [dict(zip(column_names, record)) for record in records]

    # Close the connection
    conn.close()

    # Return the records as a JSON string
    # return json.dumps(tests, indent=4)
    # return json.dumps(tests)
    return json.dumps(tests)


