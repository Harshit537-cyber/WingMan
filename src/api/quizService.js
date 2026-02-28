import axios from 'axios';

//const API_URL = 'http://localhost:5000/api';
const API_URL = "https://api.wingmann.online/api"
export const submitAllQuizzes = async (quizData) => {
    const token = localStorage.getItem("token"); 
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id

    if (!token) {
        console.error("Token missing in LocalStorage!");
        throw new Error("Login session expired. Please login again.");
    }

    console.log("Sending Token:", token);
    console.log('jbkjgblkdfjvk......', quizData)

    const response = await axios.post(
        `${API_URL}/submit/${userId}`,
        { quizzes: quizData },
        {
            headers: {
             //   'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        }
    );
    return response.data;
};