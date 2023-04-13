import React, { SyntheticEvent, useState } from "react";
import Input, { InputProps } from "../Input/Input";
import FieldForm from "./FieldForm/FieldForm";
import GenderChoice from "./GenderChoice/GenderChoice";
import styles from "./gift-form.module.scss";
import parseResponse from "../../utils/parseResponse";

type GiftFormProps = {
  setResult: React.Dispatch<React.SetStateAction<string>>;
};

export interface IGiftFormState {
  holiday: string;
  gender: string;
  relation: string;
  age: number;
  hobbies: string;
  priceMin: number;
  priceMax: number;
}

const defaultState: IGiftFormState = {
  holiday: "",
  gender: "Man",
  relation: "",
  age: 30,
  hobbies: "",
  priceMin: 25,
  priceMax: 100,
};

const GiftForm: React.FC<GiftFormProps> = ({ setResult }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState(defaultState);

  const personInputData: Array<InputProps> = [
    {
      type: "text",
      name: "relation",
      placeholder: "e.g. girlfriend",
      value: state.relation,
      onChange: (e) =>
        setState((prev) => ({ ...prev, relation: e.target.value })),
      labelText: "Who is it for?",
    },
    {
      type: "number",
      name: "age",
      placeholder: "",
      value: state.age,
      onChange: (e) =>
        setState((prev) => ({ ...prev, age: Number(e.target.value) })),
      labelText: "How old is this person?",
    },
    {
      type: "text",
      name: "hobbies",
      placeholder: "e.g. video games",
      value: state.hobbies,
      onChange: (e) =>
        setState((prev) => ({ ...prev, hobbies: e.target.value })),
      labelText: "List some of their hobbies",
    },
  ];
  const priceInputData: Array<InputProps> = [
    {
      type: "number",
      name: "priceMin",
      placeholder: "",
      value: state.priceMin,
      onChange: (e) =>
        setState((prev) => ({ ...prev, priceMin: Number(e.target.value) })),
      labelText: "From $",
    },
    {
      type: "number",
      name: "priceMax",
      placeholder: "",
      value: state.priceMax,
      onChange: (e) =>
        setState((prev) => ({ ...prev, priceMax: Number(e.target.value) })),
      labelText: "To $",
    },
  ];

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/generateGifts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      const result: string = data.result;

      const parsed = parseResponse(result);
      console.log(parsed);

      setResult(data.result);
      setState(defaultState);
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      <form onSubmit={onSubmit} className={styles.form}>
        <Input
          type="text"
          name="holiday"
          placeholder="e.g. Birthday"
          value={state.holiday}
          onChange={(e) =>
            setState((prev) => ({ ...prev, holiday: e.target.value }))
          }
          labelText="What's the occasion?"
        />
        <FieldForm
          legendText="Describe the person"
          inputData={personInputData}
          isAboutPerson
          gender={state.gender}
          setGender={setState}
        />
        <FieldForm
          legendText="How much would you like to spend?"
          inputData={priceInputData}
        />
        <input type="submit" value="Generate gifts" className={styles.submit} />
      </form>
      {isLoading && (
        <div>
          <h3>Looking for the best gift ideas</h3>
        </div>
      )}
    </>
  );
};
export default GiftForm;
