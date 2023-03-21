import React, { useEffect } from "react";
import { SuccessGif } from "./components";
import { useUi } from "./context/ui/UiProvider";
import "./styles/App.css";

import { AuthButton } from "react-visual-d-auth";

function App() {
  // const { AuthButton } = useUi();
  return (
    <div className="App">
      <AuthButton />
      {/* <SuccessGif /> */}
    </div>
  );
}
export default App;
