import React from "react";
import { render, renderHook, screen } from "@testing-library/react";
import App from "./App";
import { initialUiState, UiActionsTypes, useUi } from "./context/ui/UiProvider";
import { act } from "react-dom/test-utils";
import { getPasswordHash } from "./services/getPasswordHash";
import { uiReducer } from "./context/ui/uiReducer";
import { getSteps } from "./utility";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// Write test cases for the uiReducer function
test("uiReducer should return the initial state", () => {
  expect(
    uiReducer(initialUiState, { type: UiActionsTypes.RESET, payload: "" })
  ).toEqual(initialUiState);
});

// Write test cases for the uiReducer function to set the chosen route
test("uiReducer should set the chosen route", () => {
  expect(
    uiReducer(initialUiState, {
      type: UiActionsTypes.SET_ROUTE,
      payload: "login",
    })
  ).toEqual({
    ...initialUiState,
    chosenRoute: "login",
  });
});

// Write test cases for the uiReducer function to set the steps
test("uiReducer should set the steps for perticular route", () => {
  expect(
    uiReducer(initialUiState, {
      type: UiActionsTypes.SET_STEPS,
      payload: "login",
    })
  ).toEqual({
    ...initialUiState,
    currentStep: getSteps("login")[0].stepName,
    previousStep: "",
    nextStep: getSteps("login")[1].stepName,
    allSteps: getSteps("login"),
  });
});

// Write test cases for the uiReducer function to open the modal
test("uiReducer should open the modal", () => {
  expect(
    uiReducer(initialUiState, {
      type: UiActionsTypes.OPEN_MODAL,
      payload: "",
    })
  ).toEqual({
    ...initialUiState,
    isModalOpen: true,
  });
});

// Write test cases for the uiReducer function to close the modal
test("uiReducer should close the modal", () => {
  expect(
    uiReducer(initialUiState, {
      type: UiActionsTypes.CLOSE_MODAL,
      payload: "",
    })
  ).toEqual({
    ...initialUiState,
    isModalOpen: false,
  });
});

// Write test cases for the getSteps function
test("getSteps should return the steps for the login route", () => {
  expect(getSteps("login")).toEqual([
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
  ]);
});

test("getSteps should return the steps for the signup route", () => {
  expect(getSteps("register")).toEqual([
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
  ]);
});

test("getSteps should return the steps for the forgot password route", () => {
  expect(getSteps("recover")).toEqual([
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
  ]);
});

// Write tests for getPasswordHash function
