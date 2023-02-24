import {} from "framer-motion";
import React, { ReactNode, useEffect, useState } from "react";
import { useUi } from "../../context/ui/UiProvider";
import { AuthOptions } from "../auth-options/AuthOptions";
import { FooterNav } from "../footer-navigation/FooterNav";
import { IconContainer } from "../icon-container/IconContainer";
import { MnemonicInput } from "../mnemonic-input/MnemonicInput";
import { MnemonicPhraseContainer } from "../mnemonic-phrase-container/MnemonicPhraseContainer";
import { PwdBuilder } from "../pwd-builder/PwdBuilder";
import { StepperChain } from "../stepper/StepperChain";
import { UserNameField } from "../username-field/UserNameField";

type Props = {};

export const AuthHandler = (props: Props) => {
  const { uiState, uiDispatch } = useUi();
  const { isModalOpen, chosenRoute, allSteps, currentStep, previousStep } =
    uiState;
  const [currentComponent, setCurrentComponent] = useState<ReactNode>(
    <AuthOptions />
  );
  const componentRenderingHandler = (): ReactNode => {
    switch (currentStep) {
      case "Username":
        return (
          <>
            <UserNameField />
          </>
        );

      case "Password":
        return (
          <>
            <PwdBuilder />
          </>
        );

      case "Verify":
        return (
          <>
            <MnemonicInput />
          </>
        );

      case "Done!":
        return (
          <>
            <MnemonicPhraseContainer />
          </>
        );

      default:
        return <AuthOptions />;
    }
  };
  useEffect(() => {
    setCurrentComponent(componentRenderingHandler());
  }, [uiState, currentStep]);
  return (
    <>
      <IconContainer />
      <div className="w-full border border-gray-300 rounded-lg px-3 py-2 pt-5 my-5">
        {uiState.chosenRoute ? <StepperChain steps={allSteps} /> : ""}
        {currentComponent}
        <FooterNav />
      </div>
      <footer className="mt-2">
        <p className="text-center text-gray-500 text-xs">
          &copy;2023{" "}
          <span className="text-bluelight cursor-pointer">VisualDAuth</span>.
          All rights reserved.
        </p>
      </footer>
    </>
  );
};
