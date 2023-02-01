import React from "react";
import { createPortal } from "react-dom";
type Props = {
  children: React.ReactNode;
  styles: React.CSSProperties;
};

export const ModalContainer = (props: Props) => {
  const { styles, children } = props;
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    return null;
  }
  return createPortal(
    <div style={{ ...styles }} className={``}>
      {children}
    </div>,
    modalRoot
  );
};

export default ModalContainer;
