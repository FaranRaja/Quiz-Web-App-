// frontend/components/header/header.tsx
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  showLogout?: boolean;
}

export function Header({ showLogout = true }: HeaderProps) {
  return (
    <header
      style={{ backgroundColor: "#007bff", color: "white", padding: "1rem 0" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1140px",
          margin: "0 auto",
        }}
      >
        <Link
          href="/home/homePage"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "white",
          }}
        >
          <Image
            src="/Logo.png"
            alt="Quizizz Logo"
            width={40}
            height={40}
            style={{ borderRadius: "0.5rem" }}
          />
          <span
            style={{
              marginLeft: "0.5rem",
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Quizizz
          </span>
        </Link>
        <Link href="/home/homePage" style={{ color: "white" }}>
          Home
        </Link>
        <Link href="/profile/profilePage" style={{ color: "white" }}>
          Profile
        </Link>
        {showLogout && (
          <Link href="/auth/login" style={{ color: "white" }}>
            Logout
          </Link>
        )}
      </div>
    </header>
  );
}
