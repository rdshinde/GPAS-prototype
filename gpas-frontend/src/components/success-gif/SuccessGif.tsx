import React from "react";
import { useUi } from "../../context/ui/UiProvider";
import { RouteNames } from "../../utility/getSteps";

type Props = {};

export const SuccessGif = (props: Props) => {
  const {
    uiState: { chosenRoute },
  } = useUi();
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <img
        src="/images/successful.gif"
        className="w-[50%] h-[30%]"
        alt="Success-Gif"
      />
      <h2 className="font-bold text-2xl text-blue -mt-20">
        {chosenRoute === RouteNames.LOGIN
          ? "User login successful!"
          : "Password changed successfully!"}
      </h2>
    </div>
  );
};
