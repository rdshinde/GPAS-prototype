import { AnimatePresence } from "framer-motion";
import { createContext, useContext, useEffect, useReducer } from "react";
import {
  AuthButton,
  AuthHandler,
  ModalContainer,
  ModalContainerOverlay,
} from "../../components";
import { Props } from "../../components/auth-button/AuthButton";
type UiState = {
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

type UseUi = {
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

type UiActions = {
  type: UiActionsTypes;
  payload?: any;
};

export const getSteps = (payload: string): any => {
  switch (payload) {
    case "register":
      return [
        {
          stepName: "Username",
          stepNumber: 1,
          isActive: true,
          isCompleted: false,
        },
        {
          stepName: "Password",
          stepNumber: 2,
          isActive: false,
          isCompleted: false,
        },
        {
          stepName: "Done!",
          stepNumber: 3,
          isActive: false,
          isCompleted: false,
        },
      ];
    case "recover":
      return [
        {
          stepName: "Username",
          stepNumber: 1,
          isActive: true,
          isCompleted: false,
        },
        {
          stepName: "Verify",
          stepNumber: 2,
          isActive: false,
          isCompleted: false,
        },
        {
          stepName: "Password",
          stepNumber: 3,
          isActive: false,
          isCompleted: false,
        },
        {
          stepName: "Done!",
          stepNumber: 4,
          isActive: false,
          isCompleted: false,
        },
      ];
    case "login":
      return [
        {
          stepName: "Username",
          stepNumber: 1,
          isActive: true,
          isCompleted: false,
        },
        {
          stepName: "Password",
          stepNumber: 2,
          isActive: false,
          isCompleted: false,
        },
        {
          stepName: "Done!",
          stepNumber: 3,
          isActive: false,
          isCompleted: false,
        },
      ];
    default:
      return [];
  }
};

const useUi = (): UseUi => useContext(UiContext);

export const uiReducer = (state: UiState, action: UiActions): UiState => {
  const { type, payload } = action;
  switch (type) {
    case UiActionsTypes.OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
      };
    case UiActionsTypes.CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };
    case UiActionsTypes.SET_ROUTE:
      return {
        ...state,
        chosenRoute: payload,
      };
    case UiActionsTypes.SET_STEPS:
      const steps = getSteps(payload);
      return {
        ...state,
        currentStep: steps[0].stepName,
        nextStep: steps[1].stepName,
        previousStep: "",
        allSteps: [...steps],
      };
    case UiActionsTypes.GO_TO_NEXT_STEP:
      let currentStepIndx = state.allSteps.findIndex(
        (step) => step.stepName === state.currentStep
      );
      return {
        ...state,
        currentStep: payload,
        previousStep: state.currentStep,
        nextStep: state.allSteps[currentStepIndx + 1]?.stepName || "",
        allSteps: state.allSteps.map((step, index) => {
          if (step.stepName === payload) {
            return {
              ...step,
              isActive: true,
              isCompleted: false,
            };
          } else if (index <= currentStepIndx) {
            return {
              ...step,
              isActive: false,
              isCompleted: true,
            };
          } else if (index > currentStepIndx) {
            return {
              ...step,
              isActive: false,
              isCompleted: false,
            };
          } else return step;
        }),
      };
    case UiActionsTypes.GO_TO_PREVIOUS_STEP:
      let currentStepIndex = state.allSteps.findIndex(
        (step) => step.stepName === state.currentStep
      );
      return {
        ...state,
        currentStep: payload,
        nextStep: state.allSteps[currentStepIndex],
        previousStep: state.allSteps[currentStepIndex - 1].stepName || "",
        allSteps: state.allSteps.map((step, index) => {
          if (step.stepName === payload) {
            return {
              ...step,
              isActive: true,
              isCompleted: false,
            };
          } else if (index >= currentStepIndex) {
            return {
              ...step,
              isActive: false,
              isCompleted: false,
            };
          } else if (index < currentStepIndex) {
            return {
              ...step,
              isActive: false,
              isCompleted: true,
            };
          } else return step;
        }),
      };
    case UiActionsTypes.RESET:
      return {
        ...state,
        chosenRoute: "",
        currentStep: "",
        nextStep: "",
        previousStep: "",
        allSteps: [],
      };
    default:
      return state;
  }
};

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
