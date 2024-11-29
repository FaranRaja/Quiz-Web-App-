// frontend/pages/auth/login.tsx
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Header } from "@components/header/header";
import { Footer } from "@components/footer/footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const headerStyle = {
    backgroundColor: "#333",
    color: "white",
    padding: "1rem",
    textAlign: "center",
    marginBottom: "2rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease",
  };

  const containerStyle = {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "2rem",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    animation: "fadeIn 0.5s ease-in",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const inputStyle = {
    padding: "0.8rem",
    borderRadius: "4px",
    border: "1px solid #ddd",
    transition: "border-color 0.3s ease",
    fontSize: "1rem",
    width: "100%", // Add this line
    boxSizing: "border-box", // Add this line to include padding in width calculation
  };

  const buttonStyle = {
    padding: "1rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    fontSize: "1rem",
    marginTop: "1rem",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        { email, password }
      );
      localStorage.setItem("token", data.token);
      router.push("/home/homePage");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Header showLogout={false} />

      <div style={containerStyle}>
        <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>Login</h2>
        {error && (
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#ff000015",
              color: "#dc3545",
              borderRadius: "4px",
              marginBottom: "1rem",
            }}
          >
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} style={formStyle}>
          <div>
            <label style={{ marginBottom: "0.5rem", display: "block" }}>
              Email
            </label>
            <input
              type="email"
              style={inputStyle}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{ marginBottom: "0.5rem", display: "block" }}>
              Password
            </label>
            <input
              type="password"
              style={inputStyle}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#007bff")
            }
          >
            Login
          </button>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <a
              href="/auth/signup"
              style={{
                color: "#007bff",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              Don't have an account? Sign up here
            </a>
          </div>
        </form>
        <Footer />
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
