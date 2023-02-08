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
} from "./components";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <ModalContainerOverlay styles={{ backgroundColor: "red" }} />
      <ModalContainer>
        <FooterNav />
      </ModalContainer>
    </div>
  );
}
export default App;
