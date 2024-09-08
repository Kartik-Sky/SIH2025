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


# Call the function to create the table
create_num_table()

# Call these functions to create the tables
create_patient_table()
create_appointments_table()

