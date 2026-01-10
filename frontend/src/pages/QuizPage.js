import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./QuizPage.css";

export default function QuizPage() {
  const { quizId } = useParams();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(null);

  const questions = [
    {
      id: 1,
      question: "What is React?",
      options: [
        "A CSS framework",
        "A JavaScript library for building UIs",
        "A database",
        "A web server",
      ],
      answer: 1,
    },
    {
      id: 2,
      question: "What hook is used for state?",
      options: ["useProps", "useState", "useEffect", "useClass"],
      answer: 1,
    },
  ];

  const currentQ = questions[current];

  function nextQuestion() {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      // Calculate score
      let s = 0;
      // super simple: just fake scoring
      // real: track answers in array
      s = 1; // just to show result
      setScore(`${s} / ${questions.length}`);
    }
  }

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz #{quizId}</h1>

      {score ? (
        <div className="quiz-result card">
          <h2>Your Score</h2>
          <p>{score}</p>
        </div>
      ) : (
        <div className="quiz-card">
          <p className="quiz-question">
            Q{current + 1}. {currentQ.question}
          </p>

          <div className="quiz-options">
            {currentQ.options.map((opt, index) => (
              <div
                key={index}
                className={
                  selected === index
                    ? "quiz-option selected"
                    : "quiz-option"
                }
                onClick={() => setSelected(index)}
              >
                {opt}
              </div>
            ))}
          </div>

          <button className="quiz-next-btn" onClick={nextQuestion}>
            {current === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
