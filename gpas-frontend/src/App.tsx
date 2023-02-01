import React from "react";
import {
  AuthButton,
  GridContainer,
  ImageContainer,
  ModalContainer,
} from "./components";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <ImageContainer imageSrc="" imageAlt="A picture of a cat" />
      <br />
      <ModalContainer
        styles={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "5px",
          border: "1px solid black",
          width: "300px",
          height: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AuthButton
          styles={{
            backgroundColor: "red",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
          className="auth-button"
        >
          Log in
        </AuthButton>
      </ModalContainer>
      data= {}
      <GridContainer>data.map</GridContainer>
    </div>
  );
}

export default App;
