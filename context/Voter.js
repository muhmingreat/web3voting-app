import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import web3Modal from "web3modal";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { address, votingAbi } from "./constant";
import { useRouter } from "next/router";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(votingAbi, address, signerOrProvider);

export const VotingContext = React.createContext();

export const VotingProvider = ({ children }) => {
  const dataTitle = "My Voting app";
   const router = useRouter()
  const [currentAccount, setCurrentAccount] = useState("");
  const [candidateLength, setCandidateLength] = useState("");
  const updateCandidate = [];
  const candidateIndex = [];
  const [candidateArray, setCandidateArray] = useState(updateCandidate);

  const [error, setError] = useState("");
  const highestVote = [];

  const updateVoter = [];
  const [voterArray, setVoterArray] = useState(updateVoter);
  const [voterLength, setVoterLength] = useState();
  const [voterAddress, setVoterAddress] = useState([]);

  const checkIfWalletConnected = async () => {
    if (!window.ethereum) return setError("Please install metamask");
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    }else{
        setError('Please install metamask connect and reload')
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return setError("Please Intall Metamask");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(accounts[0]);
  };

  const uploadToIpfs = async (file) => {
    try {
      const added = await client.add({ content: file });

      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      setError("Error loading file");
    }
  };
  const createVoter = async ({ formInput, fileUrl, router }) => {
    try {
      const { name, address, position } = formInput;
      console.log(name, address, position, fileUrl);
    } catch (error) {
      console.log("Error creating voter");
    }
  };
  return (
    <VotingContext.Provider
      value={{
        dataTitle,
        checkIfWalletConnected,
        connectWallet,
        uploadToIpfs,
        createVoter,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};
