import axios from "axios";

const API_URL = "http://localhost:6001/api/questions";

// ✅ Add a new question
export const addQuestion = async (courseName, question) => {
  return await axios.post(`${API_URL}/add`, { courseName, question });
};

// ✅ Fetch questions for a course
export const getQuestions = async (courseName) => {
  return await axios.get(`${API_URL}/${courseName}`);
};
