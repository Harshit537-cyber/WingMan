import axios from 'axios';

const API_URL = 'https://api.wingmann.online/api';
// const API_URL = "http://localhost:5000/api"
export const submitAllQuizzes = async (quizData) => {
   
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id

    console.log('called Quiz api', quizData)

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