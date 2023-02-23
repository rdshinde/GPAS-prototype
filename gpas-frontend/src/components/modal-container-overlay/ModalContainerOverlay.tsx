import React from "react";
import { createPortal } from "react-dom";
import { UiActionsTypes, useUi } from "../../context/ui/UiProvider";
type Props = {
  children?: React.ReactNode;
  styles?: React.CSSProperties;
  className?: string;
};

export const ModalContainerOverlay = (props: Props) => {
  const { uiDispatch } = useUi();
  const { styles, children, className } = props;
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    return null;
  }
  return createPortal(
    <div
      style={{ ...styles }}
      className={`${className} absolute -z-20 top-0 left-0 bottom-0 right-0 h-full w-full bg-gray-400 opacity-10`}
      onClick={() => uiDispatch({ type: UiActionsTypes.CLOSE_MODAL })}
    >
      {children}
    </div>,
    modalRoot
  );
};
