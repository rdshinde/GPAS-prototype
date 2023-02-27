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
        result = {
          userCount: userCount,
          userId: userId,
          userName: username,
          message: message,
          transactionHash: txReceipt.transactionHash,
        };
        console.log(
          `User added: count=${userCount}, id=${userId}, username=${username}, message=${message}`
        );
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
        result = {
          userCount: userCount,
          userId: userId,
          userName: username,
          message: message,
          transactionHash: txReceipt.transactionHash,
        };
        console.log(
          `User added: count=${userCount}, id=${userId}, username=${username}, message=${message}`
        );
      } else {
        console.log("Transaction Failed");
      }
    }
  } catch (error) {
    console.error(error);
  }
};
