import React from "react";
import styles from  "./input.module.css";
const Input = ({ inputType, title, placeholder, handleClick }) => {
  return (
    <div className={styles.input}>
      <p>{title}</p>
      {inputType === "text" ? (
        <div className={styles.input_box}>
          <input
            type="text"
            className={styles.input_box_form}
            placeholder={placeholder}
            onChange={handleClick}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Input;
