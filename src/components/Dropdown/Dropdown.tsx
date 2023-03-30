import React from "react";
import ReactDOM from "react-dom";
import styles from "./dropdown.module.scss";

interface IDropdownProps {
  children: React.ReactNode;
  top: number;
  left: number;
}

export const Dropdown = ({ children, top, left }: IDropdownProps) => {
  const node = document.getElementById("dropdown-root");

  if (!node) return null;

  return ReactDOM.createPortal(
    <div
      className={styles.container}
      style={{
        top: top,
        left: left,
      }}
    >
      {children}
    </div>,
    node
  );
};
