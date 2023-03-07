import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { fetchContractMethod, getPasswordHash } from "../../services";
import { ContractMethods } from "../../services/fetchContractMethod";
import { goToNextStep } from "../../utility";
import { RouteNames, StepNames } from "../../utility/getSteps";
import {
  AuthFormActionsTypes,
  AuthFormState,
  Message,
  UiActionsTypes,
  UseAuthProvider,
} from "../typings.context";
import { UiProvider, useUi } from "../ui/UiProvider";
import { authFormReducer } from "./authFormReducer";

export const initialAuthFormState = {
  username: "",
  pwdImages: [],
  gridImages: [],
  pwdHash: "",
  mnemonicPhrase: "",
  mnemonicPhraseHash: "",
  developerDetails: {
    mode: "",
    privatekey: "",
    publicKey: "",
    useWindowWallet: true,
  },
};

const AuthFormContext = createContext<{
  authFormState: AuthFormState;
  authFormDispatch: React.Dispatch<any>;
  isLoading: boolean;
  message?: Message;
}>({
  authFormState: initialAuthFormState,
  authFormDispatch: () => null,
  isLoading: false,
  message: {
    type: "",
    description: "",
  },
});

export type Props = {
  children: React.ReactNode;
  privateKey?: string;
  publicKey?: string;
  mode?: string;
  useWindowWallet?: boolean;
};

export const useAuthProvider = (): UseAuthProvider =>
  useContext(AuthFormContext);

export const VisualDAuthProvider = ({
  privateKey,
  publicKey,
  mode,
  useWindowWallet,
  children,
}: Props): any => {
  const [authFormState, authFormDispatch] = useReducer(
    authFormReducer,
    initialAuthFormState
  );

  const [isLoading, setLoader] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({
    type: "",
    description: "",
  });

  const [onSuccess, setOnSuccess] = useState<any>({});
  const [onError, setOnError] = useState<any>({});

  useEffect(() => {
    if (privateKey && publicKey && mode) {
      authFormDispatch({
        type: AuthFormActionsTypes.SET_DEVELOPER_DETAILS,
        payload: {
          mode,
          privateKey,
          publicKey,
          useWindowWallet,
        },
      });
    } else {
      console.log("privateKey, publicKey, mode not found");
    }
  }, [privateKey, publicKey, mode, useWindowWallet]);

  useEffect(() => {
    if (authFormState.pwdImages.length > 0 && authFormState.username) {
      authFormDispatch({
        type: AuthFormActionsTypes.SET_PWD_HASH,
        payload: getPasswordHash(
          authFormState.pwdImages,
          authFormState.username
        ),
      });
    }
  }, [authFormState.pwdImages]);

  const { uiState, uiDispatch } = useUi();
  const contractMethodResponseHandler = () => {
    const { currentStep, nextStep, previousStep, chosenRoute, allSteps } =
      uiState;
    const {
      username,
      pwdHash,
      mnemonicPhrase,
      developerDetails: { mode, privateKey, useWindowWallet, walletAddress },
    } = authFormState;
    if (chosenRoute === RouteNames.REGISTER) {
      switch (currentStep) {
        case StepNames.USERNAME:
          let response: any;
          usernameResponseHandler(response);
          break;
        case StepNames.PASSWORD:
          if (pwdHash && username) {
            response = fetchContractMethod(
              ContractMethods.CREATE_NEW_USER,
              mode,
              walletAddress,
              privateKey,
              useWindowWallet,
              { username, pwdHash },
              setLoader
            );
          } else {
            setMessage({
              type: "error",
              description: "Password are required.",
            });
          }
          if (response.status) {
            setOnSuccess(response);
            setMessage({
              type: "success",
              description: response?.message,
            });
            goToNextStep(allSteps, currentStep, uiDispatch);
          } else {
            setMessage({
              type: "error",
              description: response?.message,
            });
            setOnError(response);
          }
          break;
        case StepNames.DONE:
          if (onSuccess?.status) {
            setMessage({
              type: "success",
              description: onSuccess?.message,
            });
          } else {
            setMessage({
              type: "error",
              description: onError?.message,
            });
          }
          break;
      }
    }

    function usernameResponseHandler(response: any) {
      if (username) {
        response = fetchContractMethod(
          ContractMethods.IS_USERNAME_TAKEN,
          mode,
          walletAddress,
          privateKey,
          useWindowWallet,
          { username },
          setLoader
        );
      } else {
        setMessage({
          type: "error",
          description: "Username is required.",
        });
      }
      if (response) {
        if (response.isUsernameTaken) {
          setMessage({
            type: "error",
            description: response?.message,
          });
        } else {
          setMessage({
            type: "success",
            description: response?.message,
          });
          goToNextStep(allSteps, currentStep, uiDispatch);
        }
      }
    }
  };

  return (
    <AuthFormContext.Provider
      value={{ authFormState, authFormDispatch, isLoading, message }}
    >
      <UiProvider>{children}</UiProvider>
    </AuthFormContext.Provider>
  );
};
