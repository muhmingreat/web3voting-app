import React from "react";
import styles from "./Button.module.css";

const Button = ({ btnname, handleClick,classStyles }) => {
  return (
    <button
      className={styles.button}
      type="button"
     btnname={btnname}
      onClick={handleClick}
    >{btnname}</button>
  );
};

export default Button;
