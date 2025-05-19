import React, { useState } from "react";
import Header from "../../components/header/Header";
import Layout from "../../components/layout/Layout";
import styles from "./AboutUs.module.css";
import CheckBoxIcon from "../../components/CheckBoxIcon/CheckBoxIcon";
import Button from "../../components/button/Button";
import summer1 from "../../images/summer1.jpeg";
import summer2 from "../../images/summer2.JPG";
import summer3 from "../../images/summer3.JPG";
import autumn1 from "../../images/4U5A9896.jpeg";
import autumn2 from "../../images/autumn2.jpeg";
import autumn3 from "../../images/autumn3.jpeg";
import spring1 from "../../images/spring1.jpeg";
import spring2 from "../../images/spring2.jpeg";
import spring3 from "../../images/spring3.jpeg";
import winter1 from "../../images/winter1.jpeg";
import witer2 from "../../images/winter2.jpeg";
import winter3 from "../../images/winter3.jpeg";

const questions = [
  {
    question: "Який у тебе природний колір волосся?",
    options: [
      { label: "Світло-русявий, золотистий", type: "spring" },
      { label: "Світло-русявий, попелястий", type: "summer" },
      { label: "Темно-каштановий, рудуватий", type: "autumn" },
      { label: "Темно-каштановий, майже чорний", type: "winter" },
    ],
  },
  {
    question: "Який у тебе колір очей?",
    options: [
      {
        label: "Світло-зелені, світло-карі з золотистим відблиском",
        type: "spring",
      },
      { label: "Сірі, блакитні, світло-зелені", type: "summer" },
      {
        label: "Зелені, карі з золотистими чи оливковими відтінками",
        type: "autumn",
      },
      { label: "Темно-карі, чорні, дуже насичені", type: "winter" },
    ],
  },
  {
    question: "Який у тебе відтінок шкіри?",
    options: [
      {
        label: "Світлий з теплим персиковим або золотистим відтінком",
        type: "spring",
      },
      {
        label: "Світлий з холодним рожевим або сіруватим відтінком",
        type: "summer",
      },
      { label: "Теплий з оливковим або смаглявим відтінком", type: "autumn" },
      { label: "Холодний, дуже світлий або темний", type: "winter" },
    ],
  },
  {
    question: "Як виглядаєш без макіяжу: тон шкіри теплий чи холодний?",
    options: [
      { label: "Теплий, шкіра світиться теплом", type: "spring" },
      {
        label: "Холодний, шкіра має синюватий чи рожевий відтінок",
        type: "summer",
      },
      {
        label: "Теплий, шкіра має золотисті чи бронзові відблиски",
        type: "autumn",
      },
      { label: "Холодний, шкіра чітко контрастує з волоссям", type: "winter" },
    ],
  },
  {
    question: "Який метал тобі більше личить?",
    options: [
      { label: "Рожеве золото", type: "spring" },
      { label: "Срібло", type: "summer" },
      { label: "Жовте золото", type: "autumn" },
      { label: "Біле золото", type: "winter" },
    ],
  },
  {
    question: "Які кольори одягу найкраще виглядають на тобі?",
    options: [
      { label: "Теплі, яскраві та світлі", type: "spring" },
      { label: "Пастельні, м'які холодні", type: "summer" },
      { label: "Насичені, теплі земляні", type: "autumn" },
      { label: "Контрастні, холодні, яскраві", type: "winter" },
    ],
  },
  {
    question: "Як реагуєш на сонце?",
    options: [
      { label: "Швидко засмагаю, шкіра світиться", type: "spring" },
      { label: "Шкіра часто червоніє, засмага погана", type: "summer" },
      { label: "Легко засмагаю, колір шкіри стає глибшим", type: "autumn" },
      { label: "Шкіра світла або дуже темна, контрастна", type: "winter" },
    ],
  },
];

