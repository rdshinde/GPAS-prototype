import Web3 from "web3";
import env from "react-dotenv";

import {
  contractABI,
  developmentContractAddress,
  productionContractAddress,
} from "../contract/contractABI";

import {
  isUsernameTaken,
  createNewUser,
  getMnemonicPhrase,
  loginRegisteredUser,
  resetUserPwd,
  verifyMnemonicPhrase,
} from "../services";

declare global {
  interface Window {
    ethereum: any;
  }
}

// const web3 = new Web3(window.ethereum);
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

/**
 * @param {string} contractMethod - Any method from ContractMethods
 * @param {string} mode - "Production" or "Development"
 * @param {string} walletAddress - wallet address of the user who is calling the contract method
 * @param {string} privateKey - private key of the user who is calling the contract method
 * @param {boolean} useWindowWallet - boolean value to determine if the user is using their browser wallet
 * @param {object} methodParams - object containing the parameters required to call the contract method
 * @param {function} setLoader - function to set the loader state
 * @returns {object} contractResponse - object containing the response from the contract method
 * @returns {string} contractResponse.message - message from the contract method
 * @returns {boolean} contractResponse.status - status from the contract method
 * @returns {string} contractResponse.result - result from the contract method
 * @description This function is used to call the contract methods from the services
 */

export enum ContractMethods {
  IS_USERNAME_TAKEN = "isUsernameTaken",
  CREATE_NEW_USER = "createNewUser",
  GET_MNEMONIC_PHRASE = "getMnemonicPhrase",
  LOGIN_REGISTERED_USER = "loginRegisteredUser",
  RESET_USER_PASSWORD = "resetUserPwd",
  VERIFY_MNEMONIC_PHRASE = "verifyMnemonicPhrase",
}

export const fetchContractMethod = async (
  ContractMethod: ContractMethods,
  mode: "Production" | "Development",
  walletAddress: string,
  privateKey: string,
  useWindowWallet: boolean,
  methodParams: any | null,
  setLoader: (value: boolean) => void
): Promise<any> => {
  let contractAddress: any;
  let wallet: any;
  if (mode === "Production") {
    contractAddress = productionContractAddress;
  } else if (mode === "Development") {
    contractAddress = developmentContractAddress;
  } else {
    contractAddress = env.DEVELOPMENT_CONTRACT_ADDRESS;
  }

  const account = await web3.eth.getAccounts().then((accounts) => accounts[0]);
  const contract: any = new web3.eth.Contract(contractABI, contractAddress);
  console.log({ walletAddress, privateKey, account, useWindowWallet });
  if (!walletAddress && !privateKey && account) {
    wallet = account;
  } else {
    wallet = walletAddress;
  }

  const transaction = {
    from: web3.utils.toChecksumAddress(wallet),
    to: env.DEVELOPMENT_CONTRACT_ADDRESS,
    gas: '3000000',
  };

  let contractResponse;
  switch (ContractMethod) {
    case ContractMethods.IS_USERNAME_TAKEN:
      contractResponse = await isUsernameTaken(
        methodParams.username,
        contract,
        setLoader
      );
      break;
    case ContractMethods.CREATE_NEW_USER:
      contractResponse = await createNewUser(
        methodParams.username,
        methodParams.pwdHash,
        methodParams.mnemonicPhrase,
        privateKey,
        useWindowWallet,
        contract,
        web3,
        transaction,
        setLoader
      );
      break;

    case ContractMethods.LOGIN_REGISTERED_USER:
      contractResponse = await loginRegisteredUser(
        methodParams.username,
        methodParams.password,
        contract,
        setLoader
      );
      break;

    case ContractMethods.GET_MNEMONIC_PHRASE:
      contractResponse = await getMnemonicPhrase(
        methodParams.username,
        contract,
        setLoader
      );
      break;

    case ContractMethods.VERIFY_MNEMONIC_PHRASE:
      contractResponse = await verifyMnemonicPhrase(
        methodParams.username,
        methodParams.mnemonicPhrase,
        contract,
        setLoader
      );
      break;

    case ContractMethods.RESET_USER_PASSWORD:
      contractResponse = await resetUserPwd(
        methodParams.username,
        methodParams.newPassword,
        privateKey,
        contract,
        transaction,
        web3,
        useWindowWallet,
        setLoader
      );
      break;
  }
  return contractResponse;
};
