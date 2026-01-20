import React, { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../api/axiosclient";
import QuestionItem from "./QuestionItem";
import "./quiztaker.css";

export default function QuizTaker() {
  const { lessonId } = useParams();
  const navigate= useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await axiosClient.get(`/lessons/${lessonId}/quiz`);
        setQuiz(response);

      } catch (err) {
        console.error(err);
        setError("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz();
  }, [lessonId]);

  function handleSelect(questionId, optionId) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  }

  async function submitQuiz() {
    try {
      const result = await axiosClient.post(
        `/quizzes/${quiz.id}/submit`,
        { answers }
      );
      setScore(result.score);
    } catch (err) {
      console.error(err);
      alert("Failed to submit quiz");
    }
  }
  useEffect(() => {
  if (quiz) {
    console.log("Quiz updated:", quiz);
  }
}, [quiz]);


  if (loading) return <div className="quiz-container">Loading...</div>;
  if (error) return <div className="quiz-container">{error}</div>;

  const question = quiz.questions[current];

  return (
    <div className="quiz-container">
      <h2>{quiz.title}</h2>

      {score !== null ? (
        <div className="quiz-result">
          <h3>Your Score</h3>
          <p>{score}%</p>
          <button
              className="view-btn"
              onClick={() => navigate(`/my-courses`)}
            >
              Go to My Courses
            </button>
        </div>
      ) : (
        <>
          <QuestionItem
            question={question}
            selectedOptionId={answers[question.id]}
            onSelect={handleSelect}
          />

          <button
            className="quiz-next-btn"
            onClick={() =>
              current < quiz.questions.length - 1
                ? setCurrent(current + 1)
                : submitQuiz()
            }
            disabled={answers[question.id] == null}
          >
            {current < quiz.questions.length - 1
              ? "Next"
              : "Submit"}
          </button>
        </>
      )}
    </div>
  );
}
