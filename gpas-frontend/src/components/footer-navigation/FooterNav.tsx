import React from "react";

type Props = {};

export const FooterNav = (props: Props) => {
  return (
    <nav className="flex justify-between items-center w-full">
      <button
        className="bg-gray-50 border border-gray-300text-lg font-bold text-blue bg-inherit hover:border-bluelight focus:shadow-md focus:shadow-bluelight rounded-lg px-5 py-2.5 mr-2 mb-2 transition-all focus:outline-none focus:ring-bluelight flex items-center"
        tabIndex={1}
      >
        <span className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
            />
          </svg>
        </span>
        Previous
      </button>
      <button
        className="text-white text-lg font-bold bg-blue hover:bg-bluelighter focus:shadow-md focus:shadow-bluelight rounded-lg px-5 py-2.5 mr-2 mb-2 transition-all focus:outline-none focus:ring-bluelight flex items-center"
        tabIndex={1}
      >
        Next
        <span className="ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
            />
          </svg>
        </span>
      </button>
    </nav>
  );
};