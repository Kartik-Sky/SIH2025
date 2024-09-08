import sqlite3

conn = sqlite3.connect('main.db')
cursor = conn.cursor()


# cursor.execute('DROP TABLE TESTS;')
# Patient
cursor.execute(
    '''CREATE TABLE IF NOT EXISTS PATIENT(
        PATIENT_ID text PRIMARY KEY,
        NAME TEXT NOT NULL, 
        DOB DATETIME NOT NULL,
        GENDER TEXT NOT NULL,
        PHONE_NUMBER TEXT NOT NULL,
        ADDRESS TEXT NOT NULL,
        EMAIL TEXT NOT NULL,
        EMERGENCY_CONTACT_NAME TEXT NOT NULL,
        EMERGENCY_CONTACT_NUMBER TEXT NOT NULL,
        ALLERGIES TEXT NOT NULL,
        MEDICAL_HISTORY TEXT

    ); '''
)

# APPOINTMENTS
cursor.execute(
    '''CREATE TABLE IF NOT EXISTS APPOINTMENTS(
        APPOINTMENT_ID NUMBER AUTO INCREMENT,
        Hospital_ID TEXT NOT NULL,
        PATIENT_ID TEXT NOT NULL,
        DOCTOR_ID TEXT NOT NULL,
        DR_TYPE TEXT NOT NULL,
        DOCTOR_NAME TEXT NOT NULL,
        PATIENT_NAME TEXT NOT NULL,
        HOSPITAL_NAME TEXT NOT NULL, 
        LOCATION TEXT NOT NULL,
        IMAGE_PATH TEXT NOT NULL,
        PRIMARY KEY (APPOINTMENT_ID, PATIENT_ID, DOCTOR_ID)
    );'''
)

# DOCTOR
cursor.execute(
    '''CREATE TABLE IF NOT EXISTS DOCTOR(
        DOCTOR_ID TEXT PRIMARY KEY,
        DOCTOR_NAME TEXT NOT NULL,
        DOB DATETIME NOT NULL,
        LICENSE_ID TEXT NOT NULL,
        GENDER TEXT NOT NULL,
        PHONE TEXT NOT NULL,
        EMAIL TEXT NOT NULL,
        ADDRESS TEXT NOT NULL,
        QUALIFICATIONS TEXT NOT NULL,
        TYPE TEXT NOT NULL,
        HOSPITAL_ID TEXT NOT NULL
    
    );'''
)

# Hospital
cursor.execute(
    '''CREATE TABLE IF NOT EXISTS HOSPITAL(
        HOSPITAL_ID TEXT PRIMARY KEY,
        NUM_DOCTORS INTEGER NOT NULL,
        PATIENTS_NUM INTEGER NOT NULL,
        BEDS_NUM INTEGER NOT NULL,
        ICUS_NUM INTEGER NOT NULL,
        AMBULANCES_NUM INTEGER NOT NULL,
        LOCATION INTEGER NOT NULL,
        LATITUTDE REAL NOT NULL,
        LONGITUDE REAL NOT NULL
    
    );'''
)


# SUPER ADMIN
cursor.execute(
    '''CREATE TABLE IF NOT EXISTS ADMIN(
        ADMIN_ID INTEGER,
        NAME TEXT,
        DOB DATETIME,
        GENDER TEXT,
        PHONE TEXT,
        ADDRESS TEXT,
        EMAIL TEXT
    );'''
)


# Transactions:
cursor.execute(
    '''
        CREATE TABLE IF NOT EXISTS TRANSACTIONS(
            TRANSACTION_ID TEXT AUTO INCREMENT,
            USER_TYPE TEXT,
            TIMESTAMP DATETIME NOT NULL,
            TRANSACTION_ TEXT NOT NULL
        );
    '''
)


# Prescriptions:
cursor.execute(
    '''
        CREATE TABLE IF NOT EXISTS PRESCRIPTIONS(
            PRESCRIPTION_ID INTEGER PRIMARY KEY,
            PATIENT_ID TEXT NOT NULL,
            PATIENT_NAME TEXT NOT NULL,
            DOCTOR_ID TEXT NOT NULL,
            DOCTOR_NAME TEXT NOT NULL,
            DOCTOR_TYPE TEXT NOT NULL,
            PRESCRIPTION_DATE DATETIME NOT NULL,
            FOLLOWUP DATETIME NOT NULL,
            FILE_PATHS TEXT NOT NULL
        );
'''
)


