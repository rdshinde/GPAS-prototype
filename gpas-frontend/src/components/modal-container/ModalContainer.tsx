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
      className={`${className} top-[50%] left-[50%] transform translate-y-[5%] translate-x-[18.5%] md:p-5 sm:p-3 xl:p-7 bg-white m-5 h-[65%] w-[70%] rounded-md flex flex-col justify-center items-center duration-900`}
    >
      {children}
    </div>
  );
};
