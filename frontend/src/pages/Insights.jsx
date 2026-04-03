import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import usePortalData from "../hooks/usePortalData";

const colors = ["#2563eb", "#0f766e", "#7c3aed", "#ea580c"];

const Insights = () => {
  const { portalData, loading, error } = usePortalData();

  const pieData = [
    { name: "Upcoming", value: portalData.stats.upcoming_workshops || 0 },
    { name: "Accepted", value: portalData.stats.accepted_workshops || 0 },
    { name: "Pending", value: portalData.stats.pending_workshops || 0 },
    { name: "Types", value: portalData.stats.workshop_types || 0 },
  ];

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto" }}>
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: "28px 24px",
          borderRadius: 30,
          background: "rgba(255,255,255,0.94)",
          border: "1px solid rgba(148,163,184,0.16)",
          boxShadow: "0 22px 60px rgba(15,23,42,0.06)",
        }}
      >
        <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "#2563eb", letterSpacing: "0.06em" }}>
          STATISTICS
        </p>
        <h1 style={{ margin: "10px 0 12px", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#0f172a" }}>
          Workshop statistics
        </h1>
        <p style={{ margin: 0, color: "#64748b", lineHeight: 1.7, maxWidth: 720 }}>
          A simple summary of upcoming, accepted, and pending workshops.
        </p>
      </motion.section>

      {error && (
        <div style={{ marginTop: 18, color: "#be123c", fontWeight: 700 }}>{error}</div>
      )}

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 20,
          marginTop: 20,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            padding: 24,
            borderRadius: 28,
            background: "rgba(255,255,255,0.94)",
            border: "1px solid rgba(148,163,184,0.16)",
            boxShadow: "0 18px 45px rgba(15,23,42,0.05)",
          }}
        >
          <h3 style={{ margin: 0, color: "#0f172a", fontSize: "1.4rem" }}>Workshop status</h3>
          <div style={{ width: "100%", height: 320, marginTop: 18 }}>
            {loading ? (
              <div style={{ color: "#64748b", fontWeight: 600 }}>Loading insights...</div>
            ) : (
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={pieData} dataKey="value" innerRadius={70} outerRadius={110} paddingAngle={4}>
                    {pieData.map((item, index) => (
                      <Cell key={item.name} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            padding: 24,
            borderRadius: 28,
            background: "rgba(255,255,255,0.94)",
            border: "1px solid rgba(148,163,184,0.16)",
            boxShadow: "0 18px 45px rgba(15,23,42,0.05)",
            display: "grid",
            gap: 14,
          }}
        >
          {pieData.map((item, index) => (
            <div
              key={item.name}
              style={{
                padding: "16px 18px",
                borderRadius: 20,
                background: "#f8fbff",
                border: "1px solid rgba(148,163,184,0.12)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: colors[index % colors.length],
                      display: "inline-block",
                    }}
                  />
                  <span style={{ color: "#334155", fontWeight: 700 }}>{item.name}</span>
                </div>
                <strong style={{ color: "#0f172a", fontSize: "1.2rem" }}>{item.value}</strong>
              </div>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Insights;
