// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HospitalRegistration {
    struct Hospital {
        uint id;
        string name;
        string location;
        string coordinates;
        string licenseNumber;
    }

    mapping(uint => Hospital) public hospitals;
    uint[] public hospitalIds;
    
    event HospitalRegistered(uint id, string name, string location, string coordinates, string licenseNumber);
    
    function registerHospital(
        uint _id, 
        string memory _name, 
        string memory _location, 
        string memory _coordinates, 
        string memory _licenseNumber
    ) public {
        require(bytes(hospitals[_id].name).length == 0, "Hospital already registered.");
        
        hospitals[_id] = Hospital(_id, _name, _location, _coordinates, _licenseNumber);
        hospitalIds.push(_id);
        
        emit HospitalRegistered(_id, _name, _location, _coordinates, _licenseNumber);
    }

    function getHospital(uint _id) public view returns (Hospital memory) {
        return hospitals[_id];
    }

    // New function to get all hospitals
    function getAllHospitals() public view returns (
        uint[] memory,
        string[] memory,
        string[] memory,
        string[] memory,
        string[] memory
    ) {
        uint totalHospitals = hospitalIds.length;
        string[] memory names = new string[](totalHospitals);
        string[] memory locations = new string[](totalHospitals);
        string[] memory coordinates = new string[](totalHospitals);
        string[] memory licenseNumbers = new string[](totalHospitals);

        for (uint i = 0; i < totalHospitals; i++) {
            uint id = hospitalIds[i];
            Hospital memory hospital = hospitals[id];
            names[i] = hospital.name;
            locations[i] = hospital.location;
            coordinates[i] = hospital.coordinates;
            licenseNumbers[i] = hospital.licenseNumber;
        }

        return (hospitalIds, names, locations, coordinates, licenseNumbers);
    }
}
