import axios from 'axios';

const API_URL = 'https://wingmann.onrender.com/api/quiz';

export const submitAllQuizzes = async (quizData) => {
    const token = localStorage.getItem("auth_token"); 

    if (!token) {
        console.error("Token missing in LocalStorage!");
        throw new Error("Login session expired. Please login again.");
    }

    console.log("Sending Token:", token);

    const response = await axios.post(
        `${API_URL}/submit`,
        { quizzes: quizData },
        {
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        }
    );
    return response.data;
};