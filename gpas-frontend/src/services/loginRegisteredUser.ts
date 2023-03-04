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
  * @param {string} password
  * @param {string} walletAddress
  * @param {string} privateKey
  * @returns {object} resultObj
  * @returns {string} resultObj.message
  * @returns {boolean} resultObj.status
  * @returns {boolean} resultObj.result
  
*/

export const loginRegisteredUser = async (
  username: string,
  password: string,
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
      .loginRegisteredUser(username, password)
      .call(async (err: any, result: any) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log(result);
          const resultObj = {
            message: result[0],
            result: result[1],
            status: result[2],
          };
          return resultObj;
        }
      });
  } catch (err: any) {
    console.log(err.message);
    const resultObj = {
      message: err.message,
      result: null,
      status: false,
    };
    return resultObj;
  }
};
