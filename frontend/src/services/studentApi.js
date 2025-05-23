import axios from "axios";

const BASE_URL = "http://localhost:5000/api/student";

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.status === 200
      ? { success: true, token: response.data.token }
      : { success: false, message: response.data.message };
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, message: "An error occurred. Please try again." };
  }
};

export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 201) {
      return { success: true, message: response.data.message };
    } else {
      throw new Error(response.data.message || "Signup failed");
    }
  } catch (err) {
    console.error("Error during signup:", err);
    throw new Error(err.message || "Something went wrong");
  }
};

export const fetchCourses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/courses`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      return response.data.courses;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

export const getCoursesWithTestStatus = async () => {
  try {
    const response = await axios.get("http://localhost:5001/api/student/courses", {
      headers: { "Content-Type": "application/json" },
      params: { timestamp: new Date().getTime() },
    });
    console.log("Courses Fetched:", response.data);
    return response.status === 200 ? response.data.courses : [];
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

export const startTest = async (testData) => {
  try {
    const response = await axios.post(`${BASE_URL}/test/start-test`, testData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.status === 200
      ? { success: true, testId: response.data.testId, question: response.data.question }
      : { success: false, message: response.data.message };
  } catch (error) {
    console.error("Error starting test:", error);
    return { success: false, message: "Failed to start the test." };
  }
};

export const getRandomQuestion = async (courseName) => {
  try {
    const response = await axios.get(`${BASE_URL}/test/get-random-question/${courseName}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching random question:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch question.");
  }
};

export const updateTestDetails = async (rollNumber, details) => {
  try {
    const response = await axios.put(`${BASE_URL}/tests/${rollNumber}`, details, {
      headers: { "Content-Type": "application/json" },
    });
    return response.status === 200
      ? { success: true, message: "Test details updated successfully." }
      : { success: false, message: "Failed to update test details." };
  } catch (error) {
    console.error("Error updating test details:", error);
    return { success: false, message: "An error occurred while updating test details." };
  }
};


