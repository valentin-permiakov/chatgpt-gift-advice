import React from "react";
import styles from "./input.module.scss";

export type InputProps = {
  type: React.HTMLInputTypeAttribute;
  labelText: string;
  name: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  type,
  name,
  placeholder,
  labelText,
}) => {
  return (
    <label className={styles.label}>
      {labelText}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </label>
  );
};
export default Input;
