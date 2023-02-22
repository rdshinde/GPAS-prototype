import React from "react";
import { LoginIcon } from "../user-icons/LoginIcon";
import { RegisterIcon } from "../user-icons/RegisterIcon";

type Props = {};

export const AuthOptions = (props: Props) => {
  return (
    <>
      <section className="w-full">
        <div className="text-start py-3 my-2">
          <h2 className="text-2xl font-extrabold text-gray-500">
            Select your Route.
          </h2>
          <span className="font-bold text-md text-bluelight">
            If you have already registered with
            <span className="text-orange font-semibold"> VisualDAuth </span>
            please choose Login, otherwise choose register.
          </span>
        </div>
      </section>
      <section className="flex justify-around md:gap-10 lg:gap-20 items-center m-5 mt-10 mb-10">
        <button
          className={`border border-gray-300 flex items-center justify-center flex-col text-blue p-3 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 hover:border-bluelight transition duration-300 ease-in-out gap-3`}
          type="button"
          title="Register as a new user."
        >
          <span>
            <RegisterIcon />
          </span>
          <span className="font-bold text-lg">Register as a new user.</span>
        </button>
        <button
          className={`border border-gray-300 flex items-center justify-center flex-col text-blue p-3 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 hover:border-bluelight transition duration-300 ease-in-out gap-3`}
          title="Login as an existing user."
          type="button"
        >
          <span>
            <LoginIcon />
          </span>
          <span className="font-bold text-lg">Login as an existing user.</span>
        </button>
      </section>
    </>
  );
};
