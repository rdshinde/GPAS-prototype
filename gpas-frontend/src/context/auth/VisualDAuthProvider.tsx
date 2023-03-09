import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
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
  contractMethodResponseHandler: Function;
}>({
  authFormState: initialAuthFormState,
  authFormDispatch: () => null,
  isLoading: false,
  contractMethodResponseHandler: () => false,
});

export type Props = {
  children: React.ReactNode;
  privateKey?: string;
  publicKey?: string;
  mode?: string;
  useWindowWallet?: boolean;
  onErrorHandler?: (result: any) => void;
  onSuccessHandler?: (result: any) => void;
};

export const useAuthProvider = (): UseAuthProvider =>
  useContext(AuthFormContext);

export const VisualDAuthProvider = ({
  privateKey,
  publicKey,
  mode,
  useWindowWallet,
  children,
  onErrorHandler,
  onSuccessHandler,
}: Props): any => {
  const [authFormState, authFormDispatch] = useReducer(
    authFormReducer,
    initialAuthFormState
  );

  const [isLoading, setLoader] = useState<boolean>(false);

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
  const { uiDispatch } = useUi();
  const contractMethodResponseHandler = (
    currentStep: StepNames,
    nextStep: StepNames,
    previousStep: StepNames,
    chosenRoute: RouteNames,
    allSteps: any,
    currentStepIndex: number,
    uiDispatch: React.Dispatch<any>
  ) => {
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
            toast.error("Username is required.");
          }
          if (response) {
            return response.then((res: any) => {
              if (!res?.isUsernameTaken) {
                toast.success(res?.message);
                uiDispatch({
                  type: UiActionsTypes.GO_TO_NEXT_STEP,
                  payload: allSteps[currentStepIndex + 1].stepName || "",
                });
              } else {
                toast.error(res?.message);
                setOnError(res);
              }
            });
          }
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
            toast.error("Password is required.");
          }
          if (response.status) {
            setOnSuccess({ ...response, action: "Signup" });
            toast.success(response?.message);
            goToNextStep(allSteps, currentStep, uiDispatch);
          } else {
            toast.error(response?.message);
            setOnError(response);
          }
          break;
        case StepNames.DONE:
          if (onSuccess?.status) {
            toast.success(onSuccess?.message);
          } else {
            toast.error(onError?.message);
          }
          uiDispatch({
            type: UiActionsTypes.CLOSE_MODAL,
          });
          break;
      }
    }
    return false;
  };
  useEffect(() => {
    if (onSuccess) {
      onSuccessHandler
        ? onSuccessHandler(onSuccess)
        : toast.error(
            "Please provide the onSuccessHandler function in VisualDAuthProvider"
          );
    }
  }, [onSuccess]);
  useEffect(() => {
    if (onError) {
      onErrorHandler
        ? onErrorHandler(onError)
        : toast.error(
            "Please provide the onErrorHandler function in VisualDAuthProvider"
          );
    }
  }, [onError]);
  // console.log("authFormState", authFormState);
  return (
    <AuthFormContext.Provider
      value={{
        authFormState,
        authFormDispatch,
        isLoading,
        contractMethodResponseHandler,
      }}
    >
      <UiProvider>{children}</UiProvider>
    </AuthFormContext.Provider>
  );
};
