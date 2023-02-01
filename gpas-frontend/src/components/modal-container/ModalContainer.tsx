import React from "react";

type Props = {
  children: React.ReactNode;
  styles?: React.CSSProperties;
  className?: string;
};

export const ModalContainer = (props: Props) => {
  const { children, styles, className } = props;
  return (
    <div
      style={{ ...styles }}
      className={`${className} top-[50%] left-[50%] transform translate-y-[50%] translate-x-[30%] md:p-5 sm:p-3 xl:p-7 bg-gray-200 m-5 h-[60%] w-[60%] rounded-md shadow-lg shadow-white flex flex-col justify-center items-center  duration-900`}
    >
      {children}
    </div>
  );
};
