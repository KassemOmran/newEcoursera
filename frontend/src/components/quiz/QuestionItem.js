import React from "react";

export default function QuestionItem({ question, onAnswer }) {
  return (
    <div className="question-card">
      <h4>{question.text}</h4>
      {question.options.map((o, i) => (
        <button key={i} onClick={() => onAnswer(i)}>
          {o}
        </button>
      ))}
    </div>
  );
}
