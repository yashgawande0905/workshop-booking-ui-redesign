import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CircleCheckBig, Mail, Moon, ShieldQuestion, SunMedium } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const steps = [
  "Enter your registered email",
  "Request a reset link",
  "Check your inbox and sign in again",
];

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { requestPasswordReset } = useAuth();
  const { isDark, toggleTheme, theme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const result = requestPasswordReset(email);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    setMessage(result.message);
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

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: "100%",
          maxWidth: 860,
          padding: 28,
          borderRadius: 28,
          background: "var(--panel-strong)",
          boxShadow: "var(--shadow-strong)",
          border: "1px solid var(--panel-border)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
        }}
      >
        <div>
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

          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 22,
              background: "var(--accent-soft)",
              color: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 18,
            }}
          >
            <ShieldQuestion size={28} />
          </div>

          <h1 style={{ margin: 0, fontSize: "2rem", color: "var(--shell-text)" }}>Forgot Password</h1>
          <p style={{ color: "var(--muted-text)", lineHeight: 1.7, margin: "12px 0 22px" }}>
            Enter your registered email address and request a reset. This frontend now validates the
            email against registered demo accounts.
          </p>

          <div style={{ display: "grid", gap: 12 }}>
            {steps.map((step, index) => (
              <div
                key={step}
                style={{
                  padding: "14px 16px",
                  borderRadius: 18,
                  background: isDark ? "rgba(15,23,42,0.72)" : "var(--panel-muted)",
                  border: "1px solid var(--panel-border)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  color: "var(--shell-text)",
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #2563eb, #60a5fa)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  {index + 1}
                </div>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
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
            Registered Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@iitb.ac.in"
            required
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

          <div
            style={{
              marginTop: 14,
              padding: "14px 16px",
              borderRadius: 18,
              background: "var(--panel-bg)",
              border: "1px solid var(--panel-border)",
              color: "var(--muted-text)",
              lineHeight: 1.65,
            }}
          >
            Demo accounts you can try: `student@iitb.ac.in` or `coordinator@fossee.in`
          </div>

          {error ? (
            <div
              style={{
                marginTop: 16,
                padding: "12px 14px",
                borderRadius: 14,
                background: "rgba(225,29,72,0.08)",
                color: "#be123c",
                fontWeight: 700,
              }}
            >
              {error}
            </div>
          ) : null}

          {message ? (
            <div
              style={{
                marginTop: 16,
                padding: "12px 14px",
                borderRadius: 14,
                background: "rgba(15,118,110,0.1)",
                color: "#0f766e",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <CircleCheckBig size={18} />
              {message}
            </div>
          ) : null}

          <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
            <button
              type="submit"
              style={{
                flex: 1,
                minWidth: 180,
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
              Request Reset
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              style={{
                flex: 1,
                minWidth: 180,
                height: 50,
                borderRadius: 14,
                border: "1px solid var(--panel-border)",
                background: "var(--panel-bg)",
                color: "var(--shell-text)",
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
