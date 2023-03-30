import Input, { InputProps } from "@/components/Input/Input";
import React from "react";
import GenderChoice from "../GenderChoice/GenderChoice";
import styles from "./field-form.module.scss";

type FieldFormProps = {
  legendText: string;
  inputData: InputProps[];
  isAboutPerson?: boolean;
  gender?: string;
  setGender?: React.Dispatch<React.SetStateAction<string>>;
};

const FieldForm: React.FC<FieldFormProps> = ({
  legendText,
  inputData,
  isAboutPerson,
  gender,
  setGender,
}) => {
  return (
    <fieldset className={styles.formField}>
      <legend>{legendText}</legend>
      {isAboutPerson && (
        <GenderChoice gender={gender!} setGender={setGender!} />
      )}
      {inputData.map((input, index) => (
        <Input
          type={input.type}
          name={input.name}
          placeholder={input.placeholder}
          value={input.value}
          onChange={input.onChange}
          labelText={input.labelText}
          key={`${input.name}${index}`}
        />
      ))}
    </fieldset>
  );
};
export default FieldForm;
