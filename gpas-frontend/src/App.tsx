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
} from "./components";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <ModalContainerOverlay />
      <ModalContainer>
        <IconContainer />
        {/* <GridContainer />
        <PwdContainer /> */}
        {/* <UserNameField /> */}
        {/* <MnemonicInput /> */}
        <AuthOptions />
        <FooterNav />
      </ModalContainer>
    </div>
  );
}
export default App;
