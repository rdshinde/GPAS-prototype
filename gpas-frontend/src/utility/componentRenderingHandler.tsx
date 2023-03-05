import { ReactNode } from "react";
import {
  AuthOptions,
  MnemonicInput,
  MnemonicPhraseContainer,
  PwdBuilder,
  UserNameField,
} from "../components";
import { StepNames } from "./getSteps";

export const componentRenderingHandler = (
  currentStep: StepNames | any
): ReactNode => {
  switch (currentStep) {
    case StepNames.USERNAME:
      return (
        <>
          <UserNameField />
        </>
      );

    case StepNames.PASSWORD:
      return (
        <>
          <PwdBuilder />
        </>
      );

    case StepNames.VERIFY:
      return (
        <>
          <MnemonicInput />
        </>
      );

    case StepNames.DONE:
      return (
        <>
          <MnemonicPhraseContainer />
        </>
      );

    default:
      return <AuthOptions />;
  }
};
