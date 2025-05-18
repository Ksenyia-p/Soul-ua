import React from "react";
import styles from "./CheckBoxIcon.module.css";
import CheckIcon from "../../icons/arrowcheck.svg";
import boxIcon from "../../icons/CheckBox.svg";

const CheckBoxIcon = ({ label, checked, onChange, value }) => {
  return (
    <label className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles.hiddenCheckbox}
      />
      <span className={styles.customCheckbox}>
        <img src={boxIcon} alt="box" className={styles.boxIcon} />
        {checked && (
          <img src={CheckIcon} alt="✓" className={styles.checkIcon} />
        )}
      </span>
      <span className="h3-light">{label}</span>
    </label>
  );
};

export default CheckBoxIcon;
