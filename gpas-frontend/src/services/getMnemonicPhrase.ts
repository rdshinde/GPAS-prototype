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
 * @param {string} walletAddress
 * @param {string} privateKey
 * @returns {object} resultObj
 * @returns {string} resultObj.message
 * @returns {boolean} resultObj.status
 * @returns {string} resultObj.result
 */

export const getMnemonicPhrase = async (
  username: string,
  walletAddress: string,
  privateKey: string
) => {
  const account = await web3.eth.getAccounts().then((accounts) => accounts[0]);
  const contract = new web3.eth.Contract(
    contractABI,
    productionContractAddress
  );

  if (!walletAddress && !privateKey && account) {
    walletAddress = account;
  }
  try {
    contract.methods
      .getMnemonicPhrase(username)
      .call(async (err: any, result: any) => {
        if (err) {
          console.log(err.message);
        } else {
          const resultObj = {
            message: result[0],
            status: result[1],
            result: result[2],
          };
          console.log("mnemonicPhrase", resultObj);
          return resultObj;
        }
      });
  } catch (err: any) {
    console.log(err.message);
  }
};
