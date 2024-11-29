// frontend/pages/quizzes/[id].js
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Header } from "@components/header/header";
import { Footer } from "@components/footer/footer";

export default function QuizDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [quiz, setQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]); // Changed to array
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchQuiz = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/quizzes/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setQuiz(response.data);
          // Initialize selectedOptions array with empty values
          setSelectedOptions(
            new Array(response.data.questions.length).fill(null)
          );
        } catch (error) {
          console.error("Error fetching quiz:", error);
        }
      };
      fetchQuiz();
    }
  }, [id]);

  const handleSelectOption = (e, questionIndex) => {
    const { value } = e.target;
    setSelectedOptions((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = value;
      return newAnswers;
    });
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Filter out any null values and send only selected answers
      const answers = selectedOptions.filter((answer) => answer !== null);

      const response = await axios.post(
        `http://localhost:5000/api/quizzes/${id}/submit`,
        { answers },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setScore(response.data.score);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quiz.questions[currentIndex];

  return (
    <div>
      <Header />
      <div
        style={{
          maxWidth: "800px",
          margin: "40px auto",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          animation: "fadeIn 0.5s ease-in",
        }}
      >
        <h1 style={{ color: "#333", marginBottom: "20px", fontSize: "2.5rem" }}>
          {quiz.title}
        </h1>
        <p style={{ color: "#666", marginBottom: "30px", fontSize: "1.1rem" }}>
          {quiz.description}
        </p>
        <div style={{ transition: "all 0.3s ease" }}>
          <h2
            style={{ color: "#444", marginBottom: "15px", fontSize: "1.8rem" }}
          >
            Question {currentIndex + 1} of {quiz.questions.length}
          </h2>
          <p
            style={{ fontSize: "1.2rem", marginBottom: "20px", color: "#333" }}
          >
            {currentQuestion.question}
          </p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {currentQuestion.options.map((option) => (
              <li
                key={option._id}
                style={{
                  marginBottom: "10px",
                  transition: "transform 0.2s ease",
                  ":hover": { transform: "translateX(10px)" },
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: "10px",
                    borderRadius: "4px",
                    backgroundColor:
                      selectedOptions[currentIndex] === option._id
                        ? "#e3f2fd"
                        : "transparent",
                  }}
                >
                  <input
                    type="radio"
                    name={`question-${currentIndex}`}
                    value={option._id}
                    checked={selectedOptions[currentIndex] === option._id}
                    onChange={(e) => handleSelectOption(e, currentIndex)}
                    style={{ marginRight: "10px" }}
                  />
                  <span style={{ fontSize: "1.1rem" }}>{option.text}</span>
                </label>
              </li>
            ))}
          </ul>
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "30px",
              justifyContent: "center",
            }}
          >
            <button
              disabled={currentIndex === 0}
              onClick={handlePrev}
              style={{
                padding: "10px 20px",
                backgroundColor: currentIndex === 0 ? "#ccc" : "#2196f3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: currentIndex === 0 ? "not-allowed" : "pointer",
                transition: "transform 0.2s ease",
                ":hover": { transform: "scale(1.05)" },
              }}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === quiz.questions.length - 1}
              style={{
                padding: "10px 20px",
                backgroundColor:
                  currentIndex === quiz.questions.length - 1
                    ? "#ccc"
                    : "#2196f3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor:
                  currentIndex === quiz.questions.length - 1
                    ? "not-allowed"
                    : "pointer",
                transition: "transform 0.2s ease",
                ":hover": { transform: "scale(1.05)" },
              }}
            >
              Next
            </button>
            {currentIndex === quiz.questions.length - 1 && (
              <button
                onClick={handleSubmit}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                  ":hover": { transform: "scale(1.05)" },
                }}
              >
                Submit
              </button>
            )}
          </div>
          {score !== null && (
            <div
              style={{
                marginTop: "20px",
                padding: "20px",
                backgroundColor: "#e3f2fd",
                borderRadius: "4px",
                textAlign: "center",
                fontSize: "1.2rem",
                animation: "slideIn 0.5s ease",
              }}
            >
              Your score: {score}/{quiz.questions.length}
            </div>
          )}
        </div>
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes slideIn {
            from {
              transform: translateY(-20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}</style>
      </div>
      <Footer />
    </div>
  );
}
