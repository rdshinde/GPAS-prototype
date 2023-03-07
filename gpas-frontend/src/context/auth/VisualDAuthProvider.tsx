import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { fetchContractMethod, getPasswordHash } from "../../services";
import { RouteNames, StepNames } from "../../utility/getSteps";
import {
  AuthFormActionsTypes,
  AuthFormState,
  Message,
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
    }
    else{
      console.log("privateKey, publicKey, mode not found")
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

  const { uiState } = useUi();
  const contractMethodResponseHandler = () => {
    const { currentStep, nextStep, previousStep, chosenRoute } = uiState;
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

           
          break;
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

// export { useAuthProvider, VisualDAuthProvider }
