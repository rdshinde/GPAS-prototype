import React from "react";

type Props = {
  snapshot: any;
};

export const ImgCollector = (props: Props) => {
  const {snapshot} = props;
  return (
    <div
      className="w-[100px] h-[100px] border-dotted border-gray-300 border-[2px] rounded-lg flex items-center justify-center hover:border-gray-400 hover:scale-105 transition-all duration-200 ease-in-out hover:cursor-move relative"
      style={{
        top: `${snapshot.isDragging ? "-50%" : "auto"}`,
        left: `${snapshot.isDragging ? "-250%" : "auto"}`,
      }}
    >
      <span className="text-gray-300 hover:text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>
    </div>
  );
};
