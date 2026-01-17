import axiosClient from "./axiosclient";

export async function createQuiz(courseId, quizData) {
  return await axiosClient.post(`/courses/${courseId}/quizzes`, quizData);
}

export async function getQuiz(quizId) {
  return await axiosClient.get(`/quiz/${quizId}`);
}

export async function submitQuiz(quizId, answers) {
  return await axiosClient.post(`/quiz/${quizId}/submit`, { answers });
}

export async function quizResults(quizId) {
  return await axiosClient.get(`/quiz/${quizId}/results`);
}
