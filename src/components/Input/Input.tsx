import React from "react";

type InputProps = {
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
    <label>
      {labelText}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
export default Input;