# Tests:
cursor.execute(
    '''
        CREATE TABLE IF NOT EXISTS TESTS(
            PATIENT_ID TEXT,
            PATIENT_NAME TEXT NOT NULL,
            DOCTOR_NAME TEXT NOT NULL,
            DOCTOR_TYPE TEXT NOT NULL,
            TEST_TIME DATETIME NOT NULL,
            HOSPITAL_NAME TEXT NOT NULL,
            HOSPITAL_LOCATION TEXT NOT NULL,
            FILE_PATHS TEXT NOT NULL,
            TEST_NAME TEXT NOT NULL,
            TEST_TYPE TEXT NOT NULL,
            TEST_RESULT TEXT NOT NULL,
            RESULT_SUMMARY TEXT NOT NULL,
            RESULT_DATE DATETIME NOT NULL,
            TEST_DESCRIPTION TEXT NOT NULL,
            COST INTEGER NOT NULL,
            COMMENTS TEXT NOT NULL,
            TEST_VALUES TEXT NOT NULL
        );
    '''
)


# Insert the trial data into database:
insert_query = '''
    INSERT INTO PATIENT (PATIENT_ID, NAME, DOB, GENDER, PHONE_NUMBER, ADDRESS, EMAIL, EMERGENCY_CONTACT_NAME, EMERGENCY_CONTACT_NUMBER, ALLERGIES, MEDICAL_HISTORY) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
'''

# Sample patient data
patient_data = [
    ('P001', 'John Doe', '1985-06-15', 'Male', '555-123456', '123 Main St, Cityville', 'john.doe@email.com', 'Jane Doe', '555-654321', 'Peanuts', 'Hypertension'),
    ('P002', 'Emily Smith', '1990-02-25', 'Female', '555-654987', '456 Oak St, Townville', 'emily.smith@email.com', 'James Smith', '555-987654', 'None', 'Asthma'),
    ('P003', 'Michael Johnson', '1978-12-10', 'Male', '555-789456', '789 Pine St, Villageville', 'michael.johnson@email.com', 'Sarah Johnson', '555-321789', 'Shellfish', 'Diabetes')
]

# Execute the insert commands
cursor.executemany(insert_query, patient_data)


insert_query = '''
    INSERT INTO TESTS (PATIENT_ID, PATIENT_NAME, DOCTOR_NAME, DOCTOR_TYPE, TEST_TIME, HOSPITAL_NAME, HOSPITAL_LOCATION, FILE_PATHS, TEST_NAME, TEST_TYPE, TEST_RESULT, RESULT_SUMMARY, RESULT_DATE, TEST_DESCRIPTION, COST, COMMENTS, TEST_VALUES) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
'''

# Sample test data
test_data = [
    ('P001', 'John Doe', 'Dr. Sarah Brown', 'Cardiologist', '2023-09-01 10:30:00', 'City Hospital', 'Downtown', '/path/to/results1.pdf', 'ECG', 'Cardiac', 'Normal', 'No abnormalities detected', '2023-09-02', 'Routine ECG test', 150, 'No further action required', '["PQRST", "ST"]'),
    ('P001', 'Emily Smith', 'Dr. James White', 'Neurologist', '2023-09-05 11:00:00', 'General Hospital', 'Uptown', '/path/to/results2.pdf', 'MRI Brain', 'Imaging', 'Normal', 'No abnormalities in brain structure', '2023-09-06', 'MRI scan for headache evaluation', 500, 'Follow-up if symptoms persist', '["Axial", "Sagittal"]'),
    ('P003', 'Michael Johnson', 'Dr. Linda Green', 'Endocrinologist', '2023-09-08 09:45:00', 'Central Medical Center', 'Midtown', '/path/to/results3.pdf', 'Blood Sugar Test', 'Laboratory', 'Elevated', 'Elevated fasting blood glucose', '2023-09-09', 'Routine diabetes monitoring', 100, 'Adjust medication dosage', '["Fasting", "Postprandial"]')
]

# Execute the insert commands
cursor.executemany(insert_query, test_data)

# Commit the transaction
conn.commit()
conn.close()

