import React, { ReactNode } from "react";
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

  const componentRenderingHandler = (): ReactNode => {
    switch (currentStep) {
      case "Username":
        return (
          <>
            <StepperChain steps={allSteps} />
            <UserNameField />
          </>
        );

      case "Password":
        return (
          <>
            <StepperChain steps={allSteps} />
            <PwdBuilder />
          </>
        );

      case "Verify":
        return (
          <>
            <StepperChain steps={allSteps} />
            <MnemonicInput />
          </>
        );

      case "Done!":
        return (
          <>
            <StepperChain steps={allSteps} />
            <MnemonicPhraseContainer />
          </>
        );

      default:
        return <AuthOptions />;
    }
  };

  return (
    <>
      <IconContainer />
      {componentRenderingHandler()}
      <FooterNav />
    </>
  );
};
