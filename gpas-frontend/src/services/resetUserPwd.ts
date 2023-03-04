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
  * @param {string} username
  * @param {string} newPassword
  * @param {string} walletAddress
  * @param {string} privateKey
  * @returns {object} resultObj
  * @returns {string} resultObj.message
  * @returns {boolean} resultObj.status
  * @returns {boolean} resultObj.result
  * @returns {string} resultObj.transactionHash
  * @returns {string} resultObj.userName

*/

export const resetUserPwd = async (
  username: string,
  newPassword: string,
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
    data: contract.methods.resetUserPassword(username, newPassword).encodeABI(),
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
        const events = await contract.getPastEvents("ResetUserPwd", {
          fromBlock: txReceipt.blockNumber,
          toBlock: txReceipt.blockNumber,
        });

        const { username, message, status, result } = events[0].returnValues;
        const resultObj = {
          userName: username,
          message: message,
          status: status,
          result: result,
          transactionHash: txReceipt.transactionHash,
        };
        console.log(
          `User added: username=${username}, username=${username}, message=${message}`
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
        const events = await contract.getPastEvents("ResetUserPwd", {
          fromBlock: txReceipt.blockNumber,
          toBlock: txReceipt.blockNumber,
        });
        const { username, message, status, result } = events[0].returnValues;
        const resultObj = {
          userName: username,
          message: message,
          status: status,
          result: result,
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
      message: error.message,
      result: false,
      status: false,
    };
    return resultObj;
  }
};
