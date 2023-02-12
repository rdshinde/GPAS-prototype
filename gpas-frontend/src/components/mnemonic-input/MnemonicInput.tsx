import React from "react";
import { InputField } from "../input-field/InputField";

type Props = {};

export const MnemonicInput = (props: Props) => {
  return (
    <section className="w-full grid grid-cols-4 gap-3 items-center justify-evenly flex-wrap border border-gray-300 p-5 rounded-lg m-2">
      <InputField
        isValid={true}
        validationMessage={""}
        inputType={"text"}
        labelName={"Word"}
      />
    </section>
  );
};
