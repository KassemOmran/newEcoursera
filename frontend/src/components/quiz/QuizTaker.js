import React, { useState } from "react";
import QuestionItem from "./QuestionItem";
import "./quiztaker.css";

export default function QuizTaker({ quiz }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  function answer(option) {
    if (option === quiz[index].correct) {
      setScore(score + 1);
    }

    if (index < quiz.length - 1) {
      setIndex(index + 1);
    } else {
      alert(`Quiz Finished! Score: ${score + 1}/${quiz.length}`);
    }
  }

  return (
    <div className="quiz-container">
      <QuestionItem question={quiz[index]} onAnswer={answer} />
    </div>
  );
}
