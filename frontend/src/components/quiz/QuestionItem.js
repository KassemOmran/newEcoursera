import React from "react";
import './questionitem.css';


export default function QuestionItem({
  question,
  selectedOptionId,
  onSelect,
}) {
  if (!question) return null;

  return (
    <div className="question-card">
      <h4>{question.question_text}</h4>

      <div className="options">
        {question.options.map((option) => (
          <button
            key={option.id}
            className={
              selectedOptionId === option.id
                ? "option-btn selected"
                : "option-btn"
            }
            onClick={() => onSelect(question.id, option.id)}
          >
            {option.option_text}
          </button>
        ))}
      </div>
    </div>
  );
}
