import { motion } from "framer-motion";
import { CalendarClock, CircleCheckBig, Hourglass, UserRound } from "lucide-react";
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
          WORKSHOPS
        </p>
        <h1 style={{ margin: "10px 0 12px", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#0f172a" }}>
          Workshop list
        </h1>
        <p style={{ margin: 0, color: "#64748b", lineHeight: 1.7, maxWidth: 720 }}>
          View currently available workshops, assigned instructors, coordinators, and scheduled dates.
        </p>
      </motion.section>

      {error && (
        <div style={{ marginTop: 18, color: "#be123c", fontWeight: 700 }}>{error}</div>
      )}

      <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
        {loading ? (
          <div style={{ color: "#64748b", fontWeight: 600 }}>Loading workshops...</div>
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
                  background: "rgba(255,255,255,0.94)",
                  border: "1px solid rgba(148,163,184,0.16)",
                  boxShadow: "0 18px 45px rgba(15,23,42,0.05)",
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
                    <h3 style={{ margin: 0, fontSize: "1.2rem", color: "#0f172a" }}>{workshop.title}</h3>
                    <p style={{ margin: "8px 0 0", color: "#64748b", lineHeight: 1.6 }}>
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
                  <div style={{ padding: "14px 16px", borderRadius: 18, background: "#f8fbff" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontWeight: 700 }}>
                      <UserRound size={16} />
                      Coordinator
                    </div>
                    <p style={{ margin: "8px 0 0", color: "#0f172a", fontWeight: 700 }}>{workshop.coordinator}</p>
                  </div>

                  <div style={{ padding: "14px 16px", borderRadius: 18, background: "#f8fbff" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontWeight: 700 }}>
                      <CircleCheckBig size={16} />
                      Instructor
                    </div>
                    <p style={{ margin: "8px 0 0", color: "#0f172a", fontWeight: 700 }}>{workshop.instructor}</p>
                  </div>

                  <div style={{ padding: "14px 16px", borderRadius: 18, background: "#f8fbff" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontWeight: 700 }}>
                      <CalendarClock size={16} />
                      Delivery
                    </div>
                    <p style={{ margin: "8px 0 0", color: "#0f172a", fontWeight: 700 }}>{formatDate(workshop.date)}</p>
                  </div>

                  <div style={{ padding: "14px 16px", borderRadius: 18, background: "#f8fbff" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontWeight: 700 }}>
                      <Hourglass size={16} />
                      Duration
                    </div>
                    <p style={{ margin: "8px 0 0", color: "#0f172a", fontWeight: 700 }}>{workshop.duration} day(s)</p>
                  </div>
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
