import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Moon, SunMedium } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { isDark, toggleTheme, theme } = useTheme();

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

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: "100%",
          maxWidth: 420,
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

        <h1 style={{ margin: 0, fontSize: "2rem", color: "var(--shell-text)" }}>Forgot Password</h1>
        <p style={{ color: "var(--muted-text)", lineHeight: 1.6, margin: "12px 0 24px" }}>
          Enter your email and we will take you to the next reset step.
        </p>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            fontWeight: 600,
            color: "var(--secondary-text)",
            marginBottom: 8,
          }}
        >
          <Mail size={16} />
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@iitb.ac.in"
          style={{
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
          }}
        />

        <button
          type="button"
          onClick={() => navigate("/login")}
          style={{
            marginTop: 22,
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
          Continue
        </button>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
