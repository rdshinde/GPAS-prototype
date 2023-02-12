import React from "react";

type Props = {};

export const AuthOptions = (props: Props) => {
  return (
    <section className="flex justify-around gap-10 items-center m-5 mt-10 mb-10">
      <button
        className={`border border-gray-300 flex items-center justify-center flex-col text-blue p-3 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 hover:border-bluelight transition duration-300 ease-in-out gap-3`}
        type="button"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-12 h-12"
          >
            <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
          </svg>
        </span>
        <span className="font-bold text-lg">Register as a new user.</span>
      </button>
      <button
        className={`border border-gray-300 flex items-center justify-center flex-col text-blue p-3 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 hover:border-bluelight transition duration-300 ease-in-out gap-3`}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-12 h-12"
          >
            <path
              fill-rule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <span className="font-bold text-lg">Login as an existing user.</span>
      </button>
    </section>
  );
};
