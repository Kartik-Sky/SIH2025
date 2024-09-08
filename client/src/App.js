import './App.css';
import Web3 from 'web3';
import DecryptedKeyStorage from "./contracts/DecryptedKeyStorage.json"
import { useState, useEffect } from "react";
function App() {
  const [state,setState] = useState({web3:null,contract:null});
  const [data,setData] = useState("null");
  useEffect(()=>{
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");

    async function template(){
      const web3 = new Web3(provider);
     // console.log(web3);
     // we require 2 things ABI and contact address
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = DecryptedKeyStorage.networks[networkId];
      const contract = new web3.eth.Contract(DecryptedKeyStorage.abi,deployedNetwork.address)
      // instance of our contract with whom we'll make interactions
      console.log(deployedNetwork.address);
      setState({web3:web3,contract:contract});

    }
    provider && template();
  },[]);
  //console.log(state);

  // useEffect(()=>{
  //   const {contract}=state;
  //   async function readData(){
  //     var index = document.getElementById("ID").value;

  //     const data = await contract.methods.getDecryptedKey(index).call();
  //     setData(data);
  //     //console.log(data);
  //   }
  //   contract && readData();
  // },[state]);
  const {contract} = state;
  async function readData(){
    var index = document.getElementById("ID").value;

    var data = await contract.methods.getDecryptedKey(index).call();
    setData(data);
    console.log(data);
  }
  async function writeData(params) {
    const {contract} = state;
    var key = document.getElementById("Data").value;
    var index = document.getElementById("ID").value;
    await contract.methods.addDecryptedKey(index,key).send({from:"0x4f27ED73BEA2be14c43Dab9DB8452960B8Fe4Cf0"});
    readData();
  }

  return (
    <div className="App">
      <p>Contract data: {data}</p>
      <input type="text" id="ID" placeholder='retrieving data key'></input>
      <input type="text" id="Data" placeholder='enter the data'></input>
      <button onClick={writeData}>Put Data</button>
      <button onClick={readData}>Read Data</button>
    </div>
  );
}

export default App;
