// models/Quiz.js

const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: [
        {
          text: String,
          isCorrect: Boolean,
        },
      ],
    },
  ],
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
  },
  category: String,
});

module.exports = mongoose.model("Quiz", QuizSchema);
