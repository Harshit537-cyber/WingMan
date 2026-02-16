import { submitAllQuizzes } from '../api/quizService';

export const handleDynamicSubmit = async (progress, navigate, setLoading) => {
    const requiredQuizzes = [
        'Lifestyle & Value',
        'Emotional Communication',
        'Attachment & Comfort Zone',
        'Conflict & Repair Patterns',
        'Growth, Readiness & Emotional Maturity'
    ];

    const completedNames = progress.map(q => q.quizName);
    const isAllQuizzesDone = requiredQuizzes.every(name => completedNames.includes(name));

    if (isAllQuizzesDone) {
        try {
            const result = await submitAllQuizzes(progress);
            if (result.success || result.status === 201) {
                // ✅ Sabse zaruri: Flag set karo aur temporary progress delete karo
                localStorage.setItem("all_quizzes_done", "true");
                localStorage.removeItem("quiz_progress");
                
                navigate('/view-matches', { replace: true });
            }
        } catch (error) {
            console.error("Final Submission Error:", error);
            alert("Submission failed. Progress kept locally.");
        } finally {
            setLoading(false);
        }
    } else {
        setLoading(false);
        navigate('/pick-card', { replace: true });
    }
};