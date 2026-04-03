import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, Mail, Moon, SunMedium, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDark, toggleTheme, theme } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    login({
      name: name || email.split("@")[0] || "Student",
      email,
    });
    navigate("/dashboard");
  };

  const inputStyle = {
    width: "100%",
    height: 52,
    boxSizing: "border-box",
    padding: "0 16px",
    borderRadius: 14,
    border: "1px solid var(--soft-border)",
    background: isDark ? "rgba(15,23,42,0.72)" : "var(--panel-muted)",
    color: "var(--shell-text)",
    fontSize: 15,
    outline: "none",
  };

  const labelStyle = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    fontWeight: 600,
    color: "var(--secondary-text)",
    marginBottom: 8,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        background: "var(--shell-bg)",
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
        position: "relative",
      }}
    >
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        style={{
          position: "absolute",
          top: 18,
          right: 18,
          width: 42,
          height: 42,
          borderRadius: 14,
          border: "1px solid var(--panel-border)",
          background: "var(--panel-strong)",
          color: "var(--shell-text)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        {isDark ? <SunMedium size={18} /> : <Moon size={18} />}
      </button>

      <motion.form
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleRegister}
        style={{
          width: "100%",
          maxWidth: 440,
          padding: 28,
          borderRadius: 28,
          background: "var(--panel-strong)",
          boxShadow: "var(--shadow-strong)",
          border: "1px solid var(--panel-border)",
        }}
      >
        <button
          type="button"
          onClick={() => navigate("/login")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            color: "var(--accent)",
            cursor: "pointer",
            fontWeight: 600,
            marginBottom: 18,
          }}
        >
          <ArrowLeft size={18} />
          Back to Login
        </button>

        <h1 style={{ margin: 0, fontSize: "2rem", color: "var(--shell-text)" }}>Create Account</h1>
        <p style={{ color: "var(--muted-text)", lineHeight: 1.6, margin: "12px 0 24px" }}>
          Register a new user and continue directly to the dashboard.
        </p>

        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>
            <User size={16} />
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>
            <Mail size={16} />
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@iitb.ac.in"
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 22 }}>
          <label style={labelStyle}>
            <Lock size={16} />
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            required
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            height: 50,
            border: "none",
            borderRadius: 14,
            color: "#fff",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            background: "linear-gradient(135deg, #2563eb, #60a5fa)",
            boxShadow: isDark
              ? "0 12px 28px rgba(29,78,216,0.28)"
              : "0 8px 30px rgba(59,130,246,0.25)",
          }}
        >
          Create Account
        </button>
      </motion.form>
    </div>
  );
};

export default Register;
