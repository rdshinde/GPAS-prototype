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
  const stepChainRenderingHandler = () => {
    if (chosenRoute === "login") {
      return (
        <>
          <StepperChain steps={allSteps} />
          {componentRenderingHandler(currentStep)}
        </>
      );
    } else if (chosenRoute === "register") {
      return (
        <>
          <StepperChain steps={allSteps} />
          {componentRenderingHandler(currentStep)}
        </>
      );
    } else if (chosenRoute === "recover") {
      return (
        <>
          <StepperChain steps={allSteps} />
          {componentRenderingHandler(currentStep)}
        </>
      );
    } else {
      return (
        <>
          <StepperChain steps={allSteps} />
          <AuthOptions />
        </>
      );
    }
  };

  const componentRenderingHandler = (currentStep: string): ReactNode => {
    if (currentStep === "username") {
      return <UserNameField />;
    } else if (currentStep === "password") {
      return <PwdBuilder />;
    } else if (currentStep === "done") {
      return <MnemonicPhraseContainer />;
    } else if (currentStep === "choose route") {
      return <AuthOptions />;
    } else if (currentStep === "verify") {
      return <MnemonicInput />;
    } else {
      return <></>;
    }
  };

  return (
    <>
      <IconContainer />
      {stepChainRenderingHandler()}
      <FooterNav />
    </>
  );
};
