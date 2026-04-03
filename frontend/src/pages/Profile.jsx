import { motion } from "framer-motion";
import { Building2, Mail, ShieldCheck, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const infoCards = [
  {
    label: "Account Role",
    value: "Student / Coordinator",
    icon: ShieldCheck,
  },
  {
    label: "Institute",
    value: "IIT Bombay / FOSSEE Portal",
    icon: Building2,
  },
];

const Profile = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto" }}>
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: "30px 24px",
          borderRadius: 32,
          background: "var(--panel-strong)",
          border: "1px solid var(--panel-border)",
          boxShadow: "var(--shadow-strong)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: 82,
              height: 82,
              borderRadius: 28,
              background: isDark
                ? "linear-gradient(135deg, #1d4ed8, #3b82f6)"
                : "linear-gradient(135deg, #2563eb, #60a5fa)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: isDark
                ? "0 18px 36px rgba(37,99,235,0.18)"
                : "0 18px 36px rgba(37,99,235,0.24)",
            }}
          >
            <UserRound size={34} />
          </div>

          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "var(--accent)", letterSpacing: "0.06em" }}>
              PROFILE
            </p>
            <h1 style={{ margin: "10px 0 8px", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "var(--shell-text)" }}>
              {user?.name || "Student"}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted-text)", fontWeight: 600 }}>
              <Mail size={16} />
              {user?.email || "Not available"}
            </div>
          </div>
        </div>
      </motion.section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 18,
          marginTop: 20,
        }}
      >
        {infoCards.map(({ label, value, icon: Icon }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: 22,
              borderRadius: 24,
              background: "var(--panel-bg)",
              border: "1px solid var(--panel-border)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 18,
                background: "var(--accent-soft)",
                color: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 14,
                border: isDark ? "1px solid rgba(96,165,250,0.2)" : "1px solid rgba(147,197,253,0.5)",
              }}
            >
              <Icon size={20} />
            </div>
            <p style={{ margin: 0, color: "var(--muted-text)", fontWeight: 700 }}>{label}</p>
            <h3 style={{ margin: "8px 0 0", color: "var(--shell-text)" }}>{value}</h3>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Profile;
