import Web3 from "web3";
import {
  contractABI,
  productionContractAddress,
} from "../contract/contractABI";

declare global {
  interface Window {
    ethereum: any;
  }
}
const web3 = new Web3(window.ethereum);

/**
 * 
 * @param username 
 * @param newUsername 
 * @param walletAddress 
 * @param privateKey 
 * @returns  The result object with the transaction hash and the status of the transaction.
 * @description This function changes the username of a user in the blockchain and returns the result object with the transaction hash and the status of the transaction.
 */

export const changeUsername = async (
  username: string,
  newUsername: string,
  walletAddress: string,
  privateKey: string
) => {
  const account = await web3.eth.getAccounts().then((accounts) => accounts[0]);
  const contract = new web3.eth.Contract(
    contractABI,
    productionContractAddress
  );
  if (!walletAddress && !privateKey && account) {
    // If wallet address and private key are not given, but there's an active account in the browser wallet like Metamask
    walletAddress = account;
  }
  const transaction = {
    from: walletAddress,
    to: productionContractAddress,
    data: contract.methods.changeUsername(username, newUsername).encodeABI(),
    gas: "3000000",
  };

  try {
    let result;
    if (privateKey) {
      // If a private key is provided, sign the transaction with it
      const signedTx: any = await web3.eth.accounts.signTransaction(
        transaction,
        privateKey
      );
      const txReceipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );

      if (txReceipt.status) {
        const events = await contract.getPastEvents("ChangeUsername", {
          fromBlock: txReceipt.blockNumber,
          toBlock: txReceipt.blockNumber,
        });

        const { message, status, userId } = events[0].returnValues;
        const resultObj = {
          userId: userId,
          status: status,
          message: message,
          transactionHash: txReceipt.transactionHash,
        };
        console.log(
          `User added: id=${userId}, username=${username}, message=${message}`
        );
        return resultObj;
      } else {
        console.log("Transaction Failed");
      }
    } else {
      // Otherwise, prompt the user to sign the transaction with their browser wallet
      const tx = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transaction],
      });
      const txReceipt = await web3.eth.getTransactionReceipt(tx);
      if (txReceipt.status) {
        const events = await contract.getPastEvents("ChangeUsername", {
          fromBlock: txReceipt.blockNumber,
          toBlock: txReceipt.blockNumber,
        });
        const { message, status, userId } = events[0].returnValues;
        const resultObj = {
          userId: userId,
          status: status,
          message: message,
          transactionHash: txReceipt.transactionHash,
        };

        return resultObj;
      } else {
        console.log("Transaction Failed");
      }
    }
  } catch (error: any) {
    console.error(error);
    const resultObj = {
      userId: "",
      status: false,
      message: error.message,
      transactionHash: "",
    };
    return resultObj;
  }
};
