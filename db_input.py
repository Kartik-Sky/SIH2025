from database import insert_appointment, insert_patient

"""
# ID INTEGER PRIMARY KEY AUTOINCREMENT,
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
medical_history 
"""
insert_patient("first", "last", "14-Dec-2004", 'Male', "705700000", "Add", "")


"""
# appointment_id INTEGER PRIMARY KEY AUTOINCREMENT,
hospital_id INTEGER NOT NULL,
patient_id INTEGER NOT NULL,
doctor_id INTEGER
doctor_type TEXT,
doctor_name TEXT NOT NULL,
patient_name TEXT NOT NULL,
hospital_name TEXT NOT NULL,
location TEXT NOT NULL,
FOREIGN KEY (patient_id) R
"""
insert_appointment(1, 515, 51651, "General", "Dr.ABC", "Mr.XYZ", "Apollo Hosp", "Mumbai", 13245)
