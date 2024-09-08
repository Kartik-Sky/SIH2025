import sqlite3


def create_num_table():
    # Connect to (or create) the SQLite database
    conn = sqlite3.connect('numbers.db')
    cursor = conn.cursor()

    # Create a table named 'numbers_table'
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS numbers_table (
            id INTEGER PRIMARY KEY,
            number INTEGER NOT NULL
        )
    ''')

    # Commit changes and close the connection
    conn.commit()
    conn.close()


def write_num_db(number):
    # Connect to the SQLite database
    conn = sqlite3.connect('numbers.db')
    cursor = conn.cursor()

    # Insert the number into 'numbers_table'
    cursor.execute('''
        INSERT INTO numbers_table (number)
        VALUES (?)
    ''', (number,))

    # Commit changes and close the connection
    conn.commit()
    conn.close()


def create_patient_table():
    """Create the Patient table."""
    conn = sqlite3.connect('healthcare.db')
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Patient (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            dob DATE NOT NULL,
            gender TEXT CHECK(gender IN ('Male', 'Female', 'Other')) NOT NULL,
            phone TEXT NOT NULL,
            address TEXT,
            email TEXT UNIQUE NOT NULL,
            emergency_contact_name TEXT NOT NULL,
            emergency_contact_no TEXT NOT NULL,
            allergies TEXT,
            medical_history TEXT
        )
    ''')
    # last 2 are comma separated values

    conn.commit()
    conn.close()


def create_appointments_table():
    """Create the Appointments table."""
    conn = sqlite3.connect('healthcare.db')
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Appointments (
            appointment_id INTEGER PRIMARY KEY AUTOINCREMENT,
            hospital_id INTEGER NOT NULL,
            patient_id INTEGER NOT NULL,
            doctor_id INTEGER NOT NULL,
            doctor_type TEXT,
            doctor_name TEXT NOT NULL,
            patient_name TEXT NOT NULL,
            hospital_name TEXT NOT NULL,
            location TEXT NOT NULL,
            FOREIGN KEY (patient_id) REFERENCES Patient (ID)
        )
    ''')

    conn.commit()
    conn.close()


def insert_patient(first_name, last_name, dob, gender, phone, address, email, emergency_contact_name, emergency_contact_no, allergies, medical_history):
    """Insert a new patient into the Patient table."""
    conn = sqlite3.connect('healthcare.db')
    cursor = conn.cursor()

    cursor.execute('''
        INSERT INTO Patient (
            first_name, last_name, dob, gender, phone, address, email, 
            emergency_contact_name, emergency_contact_no, allergies, medical_history
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (first_name, last_name, dob, gender, phone, address, email,
          emergency_contact_name, emergency_contact_no, allergies, medical_history))

    conn.commit()
    conn.close()



def insert_appointment(hospital_id, patient_id, doctor_id, doctor_type, doctor_name, patient_name, hospital_name, location):
    """Insert a new appointment into the Appointments table."""
    conn = sqlite3.connect('healthcare.db')
    cursor = conn.cursor()

    cursor.execute('''
        INSERT INTO Appointments (
            hospital_id, patient_id, doctor_id, doctor_type, doctor_name, 
            patient_name, hospital_name, location
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (hospital_id, patient_id, doctor_id, doctor_type, doctor_name,
          patient_name, hospital_name, location))

    conn.commit()
    conn.close()


# Call the function to create the table
create_num_table()

# Call these functions to create the tables
create_patient_table()
create_appointments_table()

