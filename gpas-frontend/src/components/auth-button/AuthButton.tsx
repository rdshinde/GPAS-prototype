import React from "react";

type Props = {
  children: React.ReactNode;
  styles: React.CSSProperties;
  className: string;
};

export const AuthButton = (props: Props) => {
  const { styles, className } = props;
  return (
    <div style={{ ...styles }} className={`${className}`}>
      {props.children}
    </div>
  );
};
