// routes/quizRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllQuizzes,
  getQuizById,
  submitQuizAnswers,
} = require("../controllers/quizController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getAllQuizzes);
router.get("/:id", authMiddleware, getQuizById);
router.post("/:id/submit", authMiddleware, submitQuizAnswers);

module.exports = router;
