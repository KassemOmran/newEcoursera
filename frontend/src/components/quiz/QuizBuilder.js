import React, { useState } from "react";
import QuizCreator from "./QuizCreator";
import { useParams } from "react-router-dom";

import {createQuiz} from "../../api/quiz";


export default function QuizBuilder() {
    const { courseId } = useParams();
  const [questions, setQuestions] = useState([]);

  function addQuestion(q) {
    setQuestions([...questions, q]);
  }
  

  async function saveQuiz() {
    try {
        console.log(courseId);
        console.log({questions});
        await createQuiz(courseId,{questions});
      alert("Quiz saved successfully!");
      setQuestions([]);
    } catch (err) {
      console.error(err);
      alert("Error saving quiz");
    }
  }

  return (
    <div>
      <h2>Create Quiz</h2>
      <QuizCreator onCreate={addQuestion} />

      <ul>
        {questions.map((q, i) => (
          <li key={i}>
            {q.text} (Correct: Option {q.correct + 1})
          </li>
        ))}
      </ul>

      <button onClick={saveQuiz}>Save Quiz</button>
    </div>
  );
}