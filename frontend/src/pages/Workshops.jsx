import { motion } from "framer-motion";
import { CalendarClock, CircleCheckBig, Hourglass, UserRound } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import usePortalData from "../hooks/usePortalData";

const statusStyles = {
  Accepted: { color: "#0f766e", background: "rgba(15,118,110,0.12)" },
  Pending: { color: "#7c3aed", background: "rgba(124,58,237,0.12)" },
  Ready: { color: "#2563eb", background: "rgba(37,99,235,0.12)" },
  Deleted: { color: "#dc2626", background: "rgba(220,38,38,0.12)" },
};

const formatDate = (dateValue) =>
  new Date(dateValue).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const Workshops = () => {
  const { portalData, loading, error } = usePortalData();
  const { isDark } = useTheme();

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto" }}>
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: "28px 24px",
          borderRadius: 30,
          background: "var(--panel-strong)",
          border: "1px solid var(--panel-border)",
          boxShadow: "var(--shadow-strong)",
        }}
      >
        <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "var(--accent)", letterSpacing: "0.06em" }}>
          WORKSHOPS
        </p>
        <h1 style={{ margin: "10px 0 12px", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "var(--shell-text)" }}>
          Workshop list
        </h1>
        <p style={{ margin: 0, color: "var(--muted-text)", lineHeight: 1.7, maxWidth: 720 }}>
          View currently available workshops, assigned instructors, coordinators, and scheduled dates.
        </p>
      </motion.section>

      {error && (
        <div style={{ marginTop: 18, color: "#be123c", fontWeight: 700 }}>{error}</div>
      )}

      <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
        {loading ? (
          <div style={{ color: "var(--muted-text)", fontWeight: 600 }}>Loading workshops...</div>
        ) : (
          portalData.workshops.map((workshop, index) => {
            const statusStyle = statusStyles[workshop.status] || statusStyles.Ready;

            return (
              <motion.div
                key={`${workshop.id}-${workshop.date}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
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
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 16,
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <h3 style={{ margin: 0, fontSize: "1.2rem", color: "var(--shell-text)" }}>{workshop.title}</h3>
                    <p style={{ margin: "8px 0 0", color: "var(--muted-text)", lineHeight: 1.6 }}>
                      Scheduled for {formatDate(workshop.date)} • {workshop.duration} day(s)
                    </p>
                  </div>

                  <span
                    style={{
                      padding: "8px 12px",
                      borderRadius: 999,
                      fontWeight: 800,
                      fontSize: 12,
                      color: statusStyle.color,
                      background: statusStyle.background,
                    }}
                  >
                    {workshop.status}
                  </span>
                </div>

                <div
                  style={{
                    marginTop: 18,
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: 12,
                  }}
                >
                  {[
                    { icon: UserRound, label: "Coordinator", value: workshop.coordinator },
                    { icon: CircleCheckBig, label: "Instructor", value: workshop.instructor },
                    { icon: CalendarClock, label: "Delivery", value: formatDate(workshop.date) },
                    { icon: Hourglass, label: "Duration", value: `${workshop.duration} day(s)` },
                  ].map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      style={{
                        padding: "14px 16px",
                        borderRadius: 18,
                        background: isDark ? "rgba(15,23,42,0.72)" : "var(--panel-muted)",
                        border: "1px solid var(--panel-border)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          color: "var(--muted-text)",
                          fontWeight: 700,
                        }}
                      >
                        <Icon size={16} />
                        {label}
                      </div>
                      <p style={{ margin: "8px 0 0", color: "var(--shell-text)", fontWeight: 700 }}>{value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Workshops;
