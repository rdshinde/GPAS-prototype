import { AnimatePresence } from "framer-motion";
import { createContext, useContext, useReducer } from "react";
import {
  AuthButton,
  AuthHandler,
  ModalContainer,
  ModalContainerOverlay,
} from "../../components";
import { Props } from "../../components/auth-button/AuthButton";
type UiState = {
  isModalOpen: boolean;
  chosenRoute: string;
  currentStep: string;
  previousStep: string;
  allSteps: {
    stepName: string;
    stepNumber: number;
    isActive: boolean;
    isCompleted: boolean;
  }[];
};

const initialUiState: UiState = {
  isModalOpen: false,
  chosenRoute: "",
  currentStep: "",
  previousStep: "",
  allSteps: [
    {
      stepName: "Choose Route",
      stepNumber: 1,
      isActive: true,
      isCompleted: false,
    },
    {
      stepName: "Username",
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
      stepName: "Verify",
      stepNumber: 4,
      isActive: false,
      isCompleted: false,
    },

    {
      stepName: "Done!",
      stepNumber: 5,
      isActive: false,
      isCompleted: false,
    },
  ],
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
  SET_CURRENT_STEP = "SET_CURRENT_STEP",
  SET_PREVIOUS_STEP = "SET_PREVIOUS_STEP",
}

type UiActions = {
  type: UiActionsTypes;
  payload?: any;
};

const getSteps = (payload: string): any => {
  switch (payload) {
    case "create":
      return [
        {
          stepName: "Choose Route",
          stepNumber: 1,
          isActive: true,
          isCompleted: false,
        },
        {
          stepName: "Username",
          stepNumber: 2,
          isActive: true,
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
    case "recover":
      return [
        {
          stepName: "Choose Route",
          stepNumber: 1,
          isActive: true,
          isCompleted: false,
        },
        {
          stepName: "Username",
          stepNumber: 2,
          isActive: true,
          isCompleted: false,
        },
        {
          stepName: "Verify",
          stepNumber: 3,
          isActive: false,
          isCompleted: false,
        },
        {
          stepName: "Password",
          stepNumber: 4,
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
          stepName: "Choose Route",
          stepNumber: 1,
          isActive: true,
          isCompleted: false,
        },
        {
          stepName: "Username",
          stepNumber: 2,
          isActive: true,
          isCompleted: false,
        },
        {
          stepName: "Password",
          stepNumber: 3,
          isActive: false,
          isCompleted: false,
        },
      ];

    default:
      return [
        {
          stepName: "Choose Route",
          stepNumber: 1,
          isActive: true,
          isCompleted: false,
        },
        {
          stepName: "Username",
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
  }
};

const useUi = (): UseUi => useContext(UiContext);

const uiReducer = (state: UiState, action: UiActions): UiState => {
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
      return {
        ...state,
        allSteps: [...getSteps(payload)],
      };
    case UiActionsTypes.SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: payload,
      };
    case UiActionsTypes.SET_PREVIOUS_STEP:
      return {
        ...state,
        previousStep: payload,
      };
    default:
      return state;
  }
};

const UiProvider = ({ children }: { children: React.ReactNode }) => {
  const [uiState, uiDispatch] = useReducer(uiReducer, initialUiState);
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
