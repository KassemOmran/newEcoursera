import React, { useState } from "react";
import "./quizcreator.css";

export default function QuizCreator({ onCreate }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState(0);
  function saveQuestion() {
    onCreate({
      text: question,
      options,
      correct,
    });
    setQuestion("");
    setOptions(["", "", "", ""]);
  }
  return (
    <div className="quiz-creator">
      <h3>Add Question</h3>
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {options.map((opt, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Option ${i + 1}`}
          value={opt}
          onChange={(e) => {
            const copy = [...options];
            copy[i] = e.target.value;
            setOptions(copy);
          }}
        />
      ))}
      <select value={correct} onChange={(e) => setCorrect(e.target.value)}>
        {options.map((_, i) => (
          <option key={i} value={i}>
            Correct: Option {i + 1}
          </option>
        ))}
      </select>
      <button onClick={saveQuestion}>Add</button>
    </div>
  );
}