const descriptions = {
  spring: {
    title: <>Весна — твій світлий настрій</>,
    description:
      "Ти — втілення тепла, свіжості та життєрадісності. Весняний тип має світлу шкіру з золотистим відтінком, ніжне волосся та очі, що сяють. Тобі пасують теплі, легкі, радісні кольори — вони лише підсилюють твоє природне сяйво!",
    clothes:
      "Обирай персиковий, кремовий, світло-зелений, кораловий та ніжно-блакитний. Метали: рожеве золото — і ти сяєш ще яскравіше!",
    photos: [spring1, spring2, spring3],
  },
  summer: {
    title: <>Літо — ніжна гармонія прохолоди</>,
    description:
      "Твоя краса — у витонченості, легкості та м’яких тонах. Ти — представниця холодного кольоротипу з попелястим волоссям та лагідними очима. Тобі пасують пастельні, м’які кольори, які підкреслюють твою природну елегантність.",
    clothes: [
      "Обирай лавандовий, м’ятний, ніжно-рожевий та блідо-фіолетовий.",
      "Метали: срібло — підкреслює твій спокійний шик.",
    ],

    photos: [summer1, summer2, summer3],
  },
  autumn: {
    title: <>Осінь — твоя глибина і сила</>,
    description:
      "Ти — насичена, тепла і глибока. Осінній кольоротип — це кольори землі, спецій та осіннього листя. Твоя шкіра має приємний оливковий чи смаглявий відтінок, а очі — чарують теплом. Теплі глибокі кольори — твої найкращі союзники.",
    clothes:
      "Обирай теракоту, гірчицю, бордо, оливку і шоколадні відтінки. Метали: жовте золото — як осіннє сонце на тобі.",
    photos: [autumn1, autumn2, autumn3],
  },
  winter: {
    title: <>Зима — твій стильний контраст</>,
    description:
      "Ти — яскрава, смілива та контрастна. Шкіра світла або темна, але завжди ефектна, а погляд — пронизливий. Твоя краса розкривається в насичених холодних кольорах, які створюють wow-ефект.",
    clothes: [
      "Носи чорне, біле, смарагдове, червоне, електрик. ",
      "Метали: біле золото — як морозний кристал на тобі.",
    ],
    photos: [winter1, witer2, winter3],
  },
};

const AboutUs = () => {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleAnswer = (index, type) => {
    const newAnswers = [...answers];
    newAnswers[index] = type;
    setAnswers(newAnswers);
  };

  const calculateResult = () => {
    const counts = { spring: 0, summer: 0, autumn: 0, winter: 0 };
    answers.forEach((a) => {
      if (a) counts[a]++;
    });
    const maxType = Object.keys(counts).reduce((a, b) =>
      counts[a] >= counts[b] ? a : b
    );
    setResult(maxType);
  };

  return (
    <div
      className={styles.container}
      style={{ minHeight: "100vh", padding: 20 }}
    >
      <Header />
      <main className={styles.content}>
        {!started ? (
          <>
            <h1 className={styles.title}>Привіт!</h1>
            <p className={`h2-light ${styles.subtitle}`}>
              Готова дізнатися, які кольори підкреслюють твою унікальність?
              <br />
              Пройди короткий тест і відкрий свій кольоровий світ!
            </p>
            <div className={styles.Button}>
              <Button onClick={() => setStarted(true)}>Поїхали!</Button>
            </div>
          </>
        ) : !result ? (
          <>
            <h1 className={styles.title}>Визнач свій кольоротип</h1>
            {questions.map((q, i) => (
              <div key={i} className={`${styles.questionBlock} h2-light`}>
                <p className={styles.questionText}>{q.question}</p>
                <div className={styles.answers}>
                  {q.options.map((opt) => {
                    const checked = answers[i] === opt.type;
                    return (
                      <CheckBoxIcon
                        key={opt.label}
                        label={opt.label}
                        labelClassName={styles["h3-light"]}
                        checked={checked}
                        value={opt.type}
                        onChange={() => handleAnswer(i, opt.type)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
            {answers.length === questions.length && (
              <div className={styles.Button}>
                <Button onClick={calculateResult}>Показати результат</Button>
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className={styles.title}>
              Твій кольоровий настрій:
              <br />
              {descriptions[result].title}
            </h1>

            <p className={`${styles.subtitle} h3-light`}>
              {descriptions[result].description}
            </p>

            <h2 className={styles.subtitle}>
              Що носити, щоб виглядати ще яскравіше:
            </h2>

            <p className={`${styles.subtitle} h3-light`}>
              {descriptions[result].clothes}
            </p>

            <div className={styles.resultImageContainer}>
              {descriptions[result].photos.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`${descriptions[result].title} одяг ${idx + 1}`}
                  className={styles.resultImage}
                />
              ))}
            </div>
            <div className={styles.Button}>
              <Button
                onClick={() => {
                  setStarted(false);
                  setAnswers([]);
                  setResult(null);
                }}
              >
                Пройти ще раз і порівняти ;)
              </Button>
            </div>
          </>
        )}
      </main>
      <Layout />
    </div>
  );
};

export default AboutUs;
