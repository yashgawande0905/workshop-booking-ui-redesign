import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  Lock,
  Mail,
  Moon,
  Phone,
  ShieldCheck,
  SunMedium,
  User,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { getProfessionsForRole, roleOptions } from "../data/userRoles";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const { isDark, toggleTheme, theme } = useTheme();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Student",
    profession: "Student",
    customProfession: "",
    institute: "",
    department: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const visibleRoleOptions = roleOptions.filter((option) => option.value !== "Admin");

  const professionOptions = useMemo(() => getProfessionsForRole(form.role), [form.role]);

  const updateField = (field, value) => {
    setForm((current) => {
      const next = { ...current, [field]: value };

      if (field === "role") {
        next.profession = getProfessionsForRole(value)[0];
        next.customProfession = "";
      }

      return next;
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const finalProfession =
      form.profession === "Other" ? form.customProfession.trim() : form.profession;

    if (form.password !== form.confirmPassword) {
      setError("Password and confirm password must match.");
      return;
    }

    if (!finalProfession) {
      setError("Please enter the profession or coordinator title.");
      return;
    }

    const result = registerUser({
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
      profession: finalProfession,
      institute: form.institute,
      department: form.department,
      phone: form.phone,
    });

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setSuccess(`Account created as ${form.role.toLowerCase()}. Redirecting to dashboard...`);
    window.setTimeout(() => navigate("/dashboard"), 900);
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
          maxWidth: 860,
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
            alignItems: "start",
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: "2rem", color: "var(--shell-text)" }}>Create Account</h1>
            <p style={{ color: "var(--muted-text)", lineHeight: 1.6, margin: "12px 0 24px" }}>
              Register as a student or coordinator and store profile details based on the person&apos;s
              profession.
            </p>

            <div style={{ display: "grid", gap: 12 }}>
              {visibleRoleOptions.map((option) => {
                const active = form.role === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateField("role", option.value)}
                    style={{
                      textAlign: "left",
                      padding: 18,
                      borderRadius: 20,
                      border: active ? "1px solid rgba(37,99,235,0.4)" : "1px solid var(--panel-border)",
                      background: active ? "var(--accent-soft)" : "var(--panel-bg)",
                      cursor: "pointer",
                      color: "var(--shell-text)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <ShieldCheck size={18} color={active ? "#2563eb" : "var(--muted-text)"} />
                      <strong>{option.title}</strong>
                    </div>
                    <div style={{ color: "var(--muted-text)", lineHeight: 1.55 }}>{option.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 18,
            }}
          >
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>
                <User size={16} />
                Full Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Your full name"
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>
                <Mail size={16} />
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="you@iitb.ac.in"
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>
                <Phone size={16} />
                Phone
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="10 digit mobile number"
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>
                <BriefcaseBusiness size={16} />
                Profession
              </label>
              <select
                value={form.profession}
                onChange={(e) => updateField("profession", e.target.value)}
                style={inputStyle}
              >
                {professionOptions.map((profession) => (
                  <option key={profession} value={profession}>
                    {profession}
                  </option>
                ))}
              </select>
            </div>

            {form.profession === "Other" ? (
              <div>
                <label style={labelStyle}>
                  <BriefcaseBusiness size={16} />
                  Custom {form.role === "Coordinator" ? "Coordinator Title" : "Profession"}
                </label>
                <input
                  type="text"
                  value={form.customProfession}
                  onChange={(e) => updateField("customProfession", e.target.value)}
                  placeholder={
                    form.role === "Coordinator"
                      ? "Example: Event Lead, Nodal Officer, Program Head"
                      : "Enter profession or role"
                  }
                  required
                  style={inputStyle}
                />
              </div>
            ) : null}

            <div>
              <label style={labelStyle}>
                <Building2 size={16} />
                Institute / Organization
              </label>
              <input
                type="text"
                value={form.institute}
                onChange={(e) => updateField("institute", e.target.value)}
                placeholder="Institute name"
                required
                style={inputStyle}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>
                <BriefcaseBusiness size={16} />
                Department / Area
              </label>
              <input
                type="text"
                value={form.department}
                onChange={(e) => updateField("department", e.target.value)}
                placeholder={form.role === "Student" ? "Branch / Semester / Lab" : "Department / Team"}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>
                <Lock size={16} />
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                placeholder="Create a password"
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>
                <Lock size={16} />
                Confirm Password
              </label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                placeholder="Re-enter password"
                required
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {error ? (
          <div
            style={{
              marginTop: 18,
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

        {success ? (
          <div
            style={{
              marginTop: 18,
              padding: "12px 14px",
              borderRadius: 14,
              background: "rgba(15,118,110,0.1)",
              color: "#0f766e",
              fontWeight: 700,
            }}
          >
            {success}
          </div>
        ) : null}

        <button
          type="submit"
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
          Create Account
        </button>
      </motion.form>
    </div>
  );
};

export default Register;
