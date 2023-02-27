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

*/

export const checkUsernameAvailibility = async (userName: string) => {
  try {
    const contract = new web3.eth.Contract(
      contractABI,
      developmentContractAddress
    );
    const result = await contract.methods
      .isUserAlreadyRegistered(userName)
      .call();
    return result;
  } catch (e) {
    console.log(e);
  }
};
