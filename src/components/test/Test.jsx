import React from "react";
import styles from "./Test.module.css";
import Button from "../button/Button";
import { Link } from "react-router-dom";

const Test = () => {
  return (
    <>
      <div className={styles.test}>
        <h1>Відкрий свою унікальну кольорову історію!</h1>
        <h2 className={styles.paragraph}>
          Дізнайся, які кольори підкреслять твою природну красу та створять
          неповторний стиль.
        </h2>
        <Link to="/color_type" className={styles.buttonReadMore}>
          <Button type="button">Знайти свій кольоротип</Button>
        </Link>
      </div>
    </>
  );
};

export default Test;
