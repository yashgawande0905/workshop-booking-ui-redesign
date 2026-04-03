import { motion } from "framer-motion";
import { Building2, Mail, ShieldCheck, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

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

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto" }}>
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: "30px 24px",
          borderRadius: 32,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(239,246,255,0.98), rgba(248,250,252,0.98))",
          border: "1px solid rgba(148,163,184,0.16)",
          boxShadow: "0 24px 60px rgba(15,23,42,0.06)",
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
              background: "linear-gradient(135deg, #2563eb, #60a5fa)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 18px 36px rgba(37,99,235,0.24)",
            }}
          >
            <UserRound size={34} />
          </div>

          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "#2563eb", letterSpacing: "0.06em" }}>
              PROFILE
            </p>
            <h1 style={{ margin: "10px 0 8px", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#0f172a" }}>
              {user?.name || "Student"}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontWeight: 600 }}>
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
              background: "rgba(255,255,255,0.94)",
              border: "1px solid rgba(148,163,184,0.16)",
              boxShadow: "0 18px 45px rgba(15,23,42,0.05)",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 18,
                background: "rgba(37,99,235,0.12)",
                color: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 14,
              }}
            >
              <Icon size={20} />
            </div>
            <p style={{ margin: 0, color: "#64748b", fontWeight: 700 }}>{label}</p>
            <h3 style={{ margin: "8px 0 0", color: "#0f172a" }}>{value}</h3>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Profile;
