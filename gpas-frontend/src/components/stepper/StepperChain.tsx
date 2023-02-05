import { SmallSpinner } from "../small-spinner/SmallSpinner";
import { StepperTrueTick } from "../stepper-true-tick/StepperTrueTick";

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
      className={`flex items-center px-1 w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base`}
    >
      {steps.map((step, index) => {
        return (
          <li
            className={`flex md:${
              index < 2 ? "w-full" : "w-[100%]"
            } items-center text-blue-600 dark:text-blue-500 ${
              index < 2 &&
              `sm:after:content-[''] after:w-full after:h-[0.5px] after:border-b after:border-gray-200  after:border-[1.5px] after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:${
                step.isCompleted ? "border-blue" : "border-gray-200"
              }`
            }`}
            key={step.stepNumber}
          >
            <span
              className={`flex items-center ${
                index < 2 &&
                "after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500"
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
