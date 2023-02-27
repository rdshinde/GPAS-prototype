import React, { useEffect } from "react";
import { useUi } from "./context/ui/UiProvider";

import "./styles/App.css";

const steps = [
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

function App() {


  const { AuthButton } = useUi();





  
  return (
    <div className="App">
      <AuthButton />
    </div>
  );
}
export default App;
