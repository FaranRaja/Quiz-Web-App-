// frontend/components/footer/footer.tsx
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  const links = [
    { href: "/about", label: "ABOUT" },
    { href: "/contact", label: "CONTACT US" },
    { href: "/policy", label: "POLICY" },
    { href: "/terms", label: "TERMS" },
    { href: "/product", label: "PRODUCT" },
    { href: "/blogs", label: "BLOGS" },
  ];

  const footerStyle = {
    borderTop: "1px solid #dee2e6",
    backgroundColor: "#f8f9fa",
    padding: "1rem 0",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const navStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "1rem",
  };

  const linkStyle = {
    color: "#6c757d",
    textDecoration: "none",
  };

  const socialLinkStyle = {
    color: "#6c757d",
    marginRight: "1rem",
  };

  const textStyle = {
    color: "#6c757d",
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <nav style={navStyle}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} style={linkStyle}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Link href="#" style={socialLinkStyle}>
            <Facebook size={20} />
          </Link>
          <Link href="#" style={socialLinkStyle}>
            <Twitter size={20} />
          </Link>
          <Link href="#" style={socialLinkStyle}>
            <Linkedin size={20} />
          </Link>
          <Link href="#" style={linkStyle}>
            <Youtube size={20} />
          </Link>
        </div>
        <div style={textStyle}>© Quizizz 2024</div>
      </div>
    </footer>
  );
}
