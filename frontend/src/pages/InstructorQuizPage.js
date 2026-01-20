import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosclient";
import "./InstructorDashboard.css";

export default function InstructorQuizPage() {
  const { id } = useParams(); // course id

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correct_option: 0 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateQuestion(index, field, value) {
    const copy = [...questions];
    copy[index][field] = value;
    setQuestions(copy);
  }

  function updateOption(qIndex, oIndex, value) {
    const copy = [...questions];
    copy[qIndex].options[oIndex] = value;
    setQuestions(copy);
  }

  function addQuestion() {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correct_option: 0 },
    ]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axiosClient.post(`/courses/${id}/quizzes`, {
        title,
        questions,
      });

      alert("Quiz created successfully!");
      setTitle("");
      setQuestions([
        { question: "", options: ["", "", "", ""], correct_option: 0 },
      ]);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to create quiz");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Create Quiz</h1>

      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Quiz title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {questions.map((q, qi) => (
          <div key={qi} className="dashboard-card">
            <input
              type="text"
              placeholder={`Question ${qi + 1}`}
              value={q.question}
              onChange={(e) =>
                updateQuestion(qi, "question", e.target.value)
              }
              required
            />

            {q.options.map((opt, oi) => (
              <input
                key={oi}
                type="text"
                placeholder={`Option ${oi + 1}`}
                value={opt}
                onChange={(e) =>
                  updateOption(qi, oi, e.target.value)
                }
                required
              />
            ))}

            <select
              value={q.correct_option}
              onChange={(e) =>
                updateQuestion(qi, "correct_option", Number(e.target.value))
              }
            >
              <option value={0}>Correct: Option 1</option>
              <option value={1}>Correct: Option 2</option>
              <option value={2}>Correct: Option 3</option>
              <option value={3}>Correct: Option 4</option>
            </select>
          </div>
        ))}

        <button type="button" onClick={addQuestion}>
          + Add Question
        </button>

        <br />
        <br />

        <button disabled={loading}>
          {loading ? "Saving..." : "Save Quiz"}
        </button>
      </form>
    </div>
  );
}
