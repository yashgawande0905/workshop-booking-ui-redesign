// src/pages/Login.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const FloatingParticle = ({ delay, x, y, size }) => (
  <motion.div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: size,
      height: size,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.12)",
    }}
    animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
    transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const text = "Access workshops, resources, and tools - all in one place.";
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [btnHovered, setBtnHovered] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handleResize = () => setViewportWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = viewportWidth < 768;

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      login({
        name: email.split("@")[0] || "Student",
        email,
      });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        minHeight: isMobile ? "100dvh" : "100vh",
        overflow: "hidden",
        alignItems: isMobile ? "center" : "stretch",
        justifyContent: isMobile ? "center" : "flex-start",
        width: isMobile ? "100vw" : "100%",
        boxSizing: "border-box",
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
        background: isMobile ? "linear-gradient(180deg, #eff6ff 0%, #f8fafc 100%)" : "transparent",
      }}
    >
      {!isMobile && (
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(rgba(6, 78, 59, 0.7), rgba(5, 150, 105, 0.7)), url('/iitb.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <FloatingParticle delay={0} x="10%" y="20%" size={8} />
          <FloatingParticle delay={0.5} x="80%" y="15%" size={6} />
          <FloatingParticle delay={1} x="25%" y="70%" size={10} />
          <FloatingParticle delay={1.5} x="70%" y="60%" size={7} />
          <FloatingParticle delay={2} x="50%" y="85%" size={9} />

          <motion.div
            style={{
              position: "absolute",
              width: 500,
              height: 500,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            style={{
              position: "absolute",
              width: 350,
              height: 350,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            style={{
              position: "absolute",
              top: -100,
              left: -100,
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(59,130,246,0.35), transparent)",
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 32,
              padding: "0 48px",
              textAlign: "center",
            }}
          >
            <motion.h1
              style={{
                fontSize: "2.5rem",
                fontWeight: 800,
                color: "white",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              IITB Workshop Portal
            </motion.h1>

            <motion.p
              style={{
                maxWidth: 320,
                fontSize: 15,
                lineHeight: 1.7,
                fontWeight: 600,
                color: "rgba(255,255,255,0.95)",
                textShadow: "0 6px 30px rgba(0,0,0,0.7)",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              {text}
            </motion.p>

            <motion.div
              style={{ display: "flex", gap: 12, marginTop: 8 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {["Workshops", "Resources", "Certificates"].map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.08, y: -2 }}
                  style={{
                    padding: "7px 18px",
                    borderRadius: 9999,
                    fontSize: 12,
                    fontWeight: 600,
                    background: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.88)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: isMobile ? "100%" : "50%",
          minHeight: isMobile ? "100dvh" : "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #fafbff 0%, #f0f4ff 100%)",
          padding: isMobile ? 0 : 48,
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.04,
              backgroundImage: "radial-gradient(circle at 1px 1px, #1e3a5f 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
        )}

        <div
          style={{
            width: "100%",
            minHeight: isMobile ? "100dvh" : "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobile ? "20px 16px" : 0,
            boxSizing: "border-box",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: isMobile ? "calc(100vw - 32px)" : "100%",
              maxWidth: isMobile ? 360 : 380,
              position: "relative",
              padding: isMobile ? "32px 22px 28px" : 0,
              borderRadius: isMobile ? 28 : 0,
              background: isMobile ? "rgba(255,255,255,0.94)" : "transparent",
              boxShadow: isMobile ? "0 22px 60px rgba(15,23,42,0.12)" : "none",
              border: isMobile ? "1px solid rgba(148,163,184,0.18)" : "none",
              backdropFilter: isMobile ? "blur(16px)" : "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: isMobile ? "0 auto" : 0,
              boxSizing: "border-box",
            }}
          >
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "center",
                justifyContent: isMobile ? "center" : "flex-start",
                gap: 14,
                marginBottom: isMobile ? 24 : 10,
              }}
            >
              <h2
                style={{
                  fontSize: isMobile ? "2rem" : "2.2rem",
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: "-0.03em",
                  textAlign: isMobile ? "center" : "left",
                  margin: 0,
                }}
              >
                Welcome Back
              </h2>

              <motion.img
                src="/iitb-logo.png"
                alt="IITB Logo"
                style={{
                  width: isMobile ? 44 : 42,
                  height: isMobile ? 44 : 42,
                  objectFit: "contain",
                  borderRadius: "50%",
                  boxShadow: "0 0 10px rgba(16,185,129,0.4)",
                }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
            </div>

            {!isMobile && (
              <motion.p
                style={{
                  fontSize: 15,
                  color: "#64748b",
                  marginBottom: 36,
                  lineHeight: 1.5,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Sign in to continue to your dashboard
              </motion.p>
            )}
          </motion.div>

          <motion.form
            onSubmit={handleLogin}
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", gap: isMobile ? 2 : 0 }}
          >
            <motion.div
              style={{ marginBottom: 22 }}
              animate={focusedField === "email" ? { scale: 1.015 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#1e293b",
                  marginBottom: 8,
                  letterSpacing: "0.01em",
                }}
              >
                <motion.div
                  animate={
                    focusedField === "email"
                      ? { color: "#3b82f6", scale: 1.2 }
                      : { color: "#94a3b8", scale: 1 }
                  }
                >
                  <Mail style={{ width: 16, height: 16 }} />
                </motion.div>
                Email
              </label>

              <motion.div style={{ position: "relative" }}>
                <input
                  type="email"
                  placeholder="you@iitb.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                  style={{
                    width: "100%",
                    height: 52,
                    boxSizing: "border-box",
                    padding: "0 52px 0 16px",
                    borderRadius: 14,
                    border:
                      focusedField === "email" ? "2px solid #3b82f6" : "2px solid #e2e8f0",
                    background: focusedField === "email" ? "#ffffff" : "#f8fafc",
                    color: "#0f172a",
                    fontSize: 15,
                    fontWeight: 500,
                    outline: "none",
                    transition: "all 0.3s",
                    boxShadow:
                      focusedField === "email"
                        ? "0 0 0 4px rgba(59,130,246,0.12)"
                        : "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              style={{ marginBottom: 28 }}
              animate={focusedField === "password" ? { scale: 1.015 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#1e293b",
                  marginBottom: 8,
                  letterSpacing: "0.01em",
                }}
              >
                <motion.div
                  animate={
                    focusedField === "password"
                      ? { color: "#3b82f6", scale: 1.2 }
                      : { color: "#94a3b8", scale: 1 }
                  }
                >
                  <Lock style={{ width: 16, height: 16 }} />
                </motion.div>
                Password
              </label>

              <motion.div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  required
                  style={{
                    width: "100%",
                    height: 52,
                    boxSizing: "border-box",
                    padding: "0 60px 0 16px",
                    borderRadius: 14,
                    border:
                      focusedField === "password"
                        ? "2px solid #3b82f6"
                        : "2px solid #e2e8f0",
                    background: focusedField === "password" ? "#ffffff" : "#f8fafc",
                    color: "#0f172a",
                    fontSize: 15,
                    fontWeight: 500,
                    outline: "none",
                    transition: "all 0.3s",
                    boxShadow:
                      focusedField === "password"
                        ? "0 0 0 4px rgba(59,130,246,0.12)"
                        : "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                />

                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  initial={{ y: "-50%" }}
                  animate={{ y: "-50%" }}
                  whileHover={{ scale: 1.05, y: "-50%" }}
                  whileTap={{ scale: 0.95, y: "-50%" }}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    margin: 0,
                    color: "#64748b",
                  }}
                >
                  {showPassword ? (
                    <EyeOff style={{ width: 18, height: 18 }} />
                  ) : (
                    <Eye style={{ width: 18, height: 18 }} />
                  )}
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.025, boxShadow: "0 8px 30px rgba(59,130,246,0.35)" }}
              whileTap={{ scale: 0.97 }}
              onHoverStart={() => setBtnHovered(true)}
              onHoverEnd={() => setBtnHovered(false)}
              style={{
                width: "100%",
                height: 50,
                boxSizing: "border-box",
                borderRadius: 14,
                border: "none",
                fontSize: 17,
                fontWeight: 700,
                color: "white",
                cursor: loading ? "not-allowed" : "pointer",
                background: loading
                  ? "linear-gradient(135deg, #93c5fd, #60a5fa)"
                  : btnHovered
                    ? "linear-gradient(135deg, #1d4ed8, #2563eb, #3b82f6)"
                    : "linear-gradient(135deg, #2563eb, #3b82f6, #60a5fa)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                transition: "background 0.4s, box-shadow 0.3s",
                boxShadow: "0 4px 15px rgba(59,130,246,0.25)",
                fontFamily: "inherit",
                letterSpacing: "0.02em",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {!loading && (
                <motion.div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                  }}
                  animate={{ left: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                />
              )}

              {loading ? (
                <motion.div
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    style={{
                      width: 22,
                      height: 22,
                      border: "2.5px solid rgba(255,255,255,0.3)",
                      borderTop: "2.5px solid white",
                      borderRadius: "50%",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                  />
                  Signing in...
                </motion.div>
              ) : (
                <>
                  Login
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight style={{ width: 20, height: 20 }} />
                  </motion.div>
                </>
              )}
            </motion.button>

            <div
              style={{
                display: "flex",
                justifyContent: isMobile ? "center" : "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: isMobile ? 14 : 12,
                marginTop: 20,
                fontSize: 14,
              }}
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.08, x: -3 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredLink("register")}
                onHoverEnd={() => setHoveredLink(null)}
                onClick={() => navigate("/register")}
                style={{
                  background: "none",
                  border: "none",
                  color: hoveredLink === "register" ? "#1d4ed8" : "#3b82f6",
                  cursor: "pointer",
                  fontWeight: 600,
                  transition: "color 0.3s",
                  fontFamily: "inherit",
                  textDecoration: hoveredLink === "register" ? "underline" : "none",
                  textUnderlineOffset: 4,
                }}
              >
                New User?
              </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.08, x: 3 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setHoveredLink("forgot")}
                  onHoverEnd={() => setHoveredLink(null)}
                  onClick={() => navigate("/forgot-password")}
                  style={{
                    background: "none",
                    border: "none",
                    color: hoveredLink === "forgot" ? "#1d4ed8" : "#3b82f6",
                    cursor: "pointer",
                    fontWeight: 600,
                    transition: "color 0.3s",
                    fontFamily: "inherit",
                    textDecoration: hoveredLink === "forgot" ? "underline" : "none",
                    textUnderlineOffset: 4,
                  }}
                >
                  Forgot Password?
                </motion.button>
              </div>
          </motion.form>

          <motion.p
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "#94a3b8",
              marginTop: isMobile ? 24 : 40,
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            © 2026 IIT Bombay — Workshop Portal
          </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
