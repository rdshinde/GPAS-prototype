import { Buffer } from "buffer";
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { generateMnemonic } from "bip39";
import { toast } from "react-hot-toast";
import { Images } from "../../components/pwd-builder/PwdBuilder";
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

(window as any).Buffer = Buffer;
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
  const isOnlySixImagesInPwd = (pwdImages: Images[]) => {
    const filteredImages = pwdImages.filter((image) => {
      return Boolean(image.imageSrc);
    });
    return filteredImages.length === 6;
  };
  useEffect(() => {
    if (
      isOnlySixImagesInPwd(authFormState.pwdImages) &&
      authFormState.username
    ) {
      authFormDispatch({
        type: AuthFormActionsTypes.SET_MNEMONIC_PHRASE,
        payload: generateMnemonic(128),
      });
    }
  }, [authFormState.pwdImages]);
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
      developerDetails: { mode, privateKey, useWindowWallet, publicKey },
    } = authFormState;
    if (chosenRoute === RouteNames.REGISTER) {
      let response: any;
      switch (currentStep) {
        case StepNames.USERNAME:
          if (username) {
            response = fetchContractMethod(
              ContractMethods.IS_USERNAME_TAKEN,
              mode,
              publicKey,
              privateKey,
              useWindowWallet,
              { username },
              setLoader
            );
          } else {
            toast.error("Username is required.");
          }
          if (response) {
            response.then((res: any) => {
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
          if (
            pwdHash &&
            username &&
            isOnlySixImagesInPwd(authFormState.pwdImages) &&
            mnemonicPhrase
          ) {
            console.log(
              "Fetching contract method...",
              username,
              pwdHash,
              mnemonicPhrase
            );
            console.log({ mode, publicKey, privateKey, useWindowWallet });
            response = fetchContractMethod(
              ContractMethods.CREATE_NEW_USER,
              mode,
              publicKey,
              privateKey,
              useWindowWallet,
              { username, pwdHash, mnemonicPhrase },
              setLoader
            );
          } else {
            toast.error("Six Images password is required.");
          }
          if (response) {
            return response.then((res: any) => {
              if (res?.status) {
                toast.success(res?.message);
                setOnSuccess({ ...res, action: "User Registration." });
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
