import Web3 from "web3";
import {
  contractABI,
  developmentContractAddress,
  productionContractAddress,
} from "../contract/contractABI";

declare global {
  interface Window {
    ethereum: any;
  }
}

const web3 = new Web3(window.ethereum);

/*
 * @param {string} userName
 * @param {string} password
 * @param {string} mnemonicPhrase
 * @param {string} walletAddress
 * @param {string} privateKey
 * @returns {object} resultObj
 * @returns {object} resultObj.result
 * @returns {number} resultObj.result.userCount
 * @returns {string} resultObj.result.userId
 * @returns {string} resultObj.result.userName
 * @returns {string} resultObj.result.message
 * @returns {boolean} resultObj.status
 * @returns {string} resultObj.transactionHash
 */

export const createNewUser = async (
  userName: string,
  password: string,
  mnemonicPhrase: string,
  walletAddress: string,
  privateKey: string
) => {
  const account = await web3.eth.getAccounts().then((accounts) => accounts[0]);
  const contract = new web3.eth.Contract(
    contractABI,
    developmentContractAddress
  );
  if (!walletAddress && !privateKey && account) {
    // If wallet address and private key are not given, but there's an active account in the browser wallet like Metamask
    walletAddress = account;
  }

  const transaction = {
    from: walletAddress,
    to: developmentContractAddress,
    data: contract.methods
      .addNewUser(userName, password, mnemonicPhrase)
      .encodeABI(),
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
        const events = await contract.getPastEvents("NewUserAdded", {
          fromBlock: txReceipt.blockNumber,
          toBlock: txReceipt.blockNumber,
        });

        const { userCount, userId, username, message } = events[0].returnValues;
        const resultObj = {
          result: {
            userCount: userCount,
            userId: userId,
            userName: username,
            message: message,
          },
          status: true,
          transactionHash: txReceipt.transactionHash,
        };

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
        const events = await contract.getPastEvents("NewUserAdded", {
          fromBlock: txReceipt.blockNumber,
          toBlock: txReceipt.blockNumber,
        });
        const { userCount, userId, username, message } = events[0].returnValues;
        const resultObj = {
          result: {
            userCount: userCount,
            userId: userId,
            userName: username,
            message: message,
          },
          status: true,
          transactionHash: txReceipt.transactionHash,
        };
        return resultObj;
      } else {
        console.log("Transaction Failed");
      }
    }
  } catch (error: any) {
    // console.error(error);
    const resultObj = {
      message: error.message,
      status: false,
      result: null,
    };
    return resultObj;
  }
};
