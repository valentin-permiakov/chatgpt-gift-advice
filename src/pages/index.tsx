/* eslint-disable @next/next/no-img-element */
import Input from "@/components/Input/Input";
import React, { SyntheticEvent, useState } from "react";
import styles from "./index.module.css";

const Home: React.FC = () => {
  const [holiday, setHoliday] = useState("");
  const [priceMin, setPriceMin] = useState(25);
  const [priceMax, setPriceMax] = useState(100);
  const [gender, setGender] = useState("man");
  const [age, setAge] = useState(30);
  const [hobbies, setHobbies] = useState("");
  const [result, setResult] = useState("");

  async function onSubmit(event: SyntheticEvent) {
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

      setResult(data.result);
      setHoliday("");
    } catch (error: any) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className={styles.main}>
      <h2>Gift Generator</h2>
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          name="holiday"
          placeholder="e.g. Birthday"
          value={holiday}
          onChange={(e) => setHoliday(e.target.value)}
          labelText="What's the occasion?"
        />
        <Input
          type="text"
          name="gender"
          placeholder=""
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          labelText="Who is it for?"
        />
        <Input
          type="number"
          name="age"
          placeholder=""
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          labelText="How old is this person?"
        />
        <h3>How much would you like to spend?</h3>
        <Input
          type="number"
          name="priceMin"
          placeholder=""
          value={priceMin}
          onChange={(e) => setPriceMin(Number(e.target.value))}
          labelText="From $"
        />
        <Input
          type="number"
          name="priceMax"
          placeholder=""
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          labelText="To $"
        />
        <Input
          type="text"
          name="hobbies"
          placeholder="e.g. video games"
          value={hobbies}
          onChange={(e) => setHobbies(e.target.value)}
          labelText="List some of their hobbies"
        />
        <input type="submit" value="Generate names" />
      </form>
      <div className={styles.result}>{result}</div>
    </div>
  );
};

export default Home;
