import React from "react";
import { createPortal } from "react-dom";
type Props = {
  children?: React.ReactNode;
  styles?: React.CSSProperties;
  className?: string;
};

export const ModalContainerOverlay = (props: Props) => {
  const { styles, children, className } = props;
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    return null;
  }
  return createPortal(
    <div
      style={{ ...styles }}
      className={`${className} absolute -z-10 h-[100vh] w-[100vw] bg-red-100 opacity-10 p-0 m-0 `}
    >
      {children}
    </div>,
    modalRoot
  );
};
