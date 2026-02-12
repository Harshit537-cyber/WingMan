import { submitAllQuizzes } from '../api/quizService';

export const handleDynamicSubmit = async (progress, navigate, setLoading) => {
    // 1. Saare 5 cards ke exact naam jo database accept karta hai
    const requiredQuizzes = [
        'Lifestyle & Value',
        'Emotional Communication',
        'Attachment & Comfort Zone',
        'Conflict & Repair Patterns',
        'Growth, Readiness & Emotional Maturity'
    ];

    // 2. Check karo ki progress array mein kitne cards complete ho gaye hain
    const completedNames = progress.map(q => q.quizName);
    const isAllQuizzesDone = requiredQuizzes.every(name => completedNames.includes(name));

    if (isAllQuizzesDone) {
        try {
            const result = await submitAllQuizzes(progress);
            
            // 🔥 CONDITION: Agar status 201 ya success true hai
            if (result.success || result.status === 201) {
                localStorage.removeItem("quiz_progress"); // Temporary data delete
                localStorage.setItem("all_quizzes_done", "true"); // 🔥 Global Flag Set
                navigate('/view-matches', { replace: true });
            }
        } catch (error) {
            console.error("API Error:", error);
            alert("Submission failed. Try again.");
        } finally {
            setLoading(false);
        }
    } else {
        setLoading(false);
        navigate('/pick-card', { replace: true });
    }

};