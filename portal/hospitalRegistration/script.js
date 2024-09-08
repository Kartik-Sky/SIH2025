const path = 'http://192.168.142.175:5500/build/contracts/HospitalRegistration.json';

async function loadContractData() {
  try {
    // Fetch the JSON file
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response as JSON
    const jsonData = await response.json();

    // Get the contract address and ABI
    const contractAddress = jsonData.networks["5777"].address;
    const contractABI = jsonData.abi;

    console.log('Contract Address:', contractAddress);
    console.log('Contract ABI:', contractABI);

    // Return the contract data
    return { contractAddress, contractABI };
  } catch (err) {
    console.error('Error reading or parsing the file:', err);
  }
}

(async () => {
  // Load the contract data
  const contractData = await loadContractData();

  if (contractData) {
    const { contractAddress, contractABI } = contractData;

    const web3 = new Web3(Web3.givenProvider || "http://192.168.142.175:7545");

    window.addEventListener('load', async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log("Connected to Ethereum");
        } catch (error) {
          console.error("User denied account access");
        }
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    });

    // Initialize the contract instance
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Register Hospital
    async function registerHospital() {
      const accounts = await web3.eth.getAccounts();
      const id = parseInt(document.getElementById("hospitalId").value); // Ensure this is a number
      const name = document.getElementById("name").value;
      const location = document.getElementById("location").value;
      const coordinates = document.getElementById("coordinates").value;
      const licenseNumber = document.getElementById("licenseNumber").value;

      if (isNaN(id) || !name || !location || !coordinates || !licenseNumber) {
        alert("Please fill in all fields correctly.");
        return;
      }

      try {
        const receipt = await contract.methods.registerHospital(id, name, location, coordinates, licenseNumber)
          .send({
            from: accounts[0],
            gas: 5000000 // Ensure gas limit is sufficient
          });
        console.log("Hospital registered successfully!", receipt);
        alert("Hospital registered successfully!");
        document.getElementById("registrationForm").reset();
      } catch (error) {
        console.error("Error registering hospital:", error);
        alert("Error registering hospital: " + error.message);
      }
    }

    // Get Hospital by ID
    async function getHospital() {
      const id = document.getElementById("queryId").value;
      if (!id) {
        alert("Please enter a hospital ID.");
        return;
      }

      try {
        const hospital = await contract.methods.getHospital(id).call();
        document.getElementById("hospitalDetails").innerHTML = `
          <p><strong>Name:</strong> ${hospital[0]}</p>
          <p><strong>Location:</strong> ${hospital[1]}</p>
          <p><strong>Coordinates:</strong> ${hospital[2]}</p>
          <p><strong>License Number:</strong> ${hospital[3]}</p>
        `;
        document.getElementById("hospitalDetails").classList.remove("hidden");
      } catch (error) {
        console.error("Error fetching hospital details:", error);
        alert("Error fetching hospital details: " + error.message);
      }
    }

    // Get All Hospitals
    async function getAllHospitals() {
      try {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.getAllHospitals().call({ from: accounts[0] });

        const ids = result[0];
        const names = result[1];
        const locations = result[2];
        const coordinates = result[3];
        const licenseNumbers = result[4];

        const hospitals = [];
        for (let i = 0; i < ids.length; i++) {
          hospitals.push({
            id: ids[i],
            name: names[i],
            location: locations[i],
            coordinates: coordinates[i],
            licenseNumber: licenseNumbers[i]
          });
        }

        console.log(hospitals);
        displayAllHospitals(hospitals);
      } catch (error) {
        console.error("Error fetching all hospital data:", error);
      }
    }

    // Display All Hospitals
    function displayAllHospitals(hospitals) {
      const hospitalDetailsDiv = document.getElementById('hospitalAllDetails');
      hospitalDetailsDiv.innerHTML = ''; // Clear previous details

      hospitals.forEach((hospital) => {
        const hospitalDiv = document.createElement('div');
        hospitalDiv.className = 'hospital-record';
        hospitalDiv.innerHTML = `
          <p><strong>ID:</strong> ${hospital.id}</p>
          <p><strong>Name:</strong> ${hospital.name}</p>
          <p><strong>Location:</strong> ${hospital.location}</p>
          <p><strong>Coordinates:</strong> ${hospital.coordinates}</p>
          <p><strong>License Number:</strong> ${hospital.licenseNumber}</p>
          <hr>
        `;
        hospitalDetailsDiv.appendChild(hospitalDiv);
      });

      hospitalDetailsDiv.classList.remove('hidden'); // Show the div
    }

    // Expose functions to the global scope
    window.registerHospital = registerHospital;
    window.getHospital = getHospital;
    window.getAllHospitals = getAllHospitals;

  } else {
    console.log('Failed to load contract data.');
  }
})();
