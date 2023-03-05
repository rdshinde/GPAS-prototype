import Web3 from "web3";
import {
  contractABI,
  developmentContractAddress,
  productionContractAddress,
} from "../contract/contractABI";

import { RouteNames, StepNames } from "../utility/getSteps";
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

const web3 = new Web3(window.ethereum);

let contractAddress: any;

/**
 * @param {string} route - RouteNames enum value from utility/getSteps.ts
 * @param {string} currentStep - StepNames enum value from utility/getSteps.ts
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

export const fetchContractMethod = async (
  route: RouteNames,
  currentStep: StepNames,
  mode: "Production" | "Development",
  walletAddress: string,
  privateKey: string,
  useWindowWallet: boolean,
  methodParams: any | null,
  setLoader: (value: boolean) => void
): Promise<any> => {
  const account = await web3.eth.getAccounts().then((accounts) => accounts[0]);
  if (mode === "Production") {
    contractAddress = productionContractAddress;
  } else if (mode === "Development") {
    contractAddress = developmentContractAddress;
  }
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  if (!walletAddress && !privateKey && account) {
    walletAddress = account;
  }
  const transaction = {
    from: walletAddress,
    to: contractAddress,
    gas: "3000000",
  };

  let contractResponse;
  switch (route) {
    case RouteNames.REGISTER:
      switch (currentStep) {
        case StepNames.USERNAME:
          contractResponse = await isUsernameTaken(
            methodParams.username,
            contract,
            setLoader
          );
          break;
        case StepNames.DONE:
          contractResponse = createNewUser(
            methodParams.username,
            methodParams.password,
            methodParams.mnemonicPhrase,
            privateKey,
            useWindowWallet,
            contract,
            web3,
            transaction,
            setLoader
          );

          break;
        default:
          break;
      }
      break;
    case RouteNames.LOGIN:
      switch (currentStep) {
        case StepNames.USERNAME:
          contractResponse = await isUsernameTaken(
            methodParams.username,
            contract,
            setLoader
          );
          break;
        case StepNames.DONE:
          contractResponse = await loginRegisteredUser(
            methodParams.username,
            methodParams.password,
            contract,
            setLoader
          );
          break;

        default:
          break;
      }
    case RouteNames.RECOVER:
      switch (currentStep) {
        case StepNames.USERNAME:
          contractResponse = await isUsernameTaken(
            methodParams.username,
            contract,
            setLoader
          );
          if (contractResponse?.status && contractResponse?.result) {
            contractResponse = await getMnemonicPhrase(
              methodParams.username,
              contract,
              setLoader
            );
          }
          break;
        case StepNames.VERIFY:
          contractResponse = await verifyMnemonicPhrase(
            methodParams.username,
            methodParams.mnemonicPhrase,
            contract,
            setLoader
          );
          break;
        case StepNames.DONE:
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
        default:
          break;
      }
    default:
      break;
  }
  return contractResponse;
};
