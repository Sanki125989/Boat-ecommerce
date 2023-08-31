import React from "react";
import { createPortal } from "react-dom";
import styles from "./model.module.css";
const Modal = ({ open = false, children }) => {
  return (
    <>
      {open &&
        createPortal(
          <div className={styles.model}>{children}</div>,
          document.getElementById("modal-root")
        )}
    </>
  );
};

export default Modal;
