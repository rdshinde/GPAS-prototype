import React from "react";
import {
  AuthButton,
  FooterNav,
  GridContainer,
  IconContainer,
  ImageContainer,
  MnemonicPhraseContainer,
  ModalContainer,
  ModalContainerOverlay,
  StepperChain,
  UserNameField,
  PwdContainer,
  MnemonicInput,
  AuthOptions,
  PwdBuilder,
} from "./components";

import "./styles/App.css";

const steps = [
  {
    stepName: "Username",
    stepNumber: 1,
    isActive: false,
    isCompleted: true,
  },
  {
    stepName: "Password",
    stepNumber: 2,
    isActive: true,
    isCompleted: false,
  },

  {
    stepName: "Done!",
    stepNumber: 3,
    isActive: false,
    isCompleted: false,
  },
];

function App() {
  return (
    <div className="App">
      <ModalContainerOverlay />
      <ModalContainer>
        <IconContainer />
        <StepperChain steps={steps } />
        <PwdBuilder />
        <FooterNav />
      </ModalContainer>
    </div>
  );
}
export default App;
