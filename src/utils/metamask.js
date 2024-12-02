import { ethers } from "ethers";

export const connectWallet = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Request wallet connection
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      return {
        address: accounts[0],
        signer,
      };
    } catch (error) {
      console.error("Error connecting wallet:", error);
      return null;
    }
  } else {
    alert("MetaMask is not installed. Please install it to use this feature.");
    return null;
  }
};
