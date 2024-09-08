// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DoctorRegistration {
    // Structure to store doctor details
    struct Doctor {
        uint256 id; // Doctor's unique ID
        string name; // Doctor's name
        string location; // Location of the doctor
        string licenseNumber; // License number of the doctor
        string[] specializations; // List of specializations
        bool isRegistered; // Flag to check if the doctor is registered
    }

    // Mapping from doctor ID to Doctor struct
    mapping(uint256 => Doctor) private doctors;

    // Array to keep track of all registered doctor IDs
    uint256[] private doctorIds;

    // Event emitted when a new doctor is registered
    event DoctorRegistered(uint256 id, string name, string location, string licenseNumber);

    // Event emitted when a doctor's specializations are updated
    event SpecializationsUpdated(uint256 id, string[] specializations);

    // Function to register a new doctor
    function registerDoctor(
        uint256 _id,
        string memory _name,
        string memory _location,
        string memory _licenseNumber,
        string[] memory _specializations
    ) public {
        require(!doctors[_id].isRegistered, "Doctor already registered.");

        // Store the doctor data
        doctors[_id] = Doctor({
            id: _id,
            name: _name,
            location: _location,
            licenseNumber: _licenseNumber,
            specializations: _specializations,
            isRegistered: true
        });

        // Add doctor ID to the list of registered doctors
        doctorIds.push(_id);

        emit DoctorRegistered(_id, _name, _location, _licenseNumber);
    }

    // Function to update a doctor's specializations
    function updateSpecializations(uint256 _id, string[] memory _newSpecializations) public {
        require(doctors[_id].isRegistered, "Doctor not registered.");

        // Update the specializations field
        doctors[_id].specializations = _newSpecializations;

        emit SpecializationsUpdated(_id, _newSpecializations);
    }

    // Function to get doctor details
    function getDoctor(uint256 _id) public view returns (
        uint256 id,
        string memory name,
        string memory location,
        string memory licenseNumber,
        string[] memory specializations
    ) {
        require(doctors[_id].isRegistered, "Doctor not registered.");

        Doctor memory doctor = doctors[_id];

        return (
            doctor.id,
            doctor.name,
            doctor.location,
            doctor.licenseNumber,
            doctor.specializations
        );
    }

    // Function to get all registered doctors
    function getAllDoctors() public view returns (Doctor[] memory) {
        uint256 totalDoctors = doctorIds.length;
        Doctor[] memory allDoctors = new Doctor[](totalDoctors);

        for (uint256 i = 0; i < totalDoctors; i++) {
            allDoctors[i] = doctors[doctorIds[i]];
        }

        return allDoctors;
    }

    // Function to get doctors by specialization
    function getDoctorsBySpecialization(string memory _specialization) public view returns (Doctor[] memory) {
        uint256 totalDoctors = doctorIds.length;
        uint256 count = 0;

        // First, count the doctors with the given specialization
        for (uint256 i = 0; i < totalDoctors; i++) {
            string[] memory specializations = doctors[doctorIds[i]].specializations;
            for (uint256 j = 0; j < specializations.length; j++) {
                if (keccak256(abi.encodePacked(specializations[j])) == keccak256(abi.encodePacked(_specialization))) {
                    count++;
                    break;
                }
            }
        }

        // Create a temporary array to store the filtered doctors
        Doctor[] memory filteredDoctors = new Doctor[](count);
        uint256 index = 0;

        // Fill the filtered array with doctors having the given specialization
        for (uint256 i = 0; i < totalDoctors; i++) {
            string[] memory specializations = doctors[doctorIds[i]].specializations;
            for (uint256 j = 0; j < specializations.length; j++) {
                if (keccak256(abi.encodePacked(specializations[j])) == keccak256(abi.encodePacked(_specialization))) {
                    filteredDoctors[index] = doctors[doctorIds[i]];
                    index++;
                    break;
                }
            }
        }

        return filteredDoctors;
    }

    // Function to get doctors by location
    function getDoctorsByLocation(string memory _location) public view returns (Doctor[] memory) {
        uint256 totalDoctors = doctorIds.length;
        uint256 count = 0;

        // First, count the doctors with the given location
        for (uint256 i = 0; i < totalDoctors; i++) {
            if (keccak256(abi.encodePacked(doctors[doctorIds[i]].location)) == keccak256(abi.encodePacked(_location))) {
                count++;
            }
        }

        // Create a temporary array to store the filtered doctors
        Doctor[] memory filteredDoctors = new Doctor[](count);
        uint256 index = 0;

        // Fill the filtered array with doctors having the given location
        for (uint256 i = 0; i < totalDoctors; i++) {
            if (keccak256(abi.encodePacked(doctors[doctorIds[i]].location)) == keccak256(abi.encodePacked(_location))) {
                filteredDoctors[index] = doctors[doctorIds[i]];
                index++;
            }
        }

        return filteredDoctors;
    }
}
