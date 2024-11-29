// frontend/pages/index.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Header } from "@components/header/header";
import { Footer } from "@components/footer/footer";

export default function Home() {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/quizzes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setQuizzes(response.data);
      } catch (err) {
        setError("Failed to fetch quizzes");
      }
    };
    fetchQuizzes();
  }, []);

  const containerStyle = {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    color: "#333",
    textAlign: "center",
    marginBottom: "2rem",
    transition: "transform 0.3s ease",
  };

  const quizGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "2rem",
    padding: "1rem",
  };

  const quizCardStyle = {
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "1.5rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease",
    backgroundColor: "#fff",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "0.8rem 1.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  };

  if (error) {
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  }

  return (
    <div>
      <Header />
      <div style={containerStyle}>
        <h1 style={titleStyle}>Available Quizzes</h1>
        <div style={quizGridStyle}>
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              style={quizCardStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <h3 style={{ marginBottom: "1rem", color: "#333" }}>
                {quiz.title}
              </h3>
              <button
                style={buttonStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#0056b3";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#007bff";
                }}
                onClick={() => router.push(`/quiz/${quiz._id}`)}
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
