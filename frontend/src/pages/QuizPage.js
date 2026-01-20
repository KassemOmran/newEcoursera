import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosclient";
import "./QuizPage.css";

export default function QuizPage() {
  const { quizId } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const data = await axiosClient.get(`/quizzes/${quizId}`);
        setQuiz(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz();
  }, [quizId]);

  function selectOption(questionId, optionId) {
    setAnswers({ ...answers, [questionId]: optionId });
  }

  async function submitQuiz() {
    try {
      const result = await axiosClient.post(
        `/quizzes/${quizId}/submit`,
        { answers }
      );
      setScore(result.score);
    } catch (err) {
      console.error(err);
      alert("Failed to submit quiz");
    }
  }

  if (loading) return <div className="quiz-container">Loading...</div>;
  if (error) return <div className="quiz-container">{error}</div>;

  const question = quiz.questions[current];

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">{quiz.title}</h1>

      {score !== null ? (
        <div className="quiz-result card">
          <h2>Your Score</h2>
          <p>{score}%</p>
        </div>
      ) : (
        <div className="quiz-card">
          <p className="quiz-question">
            Q{current + 1}. {question.question}
          </p>

          <div className="quiz-options">
            {question.options.map((opt) => (
              <div
                key={opt.id}
                className={
                  answers[question.id] === opt.id
                    ? "quiz-option selected"
                    : "quiz-option"
                }
                onClick={() => selectOption(question.id, opt.id)}
              >
                {opt.text}
              </div>
            ))}
          </div>

          <button
            className="quiz-next-btn"
            onClick={() =>
              current < quiz.questions.length - 1
                ? setCurrent(current + 1)
                : submitQuiz()
            }
          >
            {current < quiz.questions.length - 1 ? "Next" : "Submit"}
          </button>
        </div>
      )}
    </div>
  );
}
