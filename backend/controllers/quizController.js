// controllers/quizController.js
const Quiz = require("../models/Quiz");
const QuizResult = require("../models/QuizResult");

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({}).select(
      "title description difficulty category"
    );
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }

    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.submitQuizAnswers = async (req, res) => {
  const { answers } = req.body;
  const quizId = req.params.id;
  const userId = req.user.id;

  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }

    let score = 0;
    const totalQuestions = quiz.questions.length;

    quiz.questions.forEach((question, index) => {
      const userAnswer = answers[index];
      const correctOption = question.options.find((option) => option.isCorrect);
      if (userAnswer === correctOption._id.toString()) {
        score += 1;
      }
    });

    const quizResult = new QuizResult({
      user: userId,
      quiz: quizId,
      score,
      totalQuestions,
    });

    await quizResult.save();

    res.json({
      score,
      totalQuestions,
      percentage: ((score / totalQuestions) * 100).toFixed(2) + "%",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
