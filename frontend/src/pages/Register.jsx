import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
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
    border: "2px solid #dbe3f0",
    background: "#f8fafc",
    color: "#0f172a",
    fontSize: 15,
    outline: "none",
  };

  const labelStyle = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    fontWeight: 600,
    color: "#1e293b",
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
        background: "linear-gradient(180deg, #eff6ff 0%, #f8fafc 100%)",
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      }}
    >
      <motion.form
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleRegister}
        style={{
          width: "100%",
          maxWidth: 440,
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

        <h1 style={{ margin: 0, fontSize: "2rem", color: "#0f172a" }}>Create Account</h1>
        <p style={{ color: "#64748b", lineHeight: 1.6, margin: "12px 0 24px" }}>
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
            boxShadow: "0 8px 30px rgba(59,130,246,0.25)",
          }}
        >
          Create Account
        </button>
      </motion.form>
    </div>
  );
};

export default Register;
