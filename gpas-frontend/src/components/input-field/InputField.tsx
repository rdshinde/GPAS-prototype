import React from "react";

type Props = {
  labelName: string;
  validationMessage: string;
  inputType: string;
  isValid: boolean;
};

export const InputField = ({
  labelName,
  validationMessage,
  inputType,
  isValid,
}: Props) => {
  return (
    <div className={`mb-6 w-full`}>
      <label
        htmlFor="default-input"
        className="block mb-1 text-lg font-bold text-blue text-left"
      >
        {labelName} <span className="text-red-500">*</span>
      </label>
      <input
        type={inputType}
        tabIndex={0}
        id="default-input"
        className={`bg-gray-50 font-bold text-gray-600 border bg-inherit border-gray-300 text-sm focus:outline-none focus:ring-bluelight rounded-lg block w-full p-2.5 ${
          isValid
            ? "shadow-md shadow-green-500 focus:shadow-green-500"
            : "shadow-md shadow-orange focus:shadow-orange"
        } focus:shadow-md 
          focus:shadow-bluelight
       }`}
      />
      <span
        className={`block my-1 mx-1 font-bold text-sm ${
          isValid ? "text-green-500" : "text-orange"
        } text-start`}
        aria-hidden
        tabIndex={-1}
      >
        {validationMessage}
      </span>
    </div>
  );
};
