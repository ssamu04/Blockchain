import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [accountBalance, setAccountBalance] = useState(undefined);
  const [frozen, setFrozen] = useState(undefined);
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const getAccountBalance = async() => {
    if (atm) {
      setAccountBalance((await atm.getAccountBalance()).toNumber());
    }
  }
  
  const toggleFreeze = async () => {
    if (atm) {
      let tx = await atm.toggleFreeze();
      await tx.wait();
      getFrozenStatus();
    }
  };  
  
  const getFrozenStatus = async () => {
    if (atm) {
      setFrozen(await atm.frozen());
    }
  };


  const deposit = async(amount) => {
    if (atm) {
      let tx = await atm.deposit(amount);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async(amount) => {
    if (atm) {
      let tx = await atm.withdraw(amount);
      await tx.wait()
      getBalance();
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    if (accountBalance == undefined) {
      getAccountBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <p>Your Account ETH Balance: {accountBalance} ETH</p>
        <button onClick={() => deposit(1)}>Deposit 1 ETH</button>
        <button onClick={() => withdraw(1)}>Withdraw 1 ETH</button>
        <br/><br/>
        <input type="number" id="depositNum" min="1" step="1" />
        <button onClick={(e) => deposit(Number(document.getElementById('depositNum').value))}>Deposit</button>
        <br/><br/>
        <input type="number" id="withdrawNum" min="1" step="1" />
        <button onClick={(e) => withdraw(Number(document.getElementById('withdrawNum').value))}>Withdraw</button>
        <br/><br/>
        <p>Contract is currently: {frozen ? "Frozen" : "Active"}</p>
        <button onClick={toggleFreeze}>{frozen ? "Unfreeze Contract" : "Freeze Contract"}</button>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>Smart Contract Management - ETH + AVAX</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
      `}
      </style>
    </main>
  )
}
