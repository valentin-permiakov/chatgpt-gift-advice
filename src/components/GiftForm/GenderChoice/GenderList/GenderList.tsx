import React from "react";
import styles from "./gender-list.module.scss";

type GenderListProps = {
  handleClick: (e: React.MouseEvent<HTMLLIElement>) => void;
  handleHover: () => void;
};

const GenderList: React.FC<GenderListProps> = ({
  handleClick,
  handleHover,
}) => {
  return (
    <ul className={styles.genderList} onMouseLeave={handleHover}>
      <li className={styles.genderChoice} onClick={handleClick} data-type="Man">
        Man
      </li>
      <li
        className={styles.genderChoice}
        onClick={handleClick}
        data-type="Woman"
      >
        Woman
      </li>
    </ul>
  );
};
export default GenderList;
