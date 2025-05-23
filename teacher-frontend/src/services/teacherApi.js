import axios from "axios";

const API_URL = "http://localhost:6001/api/courses"; // Teacher API for courses
const TEST_API_URL = "http://localhost:6001/api/tests"; // Teacher API for test-related routes
const QUESTION_API_URL = "http://localhost:6001/api/questions"; // Teacher API for questions

export const addCourse = async (courseData) => {
  return axios.post(`${API_URL}/add`, courseData);
};

export const getCourses = async () => {
  return axios.get(API_URL);
};

export const startTest = async (courseName) => {
  return axios.post(`${TEST_API_URL}/${courseName}/start-test`);
};

export const deleteCourse = async (courseId) => {
  return axios.delete(`${API_URL}/${courseId}`);
};

export const getStudentsStartedTest = async (courseName) => {
  return axios.get(`${TEST_API_URL}/get-students-started/${courseName}`);
};

export const addQuestion = async (courseName, question) => {
  return axios.post(`${QUESTION_API_URL}/add`, { courseName, question });
};

export const getQuestions = async (courseName) => {
  return axios.get(`${QUESTION_API_URL}/${courseName}`);
};

export const deleteQuestion = async (courseName, questionId) => {
  return axios.delete(`${QUESTION_API_URL}/${courseName}/${questionId}`);
};

export const deleteStudentRecord = async (studentId) => {
  return axios.delete(`${TEST_API_URL}/retake-test/${studentId}`);
};



