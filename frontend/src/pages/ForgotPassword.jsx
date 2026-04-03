import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail } from "lucide-react";
import { useState } from "react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        background: "linear-gradient(180deg, #eff6ff 0%, #f8fafc 100%)",
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: "100%",
          maxWidth: 420,
          padding: 28,
          borderRadius: 28,
          background: "rgba(255,255,255,0.96)",
          boxShadow: "0 24px 60px rgba(15,23,42,0.12)",
          border: "1px solid rgba(148,163,184,0.18)",
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
            color: "#2563eb",
            cursor: "pointer",
            fontWeight: 600,
            marginBottom: 18,
          }}
        >
          <ArrowLeft size={18} />
          Back to Login
        </button>

        <h1 style={{ margin: 0, fontSize: "2rem", color: "#0f172a" }}>Forgot Password</h1>
        <p style={{ color: "#64748b", lineHeight: 1.6, margin: "12px 0 24px" }}>
          Enter your email and we will take you to the next reset step.
        </p>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            fontWeight: 600,
            color: "#1e293b",
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
            border: "2px solid #dbe3f0",
            background: "#f8fafc",
            color: "#0f172a",
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
            boxShadow: "0 8px 30px rgba(59,130,246,0.25)",
          }}
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
