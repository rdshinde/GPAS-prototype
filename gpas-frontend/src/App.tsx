import React from "react";
import {
  AuthButton,
  FooterNav,
  GridContainer,
  IconContainer,
  ImageContainer,
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
      <ImageContainer imageSrc="" imageAlt="A picture of a cat" />
      <br />
      <ModalContainer>
        {/* <AuthButton className="auth-button">Log in using GPAS</AuthButton> */}
        <IconContainer />
        <StepperChain
          steps={[
            {
              stepName: "Username",
              stepNumber: 1,
              isActive: false,
              isCompleted: true,
            },
            {
              stepName: "Password",
              stepNumber: 2,
              isActive: false,
              isCompleted: true,
            },
            {
              stepName: "Done!",
              stepNumber: 3,
              isActive: false,
              isCompleted: true,
            },
          ]}
        />
        <br />
        <UserNameField />
        <br />
        <FooterNav />
      </ModalContainer>
    </div>
  );
}
export default App;
