import { createContext, useContext, useReducer, useEffect } from "react";
import { UiProvider } from "../ui/UiProvider";

type Image = {
  id?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type AuthFormState = {
  username: string;
  pwdImages: Image[];
  gridImages: Image[];
  pwdHash: string;
  mnemonicPhrase: string;
  mnemonicPhraseHash: string;
  developerDetails?: {
    mode?: string;
    privateKey?: string;
    publicKey?: string;
    useWindowWallet?: boolean;
  };
};

const initialAuthFormState = {
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
    useWindowWallet: false,
  },
};

const AuthFormContext = createContext<{
  authFormState: AuthFormState;
  authFormDispatch: React.Dispatch<any>;
}>({
  authFormState: initialAuthFormState,
  authFormDispatch: () => null,
});

type UseAuthProvider = {
  authFormState: AuthFormState;
  authFormDispatch: React.Dispatch<any>;
};

export enum AuthFormActionsTypes {
  SET_USERNAME = "SET_USERNAME",
  SET_PWD_IMAGES = "SET_PWD_IMAGES",
  SET_GRID_IMAGES = "SET_GRID_IMAGES",
  SET_PWD_HASH = "SET_PWD_HASH",
  SET_MNEMONIC_PHRASE = "SET_MNEMONIC_PHRASE",
  SET_MNEMONIC_PHRASE_HASH = "SET_MNEMONIC_PHRASE_HASH",
  SET_DEVELOPER_DETAILS = "SET_DEVELOPER_DETAILS",
  RESET = "RESET",
}

type AuthFormActions = {
  type: AuthFormActionsTypes;
  payload?: any;
};

const authFormReducer = (state: AuthFormState, action: AuthFormActions) => {
  switch (action.type) {
    case AuthFormActionsTypes.SET_USERNAME:
      return { ...state, username: action.payload };
    case AuthFormActionsTypes.SET_PWD_IMAGES:
      return { ...state, pwdImages: action.payload };
    case AuthFormActionsTypes.SET_GRID_IMAGES:
      return { ...state, gridImages: action.payload };
    case AuthFormActionsTypes.SET_PWD_HASH:
      return { ...state, pwdHash: action.payload };
    case AuthFormActionsTypes.SET_MNEMONIC_PHRASE:
      return { ...state, mnemonicPhrase: action.payload };
    case AuthFormActionsTypes.SET_MNEMONIC_PHRASE_HASH:
      return { ...state, mnemonicPhraseHash: action.payload };
    case AuthFormActionsTypes.SET_DEVELOPER_DETAILS:
      return { ...state, developerDetails: action.payload };
    case AuthFormActionsTypes.RESET:
      return initialAuthFormState;
    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
  privateKey?: string;
  publicKey?: string;
  mode?: string;
  useWindowWallet?: boolean;
};

const useAuthProvider = (): UseAuthProvider => useContext(AuthFormContext);

const VisualDAuthProvider = ({
  privateKey,
  publicKey,
  mode,
  useWindowWallet,
  children,
}: Props) => {
  const [authFormState, authFormDispatch] = useReducer(
    authFormReducer,
    initialAuthFormState
  );
  console.log(privateKey, publicKey, mode, useWindowWallet);
  return (
    <AuthFormContext.Provider value={{ authFormState, authFormDispatch }}>
      <UiProvider>{children}</UiProvider>
    </AuthFormContext.Provider>
  );
};

export { useAuthProvider, VisualDAuthProvider };
