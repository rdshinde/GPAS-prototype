import React from "react";

type Props = {};

export const IconContainer = (props: Props) => {
  return (
    <section className="md:m-2 sm:m-1 xl:m-3 md:p-2 xl:p-3 sm:p-1 flex flex-row items-center justify-center cursor-pointer">
      <h1 className="flex items-center justify-center">
        <span className="bg-indigo-500 opacity-80 sm:w-[50px] sm:h-[50px] xl:w-[75px] xl:h-[75px] p-2 rounded-full mx-3 relative -z-10  shadow-lg shadow-indigo-500">
          <img
            src="logo.png"
            className="sm:w-[50px] xl:w-[75px] absolute left-1 -top-1 z-10 opacity-100 "
            loading="lazy"
            alt="logo"
          />
        </span>{" "}
        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 md:text-2xl sm:text-xl xl:text-3xl text-gradient-to-br hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 drop-shadow-lg shadow-pink-800">
          VisualDAuth
        </span>
      </h1>
    </section>
  );
};
