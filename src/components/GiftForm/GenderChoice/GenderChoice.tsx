import { Dropdown } from "@/components/Dropdown/Dropdown";
import { useCoordinates } from "@/hooks/useCoordinates";
import { Icon, EIcons } from "@/icons/Icon";
import React, { useState } from "react";
import styles from "./gender-choice.module.scss";
import GenderList from "./GenderList/GenderList";

type GenderChoiceProps = {
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
};

const GenderChoice: React.FC<GenderChoiceProps> = ({ gender, setGender }) => {
  const [isOpened, setIsOpened] = useState(false);
  const { elementRef, top, left } = useCoordinates(0, 284);

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget.dataset.type) {
      setGender(e.currentTarget.dataset.type);
    }
    setIsOpened(false);
  };

  const handleHover = () => {
    setIsOpened(false);
  };
  return (
    <div className={styles.choiceBox}>
      <span className={styles.choiceName}>Choose their gender</span>
      <div
        className={`${styles.choiceBtn} ${isOpened ? styles.reversed : ""}`}
        onClick={(e) => {
          e.preventDefault();
          setIsOpened(!isOpened);
        }}
        ref={elementRef}
      >
        {gender}
        <span className={styles.iconSpan}>
          <Icon name={EIcons.dropdownIcon} />
        </span>
      </div>
      {isOpened && (
        <Dropdown top={top} left={left}>
          <GenderList handleClick={handleClick} handleHover={handleHover} />
        </Dropdown>
      )}
    </div>
  );
};
export default GenderChoice;
