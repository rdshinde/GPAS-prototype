import React from "react";

type Props = {};

export const UserNameField = (props: Props) => {
  return (
    <>
      <section className="w-full">
        <div className="text-start py-3 my-2">
          <h2 className="text-2xl font-extrabold text-gray-500">
            Create your Username.
          </h2>
          <span className="font-bold text-md text-bluelight">
            Please choose a username which is{" "}
            <span className="text-orange font-semibold">unique</span> to you.
          </span>
        </div>
      </section>
      <section className={`mb-6 w-full `}>
        <label
          htmlFor="default-input"
          className="block mb-2 text-lg font-bold text-blue text-left"
        >
          Username <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          tabIndex={0}
          id="default-input"
          className={`bg-gray-50 border bg-inherit border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-bluelight rounded-lg block w-full p-2.5 focus:shadow-md focus:shadow-bluelight `}
        />
        <span
          className="block my-1 mx-1 font-bold text-sm text-orange text-start"
          aria-hidden="true"
          tabIndex={-1}
        >
          Validation errors will be displayed here.
        </span>
      </section>
    </>
  );
};
