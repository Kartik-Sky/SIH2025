const path = 'http://192.168.142.156:5500/build/contracts/DoctorRegistration.json'; // Adjust this path if necessary

async function loadContractData() {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        const contractAddress = jsonData.networks["5777"].address;
        const contractABI = jsonData.abi;

        return { contractAddress, contractABI };
    } catch (err) {
        console.error('Error reading or parsing the file:', err);
    }
}

(async () => {
    const { contractAddress, contractABI } = await loadContractData();
    if (contractAddress && contractABI) {
        console.log("Contract Address:", contractAddress);
        console.log("Contract ABI:", contractABI);

        const web3 = new Web3(Web3.givenProvider || "http://192.168.142.156:7545");
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        window.registerDoctor = async function() {
            const accounts = await web3.eth.getAccounts();
            const id = parseInt(document.getElementById("doctorId").value);
            const name = document.getElementById("name").value;
            const location = document.getElementById("location").value;
            const licenseNumber = document.getElementById("licenseNumber").value;
            const specializations = document.getElementById("specializations").value.split(',');

            console.log("Input Values:", { id, name, location, licenseNumber, specializations });

            if (isNaN(id) || !name || !location || !licenseNumber || specializations.length === 0) {
                alert("Please fill in all fields correctly.");
                console.error("Validation failed:", { id, name, location, licenseNumber, specializations });
                return;
            }

            try {
                const receipt = await contract.methods.registerDoctor(id, name, location, licenseNumber, specializations)
                    .send({
                        from: accounts[0],
                        gas: 5000000
                    });
                console.log("Doctor registered successfully!", receipt);
                alert("Doctor registered successfully!");
                document.getElementById("registrationForm").reset();
            } catch (error) {
                console.error("Error registering doctor:", error);
                alert("Error registering doctor: " + error.message);
            }
        };

        window.getDoctor = async function() {
            const id = document.getElementById("queryId").value;
            if (!id) {
                alert("Please enter a doctor ID.");
                return;
            }

            try {
                const doctor = await contract.methods.getDoctor(id).call();
                document.getElementById("doctorDetails").innerHTML = `
                    <p>Name: ${doctor.name}</p>
                    <p>Location: ${doctor.location}</p>
                    <p>License Number: ${doctor.licenseNumber}</p>
                    <p>Specializations: ${doctor.specializations.join(', ')}</p>
                `;
                document.getElementById("doctorDetails").classList.remove("hidden");
            } catch (error) {
                console.error("Error fetching doctor details:", error);
                alert("Error fetching doctor details: " + error.message);
            }
        };

        window.getAllDoctors = async function() {
            try {
                const accounts = await web3.eth.getAccounts();
                const result = await contract.methods.getAllDoctors().call({ from: accounts[0] });

                console.log("All Doctors:", result);
                displayDoctors(result, 'doctorAllDetails');
            } catch (error) {
                console.error("Error fetching all doctor data:", error);
            }
        };

        window.getDoctorsBySpecialization = async function() {
            const specialization = document.getElementById("specializationFilter").value;
            if (!specialization) {
                alert("Please enter a specialization.");
                return;
            }

            try {
                const doctors = await contract.methods.getDoctorsBySpecialization(specialization).call();
                displayDoctors(doctors, 'doctorBySpecializationDetails');
            } catch (error) {
                console.error("Error fetching doctors by specialization:", error);
            }
        };

        window.getDoctorsByLocation = async function() {
            const location = document.getElementById("locationFilter").value;
            if (!location) {
                alert("Please enter a location.");
                return;
            }

            try {
                const doctors = await contract.methods.getDoctorsByLocation(location).call();
                displayDoctors(doctors, 'doctorByLocationDetails');
            } catch (error) {
                console.error("Error fetching doctors by location:", error);
            }
        };

        function displayDoctors(doctors, elementId) {
            const doctorDetailsDiv = document.getElementById(elementId);
            doctorDetailsDiv.innerHTML = ''; // Clear previous details

            doctors.forEach((doctor) => {
                const doctorDiv = document.createElement('div');
                doctorDiv.className = 'doctor-record';
                doctorDiv.innerHTML = `
                    <p><strong>ID:</strong> ${doctor.id}</p>
                    <p><strong>Name:</strong> ${doctor.name}</p>
                    <p><strong>Location:</strong> ${doctor.location}</p>
                    <p><strong>License Number:</strong> ${doctor.licenseNumber}</p>
                    <p><strong>Specializations:</strong> ${doctor.specializations.join(', ')}</p>
                `;
                doctorDetailsDiv.appendChild(doctorDiv);
            });

            doctorDetailsDiv.classList.remove('hidden');
        }
    }
})();
