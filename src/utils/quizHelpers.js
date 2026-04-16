import { submitAllQuizzes } from "../api/quizService";

export const handleDynamicSubmit = async (progress, navigate, setLoading) => {

  const requiredQuizzes = [
    "Lifestyle & Value",
    "Emotional Communication",
    "Attachment & Comfort Zone",
    "Conflict & Repair Patterns",
    "Growth, Readiness & Emotional Maturity",
  ];

  const quizMap = {
    "Lifestyle & Value": [1, 2, 3, 4, 5],
    "Emotional Communication": [6, 7, 8, 9, 10],
    "Attachment & Comfort Zone": [11, 12, 13, 14],
    "Conflict & Repair Patterns": [17, 18, 19, 20],
    "Growth, Readiness & Emotional Maturity": [21, 22, 23, 24, 25],
  };

  // ✅ normalize FIRST
  const normalizeProgress = (progress) => {
    const questionToQuiz = {};

    Object.entries(quizMap).forEach(([quizName, questions]) => {
      questions.forEach((q) => {
        questionToQuiz[q] = quizName;
      });
    });

    const grouped = {};

    progress.forEach((item) => {
      if (item.quizName && Array.isArray(item.answers)) {
        grouped[item.quizName] = item.answers;
      }

      if (item.question) {
        const quizName = questionToQuiz[item.question];
        if (!quizName) return;

        if (!grouped[quizName]) grouped[quizName] = [];

        grouped[quizName].push({
          question: item.question,
          selectedOption: item.selectedOption ?? item.answer,
        });
      }
    });

    // ✅ remove duplicates
    return Object.keys(grouped).map((q) => ({
      quizName: q,
      answers: Array.from(
        new Map(grouped[q].map(a => [a.question, a])).values()
      )
    }));
  };

  const cleanProgress = normalizeProgress(progress);

  // ✅ NOW use clean data
  const completedNames = cleanProgress.map(q => q.quizName);

  const answeredSet = new Set(
    cleanProgress.flatMap(q => q.answers.map(a => a.question))
  );

  // ✅ detect completion correctly
  Object.keys(quizMap).forEach((quizName) => {
    const requiredQs = quizMap[quizName];

    const isCompleted = requiredQs.every(q => answeredSet.has(q));

    if (isCompleted && !completedNames.includes(quizName)) {
      completedNames.push(quizName);
    }
  });

  const isAllQuizzesDone = requiredQuizzes.every(name =>
    completedNames.includes(name)
  );



  try {
    if (isAllQuizzesDone) {
      console.log("🚀 Final Submit:", cleanProgress);

      await submitAllQuizzes(cleanProgress);

      localStorage.setItem("all_quizzes_done", "true");
      localStorage.removeItem("quiz_progress");

      navigate("/view-matches", { replace: true });
    } else {
      console.log("⏳ Progress saved locally only");

      localStorage.setItem("quiz_progress", JSON.stringify(progress));

      navigate("/pick-card", { replace: true });
    }
  } catch (error) {
    console.error("Submission Error:", error);
    alert("Submission failed.");
  } finally {
    setLoading(false);
  }
};