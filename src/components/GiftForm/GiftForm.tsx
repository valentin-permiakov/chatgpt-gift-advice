import React, { SyntheticEvent, useState } from "react";
import Input, { InputProps } from "../Input/Input";
import FieldForm from "./FieldForm/FieldForm";
import GenderChoice from "./GenderChoice/GenderChoice";
import styles from "./gift-form.module.scss";
import parseResponse from "../../utils/parseResponse";

type GiftFormProps = {
  setResult: React.Dispatch<React.SetStateAction<string>>;
};

const GiftForm: React.FC<GiftFormProps> = ({ setResult }) => {
  const [holiday, setHoliday] = useState("");
  const [gender, setGender] = useState("Man");
  const [relation, setRelation] = useState("");
  const [age, setAge] = useState(30);
  const [hobbies, setHobbies] = useState("");
  const [priceMin, setPriceMin] = useState(25);
  const [priceMax, setPriceMax] = useState(100);

  const personInputData: Array<InputProps> = [
    {
      type: "text",
      name: "relation",
      placeholder: "e.g. girlfriend",
      value: relation,
      onChange: (e) => setRelation(e.target.value),
      labelText: "Who is it for?",
    },
    {
      type: "number",
      name: "age",
      placeholder: "",
      value: age,
      onChange: (e) => setAge(Number(e.target.value)),
      labelText: "How old is this person?",
    },
    {
      type: "text",
      name: "hobbies",
      placeholder: "e.g. video games",
      value: hobbies,
      onChange: (e) => setHobbies(e.target.value),
      labelText: "List some of their hobbies",
    },
  ];
  const priceInputData: Array<InputProps> = [
    {
      type: "number",
      name: "priceMin",
      placeholder: "",
      value: priceMin,
      onChange: (e) => setPriceMin(Number(e.target.value)),
      labelText: "From $",
    },
    {
      type: "number",
      name: "priceMax",
      placeholder: "",
      value: priceMax,
      onChange: (e) => setPriceMax(Number(e.target.value)),
      labelText: "To $",
    },
  ];

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/generateGifts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          holiday,
          priceMin,
          priceMax,
          gender,
          relation,
          age,
          hobbies,
        }),
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
      setHoliday("");
      setPriceMin(25);
      setPriceMax(100);
      setAge(30);
      setHobbies("");
      setRelation("");
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <Input
        type="text"
        name="holiday"
        placeholder="e.g. Birthday"
        value={holiday}
        onChange={(e) => setHoliday(e.target.value)}
        labelText="What's the occasion?"
      />
      <FieldForm
        legendText="Describe the person"
        inputData={personInputData}
        isAboutPerson
        gender={gender}
        setGender={setGender}
      />
      <FieldForm
        legendText="How much would you like to spend?"
        inputData={priceInputData}
      />
      <input type="submit" value="Generate gifts" className={styles.submit} />
    </form>
  );
};
export default GiftForm;
