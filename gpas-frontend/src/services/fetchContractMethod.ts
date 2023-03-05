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
 * @param {string} route
 * @param {string} currentStep
 * @param {string} mode
 * @param {string} walletAddress
 * @param {string} privateKey
 * @param {boolean} useWindowWallet
 * @param {object} methodParams
 * @param {function} setLoader
 * @returns {object} contractResponse
 * @returns {string} contractResponse.message
 * @returns {boolean} contractResponse.status
 * @returns {string} contractResponse.result
 * @description This function is used to call the contract methods
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
) => {
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
