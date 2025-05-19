import React from "react";
import styles from "./Info.module.css";

const Info = () => {
  return (
    <>
      <div className={styles.info}>
        <h1>SOUL — ЦЕ УКРАЇНСЬКИЙ БРЕНД СПОРТИВНОГО ОДЯГУ</h1>
        <h2 className={styles.paragraph}>
          Основна мета, створювати якісний одяг для активних людей, що
          підкреслює індивідуальність
        </h2>
      </div>
    </>
  );
};

export default Info;
