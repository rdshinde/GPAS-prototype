import React from "react";
import {
  AuthButton,
  GridContainer,
  IconContainer,
  ImageContainer,
  ModalContainer,
  ModalContainerOverlay,
  StepperChain,
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
      </ModalContainer>
    </div>
  );
}
export default App;
