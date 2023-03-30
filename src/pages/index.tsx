import GiftForm from "@/components/GiftForm/GiftForm";
import React, { useState } from "react";
import styles from "./index.module.scss";

const Home: React.FC = () => {
  const [result, setResult] = useState("");

  return (
    <div className={styles.main}>
      <h1 className={styles.header}>Gift Generator</h1>
      <GiftForm setResult={setResult} />
      <div className={styles.result}>{result}</div>
    </div>
  );
};

export default Home;
