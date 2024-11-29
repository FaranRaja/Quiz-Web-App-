// backend/seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Quiz = require("./models/Quiz"); // Ensure this path is correct
const User = require("./models/User"); // Ensure this path is correct
const QuizResult = require("./models/QuizResult"); // Ensure this path is correct
const config = require("config");
const connectDB = require("./config/db"); // Ensure this path is correct

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Sample Quizzes with at least 10 questions each
const quizzes = [
  {
    title: "Data Structures and Algorithms",
    description: "A comprehensive quiz on Data Structures and Algorithms.",
    questions: [
      {
        question: "What is the time complexity of binary search?",
        options: [
          { text: "O(n)", isCorrect: false },
          { text: "O(log n)", isCorrect: true },
          { text: "O(n log n)", isCorrect: false },
          { text: "O(1)", isCorrect: false },
        ],
      },
      {
        question:
          "Which data structure uses FIFO (First In First Out) principle?",
        options: [
          { text: "Stack", isCorrect: false },
          { text: "Queue", isCorrect: true },
          { text: "Heap", isCorrect: false },
          { text: "Tree", isCorrect: false },
        ],
      },
      {
        question: "What is the best case time complexity of QuickSort?",
        options: [
          { text: "O(n)", isCorrect: false },
          { text: "O(n log n)", isCorrect: true },
          { text: "O(n²)", isCorrect: false },
          { text: "O(log n)", isCorrect: false },
        ],
      },
      {
        question: "Which of the following is a stable sorting algorithm?",
        options: [
          { text: "QuickSort", isCorrect: false },
          { text: "MergeSort", isCorrect: true },
          { text: "HeapSort", isCorrect: false },
          { text: "Selection Sort", isCorrect: false },
        ],
      },
      {
        question: "What does BFS stand for in graph traversal?",
        options: [
          { text: "Binary File System", isCorrect: false },
          { text: "Breadth-First Search", isCorrect: true },
          { text: "Basic File Structure", isCorrect: false },
          { text: "Breadth-File Search", isCorrect: false },
        ],
      },
      {
        question: "Which data structure is used to implement recursion?",
        options: [
          { text: "Queue", isCorrect: false },
          { text: "Stack", isCorrect: true },
          { text: "Linked List", isCorrect: false },
          { text: "Heap", isCorrect: false },
        ],
      },
      {
        question: "What is the space complexity of Breadth-First Search?",
        options: [
          { text: "O(V)", isCorrect: false },
          { text: "O(E)", isCorrect: false },
          { text: "O(V + E)", isCorrect: true },
          { text: "O(1)", isCorrect: false },
        ],
      },
      {
        question:
          "Which algorithm is used to find the shortest path in a weighted graph?",
        options: [
          { text: "Depth-First Search", isCorrect: false },
          { text: "Dijkstra's Algorithm", isCorrect: true },
          { text: "Breadth-First Search", isCorrect: false },
          { text: "Bellman-Ford Algorithm", isCorrect: false },
        ],
      },
      {
        question: "What is a balanced binary tree?",
        options: [
          {
            text: "A tree where each node has at most two children",
            isCorrect: false,
          },
          {
            text: "A tree where the height difference between left and right subtree is at most one",
            isCorrect: true,
          },
          {
            text: "A tree with all leaves at the same level",
            isCorrect: false,
          },
          {
            text: "A tree where all leaves are at even levels",
            isCorrect: false,
          },
        ],
      },
      {
        question: "Which of the following is not a type of graph?",
        options: [
          { text: "Directed Graph", isCorrect: false },
          { text: "Undirected Graph", isCorrect: false },
          { text: "Cyclic Graph", isCorrect: false },
          { text: "Triangular Graph", isCorrect: true },
        ],
      },
    ],
    difficulty: "Hard",
    category: "DSA",
  },
  {
    title: "Software Design Principles",
    description:
      "Test your knowledge on fundamental software design principles.",
    questions: [
      {
        question: "What does SOLID stand for in software engineering?",
        options: [
          {
            text: "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion",
            isCorrect: true,
          },
          {
            text: "Simple, Open, Logical, Interface, Design",
            isCorrect: false,
          },
          {
            text: "Single, Open, Liskov, Interface, Dependency",
            isCorrect: false,
          },
          { text: "None of the above", isCorrect: false },
        ],
      },
      {
        question:
          "Which principle states that objects should be replaceable with instances of their subtypes without altering the correctness of the program?",
        options: [
          { text: "Encapsulation", isCorrect: false },
          { text: "Inheritance", isCorrect: false },
          { text: "Liskov Substitution", isCorrect: true },
          { text: "Polymorphism", isCorrect: false },
        ],
      },
      {
        question:
          "Which SOLID principle emphasizes that a class should have only one reason to change?",
        options: [
          { text: "Single Responsibility Principle", isCorrect: true },
          { text: "Open/Closed Principle", isCorrect: false },
          { text: "Liskov Substitution Principle", isCorrect: false },
          { text: "Dependency Inversion Principle", isCorrect: false },
        ],
      },
      {
        question:
          "Which SOLID principle suggests that software entities should be open for extension but closed for modification?",
        options: [
          { text: "Single Responsibility Principle", isCorrect: false },
          { text: "Open/Closed Principle", isCorrect: true },
          { text: "Interface Segregation Principle", isCorrect: false },
          { text: "Dependency Inversion Principle", isCorrect: false },
        ],
      },
      {
        question: "What does the Interface Segregation Principle advocate?",
        options: [
          {
            text: "Clients should not be forced to depend on interfaces they do not use",
            isCorrect: true,
          },
          {
            text: "Depend on abstractions, not on concretions",
            isCorrect: false,
          },
          {
            text: "Entities should have a single responsibility",
            isCorrect: false,
          },
          {
            text: "Objects should be replaceable with their subtypes",
            isCorrect: false,
          },
        ],
      },
      {
        question:
          "Which SOLID principle deals with reducing dependencies on concrete implementations?",
        options: [
          { text: "Single Responsibility Principle", isCorrect: false },
          { text: "Open/Closed Principle", isCorrect: false },
          { text: "Liskov Substitution Principle", isCorrect: false },
          { text: "Dependency Inversion Principle", isCorrect: true },
        ],
      },
      {
        question: "Which design pattern ensures a class has only one instance?",
        options: [
          { text: "Factory Pattern", isCorrect: false },
          { text: "Singleton Pattern", isCorrect: true },
          { text: "Observer Pattern", isCorrect: false },
          { text: "Strategy Pattern", isCorrect: false },
        ],
      },
      {
        question:
          "What principle is demonstrated by using interfaces in programming?",
        options: [
          { text: "Encapsulation", isCorrect: false },
          { text: "Abstraction", isCorrect: true },
          { text: "Inheritance", isCorrect: false },
          { text: "Polymorphism", isCorrect: false },
        ],
      },
      {
        question:
          "Which design principle promotes the idea that classes should rely on abstractions?",
        options: [
          { text: "Dependency Inversion Principle", isCorrect: true },
          { text: "Single Responsibility Principle", isCorrect: false },
          { text: "Open/Closed Principle", isCorrect: false },
          { text: "Liskov Substitution Principle", isCorrect: false },
        ],
      },
      {
        question:
          "Which SOLID principle is violated if a class has multiple responsibilities?",
        options: [
          { text: "Single Responsibility Principle", isCorrect: true },
          { text: "Open/Closed Principle", isCorrect: false },
          { text: "Interface Segregation Principle", isCorrect: false },
          { text: "Dependency Inversion Principle", isCorrect: false },
        ],
      },
    ],
    difficulty: "Medium",
    category: "Software",
  },
  // You can add more quizzes here following the same structure
];

// Seed Function
const seedDB = async () => {
  try {
    // Clear existing quizzes
    await Quiz.deleteMany({});
    const createdQuizzes = await Quiz.insertMany(quizzes);
    console.log("Quizzes Seeded!");

    // Fetch existing users
    const users = await User.find({});
    if (users.length === 0) {
      console.log(
        "No users found. Please create users before seeding QuizResults."
      );
      return;
    }

    // Clear existing QuizResults
    await QuizResult.deleteMany({});

    // Create QuizResults for each user
    const quizResults = users.map((user) => {
      // Select a random quiz for each user
      const quiz =
        createdQuizzes[Math.floor(Math.random() * createdQuizzes.length)];

      // Simulate a random score between 0 and total number of questions
      const score = Math.floor(Math.random() * (quiz.questions.length + 1));

      return {
        user: user._id,
        quiz: quiz._id,
        score: score,
        totalQuestions: quiz.questions.length,
        dateTaken: new Date(),
      };
    });

    // Insert QuizResults into the database
    await QuizResult.insertMany(quizResults);
    console.log("Quiz Results Seeded!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

// Run Seed
seedDB();
