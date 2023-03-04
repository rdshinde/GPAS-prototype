import { createContext, useContext, useReducer, useEffect } from "react";
import { AuthFormState, UseAuthProvider } from "../typings.context";
import { UiProvider } from "../ui/UiProvider";
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

export type Props = {
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
