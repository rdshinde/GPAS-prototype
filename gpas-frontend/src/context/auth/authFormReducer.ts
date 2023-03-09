import {
  AuthFormActions,
  AuthFormActionsTypes,
  AuthFormState,
} from "../typings.context";
import { initialAuthFormState } from "./VisualDAuthProvider";

export const authFormReducer = (
  state: AuthFormState,
  action: AuthFormActions
) => {
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