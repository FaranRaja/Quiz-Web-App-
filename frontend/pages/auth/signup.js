// frontend/pages/auth/signup.tsx
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Header } from "@components/header/header";
import { Footer } from "@components/footer/footer";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        formData
      );
      router.push("/auth/login");
    } catch (err) {
      if (err.response?.data?.errors) {
        const validationErrors = err.response.data.errors;
        const errorMessages = validationErrors
          .map((error) => `${error.field}: ${error.message}`)
          .join(", ");
        setError(errorMessages);
      } else {
        setError("Signup failed");
      }
    }
  };

  const containerStyle = {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    animation: "fadeIn 0.5s ease-in-out",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    transition: "border-color 0.3s ease",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    ":hover": {
      backgroundColor: "#0056b3",
    },
  };

  const errorStyle = {
    padding: "10px",
    backgroundColor: "#ffebee",
    color: "#c62828",
    borderRadius: "4px",
    marginBottom: "20px",
    animation: "shake 0.5s ease-in-out",
  };

  return (
    <>
      <Header showLogout={false} />
      <style jsx>{`
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
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-10px);
          }
          75% {
            transform: translateX(10px);
          }
        }
      `}</style>
      <div style={containerStyle}>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Signup</h1>
        {error && <div style={errorStyle}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Name
            </label>
            <input
              name="name"
              type="text"
              style={inputStyle}
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Email
            </label>
            <input
              name="email"
              type="email"
              style={inputStyle}
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Password
            </label>
            <input
              name="password"
              type="password"
              style={inputStyle}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Phone Number
            </label>
            <input
              name="phoneNumber"
              type="text"
              style={inputStyle}
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" style={buttonStyle}>
            Signup
          </button>
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Already have an account?{" "}
            <a
              href="/auth/login"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              Login here
            </a>
          </p>
        </form>
        <Footer />
      </div>
    </>
  );
}
