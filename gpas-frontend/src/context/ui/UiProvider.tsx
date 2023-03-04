import { AnimatePresence } from "framer-motion";
import { createContext, useContext, useEffect, useReducer } from "react";
import {
  AuthButton,
  AuthHandler,
  ModalContainer,
  ModalContainerOverlay,
} from "../../components";
import { Props } from "../../components/auth-button/AuthButton";
import { uiReducer } from "./uiReducer";
export type UiState = {
  isModalOpen: boolean;
  chosenRoute: "login" | "register" | "recover" | "";
  currentStep: "Username" | "Password" | "Verify" | "Done!" | "";
  previousStep: "Username" | "Password" | "Verify" | "Done!" | any;
  nextStep: "Username" | "Password" | "Verify" | "Done!" | any;
  allSteps: {
    stepName: "Username" | "Password" | "Verify" | "Done!";
    stepNumber: number;
    isActive: boolean;
    isCompleted: boolean;
  }[];
};

export const initialUiState: UiState = {
  isModalOpen: false,
  chosenRoute: "",
  currentStep: "",
  previousStep: "",
  nextStep: "",
  allSteps: [],
};

const UiContext = createContext<{
  uiState: UiState;
  uiDispatch: React.Dispatch<any>;
  AuthButton: React.FC<Props>;
}>({
  uiState: initialUiState,
  uiDispatch: () => null,
  AuthButton: AuthButton,
});

export type UseUi = {
  uiState: UiState;
  uiDispatch: React.Dispatch<any>;
  AuthButton: React.FC<Props>;
};

export enum UiActionsTypes {
  OPEN_MODAL = "OPEN_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
  SET_ROUTE = "SET_ROUTE",
  SET_STEPS = "SET_STEPS",
  GO_TO_NEXT_STEP = "GO_TO_NEXT_STEP",
  GO_TO_PREVIOUS_STEP = "GO_TO_PREVIOUS_STEP",
  RESET = "RESET",
}

export type UiActions = {
  type: UiActionsTypes;
  payload?: any;
};

const useUi = (): UseUi => useContext(UiContext);

const UiProvider = ({ children }: { children: React.ReactNode }) => {
  const [uiState, uiDispatch] = useReducer(uiReducer, initialUiState);

  useEffect(() => {
    if (uiState.chosenRoute) {
      uiDispatch({
        type: UiActionsTypes.SET_STEPS,
        payload: uiState.chosenRoute,
      });
    }
  }, [uiState.chosenRoute]);

  console.log(uiState);
  return (
    <UiContext.Provider value={{ uiState, uiDispatch, AuthButton }}>
      <AnimatePresence>
        {uiState.isModalOpen && (
          <>
            <ModalContainerOverlay />
            <ModalContainer>
              <AuthHandler />
            </ModalContainer>
          </>
        )}
      </AnimatePresence>
      {children}
    </UiContext.Provider>
  );
};

export { UiProvider, useUi };
