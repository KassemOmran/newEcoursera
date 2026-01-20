import React, { useState } from "react";
import "./quizcreator.css";

export default function QuizCreator({ onCreate }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(0);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Validation
    if (!question.trim()) {
      setError("Question is required");
      return;
    }

    if (options.some((o) => !o.trim())) {
      setError("All options are required");
      return;
    }

    onCreate({
      text: question,
      options,
      correct: Number(correctOption),
    });

    // Reset form
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectOption(0);
  }

  return (
    <div className="quiz-creator">
      <h3>Add Question</h3>

      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
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
            required
          />
        ))}

        <select
          value={correctOption}
          onChange={(e) => setCorrectOption(e.target.value)}
        >
          {options.map((_, i) => (
            <option key={i} value={i}>
              Correct: Option {i + 1}
            </option>
          ))}
        </select>

        <button type="submit">Add Question</button>
      </form>
    </div>
  );
}
