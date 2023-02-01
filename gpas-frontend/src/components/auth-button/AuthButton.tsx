import React from "react";

type Props = {
  children: React.ReactNode;
  styles?: React.CSSProperties;
  className?: string;
};

const authButtonStyles = {
  default:
    "m-3 mx-auto bg-white border border-blue hover:border-none text-blue hover:text-white hover:bg-blue transition-all w-[350px] rounded-md shadow-sm shadow-blue flex flex-row justify-center items-center font-bold cursor-pointer duration-900 h-[50px]",
};

export const AuthButton = (props: Props) => {
  const { styles, className } = props;
  return (
    <div
      style={{ ...styles }}
      className={`${className} ${authButtonStyles.default}`}
    >
      {props.children}
    </div>
  );
};

