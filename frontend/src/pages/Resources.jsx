import { motion } from "framer-motion";
import { ArrowUpRight, BookOpenText, Files, Layers3 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import usePortalData from "../hooks/usePortalData";

const Resources = () => {
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
          WORKSHOP TYPES
        </p>
        <h1 style={{ margin: "10px 0 12px", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "var(--shell-text)" }}>
          Workshop types
        </h1>
        <p style={{ margin: 0, color: "var(--muted-text)", lineHeight: 1.7, maxWidth: 720 }}>
          Browse the workshop types available in the system along with their duration and attached resources.
        </p>
      </motion.section>

      {error && (
        <div style={{ marginTop: 18, color: "#be123c", fontWeight: 700 }}>{error}</div>
      )}

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 18,
          marginTop: 20,
        }}
      >
        {loading ? (
          <div style={{ color: "var(--muted-text)", fontWeight: 600 }}>Loading resources...</div>
        ) : (
          portalData.workshop_types.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              style={{
                padding: 22,
                borderRadius: 24,
                background: "var(--panel-bg)",
                border: "1px solid var(--panel-border)",
                boxShadow: "var(--shadow-soft)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 18,
                  background: "var(--accent-soft)",
                  color: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: isDark ? "1px solid rgba(96,165,250,0.2)" : "1px solid rgba(147,197,253,0.5)",
                }}
              >
                <BookOpenText size={22} />
              </div>

              <div>
                <h3 style={{ margin: 0, fontSize: "1.18rem", color: "var(--shell-text)" }}>{item.name}</h3>
                <p style={{ margin: "10px 0 0", color: "var(--muted-text)", lineHeight: 1.65 }}>{item.description}</p>
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                {[
                  { icon: Layers3, label: "Duration", value: `${item.duration} day(s)` },
                  { icon: Files, label: "Resource Count", value: item.resource_count ?? 0 },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    style={{
                      padding: "12px 14px",
                      borderRadius: 16,
                      background: isDark ? "rgba(15,23,42,0.72)" : "var(--panel-muted)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      border: "1px solid var(--panel-border)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted-text)", fontWeight: 700 }}>
                      <Icon size={16} />
                      {label}
                    </div>
                    <strong style={{ color: "var(--shell-text)" }}>{value}</strong>
                  </div>
                ))}
              </div>

              <button
                type="button"
                style={{
                  marginTop: "auto",
                  height: 46,
                  borderRadius: 14,
                  border: "none",
                  background: "linear-gradient(135deg, #2563eb, #60a5fa)",
                  color: "#fff",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  cursor: "pointer",
                  boxShadow: isDark
                    ? "0 12px 28px rgba(29,78,216,0.28)"
                    : "0 10px 24px rgba(37,99,235,0.22)",
                }}
              >
                Open Details
                <ArrowUpRight size={16} />
              </button>
            </motion.article>
          ))
        )}
      </section>
    </div>
  );
};

export default Resources;
