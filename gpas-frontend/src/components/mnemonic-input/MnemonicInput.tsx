import React from "react";
import { InputField } from "../input-field/InputField";

type Props = {};
const mnemonicPhraseWords = [
  "abandon",
  "ability",
  "able",
  "about",
  "above",
  "absent",
  "absorb",
  "abstract",
  "absurd",
  "abuse",
  "access",
  "accident",
];
export const MnemonicInput = (props: Props) => {
  return (
    <section className="w-full grid grid-cols-4 gap-3 items-center justify-evenly flex-wrap border border-gray-300 p-5 rounded-lg m-2">
      {mnemonicPhraseWords.map((word, index) => {
        return (
          <InputField
            key={index}
            labelName={`Word ${index + 1}`}
            inputType={"text"}
            validationMessage={""}
            isValid={false}
          />
        );
      })}
    </section>
  );
};
