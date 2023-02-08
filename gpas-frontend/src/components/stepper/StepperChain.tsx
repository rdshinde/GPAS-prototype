import { SmallSpinner } from "../small-spinner/SmallSpinner";
import { StepperTrueTick } from "../stepper-true-tick/StepperTrueTick";
import "./stepper-chain.css";
type step = {
  stepName: string;
  stepNumber: number;
  isActive: boolean;
  isCompleted: boolean;
};

type Props = {
  steps: step[];
};

export const StepperChain = ({ steps }: Props) => {
  return (
    <ol
      className={`flex items-center px-1 w-full justify-between text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base`}
    >
      {steps.map((step, index) => {
        return (
          <li
            className={`flex items-center after:inline-block after:content-[""] after:w-full after:h-[0.5px] after:border-b after:border-gray-400 after:mx-2 after:my-2`}
            key={step.stepNumber}
          >
            <span
              className={`flex items-center ${
                index < 2 &&
                "after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 "
              }`}
            >
              {step.isCompleted ? (
                <span className="text-blue">
                  <StepperTrueTick />
                </span>
              ) : (
                <span
                  className={`mr-2 ${step.isActive && "text-blue font-bold"}`}
                >
                  {step.isActive ? (
                    <span className="text-blue">
                      <SmallSpinner />
                    </span>
                  ) : (
                    step.stepNumber
                  )}
                </span>
              )}
              {step.isActive ? (
                <span className="text-blue font-bold">{step.stepName}</span>
              ) : step.isCompleted ? (
                <span className="text-blue">{step.stepName}</span>
              ) : (
                step.stepName
              )}
            </span>
          </li>
        );
      })}
    </ol>
  );
};
