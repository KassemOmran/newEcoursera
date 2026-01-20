import React, { useState } from "react";
import { useParams } from "react-router-dom";
import QuizCreator from "./QuizCreator";
import axiosClient from "../../api/axiosclient";

export default function QuizBuilder() {
  const { lessonId } = useParams();

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function addQuestion(question) {
    setQuestions((prev) => [...prev, question]);
  }

  async function saveQuiz() {
    setError("");

    if (!title || questions.length === 0) {
      setError("Quiz title and at least one question are required");
      return;
    }

    setLoading(true);

    try {
      await axiosClient.post(`/lessons/${lessonId}/quiz`, {
        title,
        questions,
      });

      alert("Quiz saved successfully!");
      setTitle("");
      setQuestions([]);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Error saving quiz");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="quiz-builder">
      <h2>Create Quiz</h2>

      {error && <p className="auth-error">{error}</p>}

      <input
        type="text"
        placeholder="Quiz title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <QuizCreator onCreate={addQuestion} />

      <ul>
        {questions.map((q) => (
          <li key={q.id || q.question}>
            {q.question} (Correct option: {q.correct_option + 1})
          </li>
        ))}
      </ul>

      <button onClick={saveQuiz} disabled={loading}>
        {loading ? "Saving..." : "Save Quiz"}
      </button>
    </div>
  );
}
