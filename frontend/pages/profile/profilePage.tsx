// frontend/pages/profile/profilePage.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "@components/header/header";
import { Footer } from "@components/footer/footer";
import { InfoCard } from "@components/ui/info-card/info-card";
import { cn } from "@lib/utils";

interface User {
  name?: string;
  email?: string;
  birthday?: string;
  gender?: string;
  phoneNumber?: string;
}

export default function Profile() {
  const [user, setUser] = useState<User>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => setUser(data));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setIsEditing(false);
        alert("Profile Updated");
      });
  };

  const InfoRow = ({ label, value }: { label: string; value?: string }) => (
    <div style={{ display: "flex", marginBottom: "1rem" }}>
      <div style={{ width: "33.33%", fontWeight: 600 }}>{label}</div>
      <div style={{ width: "66.67%" }}>{value || "-"}</div>
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Header />
      <main style={{ padding: "3rem 0", flexGrow: 1 }}>
        <div style={{ maxWidth: "32rem", margin: "0 auto" }}>
          <h1 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
            Profile
          </h1>
          <InfoCard title="Basic Info" onEdit={() => setIsEditing(!isEditing)}>
            {isEditing ? (
              <form>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem" }}>
                    Name
                  </label>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      padding: "0.375rem 0.75rem",
                      border: "1px solid #ced4da",
                      borderRadius: "0.25rem",
                    }}
                    id="name"
                    name="name"
                    value={user.name || ""}
                    onChange={handleChange}
                    placeholder="Name"
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem" }}>
                    Birthday
                  </label>
                  <input
                    type="date"
                    style={{
                      width: "100%",
                      padding: "0.375rem 0.75rem",
                      border: "1px solid #ced4da",
                      borderRadius: "0.25rem",
                    }}
                    id="birthday"
                    name="birthday"
                    value={user.birthday || ""}
                    onChange={handleChange}
                    placeholder="Birthday"
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem" }}>
                    Gender
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "0.375rem 0.75rem",
                      border: "1px solid #ced4da",
                      borderRadius: "0.25rem",
                    }}
                    id="gender"
                    name="gender"
                    value={user.gender || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <button
                  type="button"
                  style={{
                    width: "100%",
                    padding: "0.375rem 0.75rem",
                    backgroundColor: "#0d6efd",
                    color: "white",
                    border: "none",
                    borderRadius: "0.25rem",
                    cursor: "pointer",
                  }}
                  onClick={handleSubmit}
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <>
                <InfoRow label="Name" value={user.name} />
                <InfoRow label="Birthday" value={user.birthday} />
                <InfoRow label="Gender" value={user.gender} />
              </>
            )}
          </InfoCard>

          <InfoCard
            title="Contact Info"
            onEdit={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <form>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    style={{
                      width: "100%",
                      padding: "0.375rem 0.75rem",
                      border: "1px solid #ced4da",
                      borderRadius: "0.25rem",
                    }}
                    id="email"
                    name="email"
                    value={user.email || ""}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem" }}>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      padding: "0.375rem 0.75rem",
                      border: "1px solid #ced4da",
                      borderRadius: "0.25rem",
                    }}
                    id="phoneNumber"
                    name="phoneNumber"
                    value={user.phoneNumber || ""}
                    onChange={handleChange}
                    placeholder="Phone Number"
                  />
                </div>
                <button
                  type="button"
                  style={{
                    width: "100%",
                    padding: "0.375rem 0.75rem",
                    backgroundColor: "#0d6efd",
                    color: "white",
                    border: "none",
                    borderRadius: "0.25rem",
                    cursor: "pointer",
                  }}
                  onClick={handleSubmit}
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <>
                <InfoRow label="Email" value={user.email} />
                <InfoRow label="Phone Number" value={user.phoneNumber} />
              </>
            )}
          </InfoCard>
        </div>
      </main>
      <Footer />
    </div>
  );
}
