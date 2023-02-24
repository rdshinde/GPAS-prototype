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
      {uiState.chosenRoute ? <StepperChain steps={allSteps} /> : ""}
      {currentComponent}
      <FooterNav />
    </>
  );
};
