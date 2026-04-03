import { motion } from "framer-motion";
import {
  CalendarCheck2,
  Clock3,
  Layers3,
  Users,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAuth } from "../context/AuthContext";
import usePortalData from "../hooks/usePortalData";

const statCards = [
  {
    key: "upcoming_workshops",
    label: "Upcoming Workshops",
    icon: CalendarCheck2,
    accent: "#2563eb",
  },
  {
    key: "accepted_workshops",
    label: "Accepted Workshops",
    icon: Users,
    accent: "#0f766e",
  },
  {
    key: "pending_workshops",
    label: "Pending Requests",
    icon: Clock3,
    accent: "#7c3aed",
  },
  {
    key: "workshop_types",
    label: "Workshop Types",
    icon: Layers3,
    accent: "#ea580c",
  },
];

const formatDate = (dateValue) => {
  const date = new Date(dateValue);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const Dashboard = () => {
  const { user } = useAuth();
  const { portalData: dashboardData, loading, error } = usePortalData();

  const chartData = dashboardData.workshop_types.map((item) => ({
    name: item.name.length > 16 ? `${item.name.slice(0, 16)}...` : item.name,
    duration: item.duration,
  }));

  return (
    <div style={{ maxWidth: 1220, margin: "0 auto" }}>
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: "28px 24px",
          borderRadius: 28,
          background: "rgba(255,255,255,0.96)",
          border: "1px solid rgba(148,163,184,0.16)",
          boxShadow: "0 20px 48px rgba(15,23,42,0.06)",
        }}
      >
        <p style={{ margin: 0, fontSize: 13, fontWeight: 800, letterSpacing: "0.06em", color: "#2563eb" }}>
          DASHBOARD
        </p>
        <h1 style={{ margin: "10px 0 12px", fontSize: "clamp(2rem, 4vw, 2.8rem)", lineHeight: 1.1, color: "#0f172a" }}>
          Welcome, {user?.name || "Student"}.
        </h1>
        <p style={{ margin: 0, maxWidth: 760, lineHeight: 1.7, color: "#64748b" }}>
          This page gives a quick view of current workshops, pending requests, and the workshop
          types available in the system.
        </p>
      </motion.section>

      {error && (
        <div
          style={{
            marginTop: 18,
            padding: "14px 16px",
            borderRadius: 18,
            background: "#fff1f2",
            border: "1px solid #fecdd3",
            color: "#be123c",
            fontWeight: 600,
          }}
        >
          {error}
        </div>
      )}

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 18,
          marginTop: 22,
        }}
      >
        {statCards.map(({ key, label, icon: Icon, accent }, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * index }}
            style={{
              padding: 22,
              borderRadius: 26,
              background: "rgba(255,255,255,0.94)",
              border: "1px solid rgba(148,163,184,0.16)",
              boxShadow: "0 20px 48px rgba(15,23,42,0.06)",
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 18,
                background: `${accent}18`,
                color: accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <Icon size={22} />
            </div>
            <p style={{ margin: 0, color: "#64748b", fontWeight: 600 }}>{label}</p>
            <h2 style={{ margin: "8px 0 0", fontSize: "2.1rem", color: "#0f172a" }}>
              {loading ? "--" : dashboardData.stats[key] ?? 0}
            </h2>
          </motion.div>
        ))}
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
          marginTop: 22,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            padding: 24,
            borderRadius: 28,
            background: "rgba(255,255,255,0.94)",
            border: "1px solid rgba(148,163,184,0.16)",
            boxShadow: "0 18px 45px rgba(15,23,42,0.06)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "#2563eb", letterSpacing: "0.05em" }}>
                WORKSHOPS
              </p>
              <h3 style={{ margin: "8px 0 0", fontSize: "1.4rem", color: "#0f172a" }}>Recent workshops</h3>
            </div>
          </div>

          <div style={{ display: "grid", gap: 14, marginTop: 20 }}>
            {loading ? (
              <div style={{ color: "#64748b", fontWeight: 600 }}>Loading workshops...</div>
            ) : (
              dashboardData.workshops.map((item) => (
                <div
                  key={`${item.id}-${item.date}`}
                  style={{
                    padding: 18,
                    borderRadius: 22,
                    border: "1px solid rgba(148,163,184,0.16)",
                    background: "linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 16,
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <h4 style={{ margin: 0, fontSize: "1.08rem", color: "#0f172a" }}>{item.title}</h4>
                      <p style={{ margin: "8px 0 0", color: "#64748b", lineHeight: 1.6 }}>
                        {formatDate(item.date)} • {item.duration} day(s)
                      </p>
                    </div>
                    <span
                      style={{
                        padding: "8px 12px",
                        borderRadius: 999,
                        background:
                          item.status === "Accepted"
                            ? "rgba(15,118,110,0.12)"
                            : item.status === "Pending"
                              ? "rgba(124,58,237,0.12)"
                              : "rgba(37,99,235,0.12)",
                        color:
                          item.status === "Accepted"
                            ? "#0f766e"
                            : item.status === "Pending"
                              ? "#7c3aed"
                              : "#2563eb",
                        fontWeight: 800,
                        fontSize: 12,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div
                    style={{
                      marginTop: 16,
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        padding: "12px 14px",
                        borderRadius: 16,
                        background: "#ffffff",
                        border: "1px solid rgba(148,163,184,0.12)",
                      }}
                    >
                      <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", fontWeight: 700 }}>COORDINATOR</p>
                      <p style={{ margin: "6px 0 0", color: "#0f172a", fontWeight: 700 }}>{item.coordinator}</p>
                    </div>
                    <div
                      style={{
                        padding: "12px 14px",
                        borderRadius: 16,
                        background: "#ffffff",
                        border: "1px solid rgba(148,163,184,0.12)",
                      }}
                    >
                      <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", fontWeight: 700 }}>INSTRUCTOR</p>
                      <p style={{ margin: "6px 0 0", color: "#0f172a", fontWeight: 700 }}>{item.instructor}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            padding: 24,
            borderRadius: 28,
            background: "rgba(255,255,255,0.94)",
            border: "1px solid rgba(148,163,184,0.16)",
            boxShadow: "0 18px 45px rgba(15,23,42,0.06)",
          }}
        >
          <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "#2563eb", letterSpacing: "0.05em" }}>
            WORKSHOP TYPES
          </p>
          <h3 style={{ margin: "8px 0 0", fontSize: "1.4rem", color: "#0f172a" }}>Available workshop types</h3>

          <div style={{ width: "100%", height: 260, marginTop: 20 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="duration" radius={[10, 10, 0, 0]} fill="url(#barGradient)" />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#60a5fa" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
            {dashboardData.workshop_types.slice(0, 4).map((item) => (
              <div
                key={item.id}
                style={{
                  padding: "14px 16px",
                  borderRadius: 18,
                  background: "#f8fbff",
                  border: "1px solid rgba(148,163,184,0.14)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                  <h4 style={{ margin: 0, fontSize: "1rem", color: "#0f172a" }}>{item.name}</h4>
                  <div style={{ color: "#2563eb", fontWeight: 800 }}>{item.duration} day(s)</div>
                </div>
                <p style={{ margin: "8px 0 0", color: "#64748b", lineHeight: 1.6 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Dashboard;
