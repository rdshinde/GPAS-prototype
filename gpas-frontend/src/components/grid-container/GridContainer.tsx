import React from "react";
import { ImageContainer } from "../image-container/ImageContainer";

type Props = {
  children: React.ReactNode;
  styles?: React.CSSProperties;
  data?: {};
  className?: string;
};

export const GridContainer = (props: Props) => {
  const { children, styles, data, className } = props;
  return (
    <div className={`${className}`} style={{ ...styles }}>
      {children}
    </div>
  );
};
