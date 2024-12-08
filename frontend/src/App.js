import React, { useState } from "react";
import { ethers } from "ethers";
import RealEstateNFTABI from "./RealEstateNFT.json";

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";

function App() {
    const [connected, setConnected] = useState(false);
    const [account, setAccount] = useState("");
    const [tokenURI, setTokenURI] = useState("");
    const [message, setMessage] = useState("");

    const connectWallet = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            setAccount(await signer.getAddress());
            setConnected(true);
        } else {
            alert("Install MetaMask!");
        }
    };

    const mintNFT = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, RealEstateNFTABI, signer);
            const tx = await contract.mintProperty(account, tokenURI);
            await tx.wait();
            setMessage("NFT Minted Successfully!");
        } catch (error) {
            setMessage("Error minting NFT: " + error.message);
        }
    };

    return (
        <div className="App">
            <h1>Real Estate NFT Marketplace</h1>
            {!connected ? (
                <button onClick={connectWallet}>Connect Wallet</button>
            ) : (
                <div>
                    <p>Connected as: {account}</p>
                    <input
                        type="text"
                        placeholder="Token URI"
                        value={tokenURI}
                        onChange={(e) => setTokenURI(e.target.value)}
                    />
                    <button onClick={mintNFT}>Mint NFT</button>
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
}

export default App;
