import { motion } from "framer-motion";
import { ArrowUpRight, BookOpenText, Files, Layers3 } from "lucide-react";
import usePortalData from "../hooks/usePortalData";

const Resources = () => {
  const { portalData, loading, error } = usePortalData();

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto" }}>
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: "28px 24px",
          borderRadius: 30,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(239,246,255,0.98), rgba(248,250,252,0.98))",
          border: "1px solid rgba(148,163,184,0.16)",
          boxShadow: "0 22px 60px rgba(15,23,42,0.06)",
        }}
      >
        <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "#2563eb", letterSpacing: "0.06em" }}>
          WORKSHOP TYPES
        </p>
        <h1 style={{ margin: "10px 0 12px", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#0f172a" }}>
          Workshop types
        </h1>
        <p style={{ margin: 0, color: "#64748b", lineHeight: 1.7, maxWidth: 720 }}>
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
          <div style={{ color: "#64748b", fontWeight: 600 }}>Loading resources...</div>
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
                background: "rgba(255,255,255,0.94)",
                border: "1px solid rgba(148,163,184,0.16)",
                boxShadow: "0 18px 45px rgba(15,23,42,0.05)",
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
                  background: "rgba(37,99,235,0.12)",
                  color: "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BookOpenText size={22} />
              </div>

              <div>
                <h3 style={{ margin: 0, fontSize: "1.18rem", color: "#0f172a" }}>{item.name}</h3>
                <p style={{ margin: "10px 0 0", color: "#64748b", lineHeight: 1.65 }}>{item.description}</p>
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: 16,
                    background: "#f8fbff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontWeight: 700 }}>
                    <Layers3 size={16} />
                    Duration
                  </div>
                  <strong style={{ color: "#0f172a" }}>{item.duration} day(s)</strong>
                </div>

                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: 16,
                    background: "#f8fbff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontWeight: 700 }}>
                    <Files size={16} />
                    Resource Count
                  </div>
                  <strong style={{ color: "#0f172a" }}>{item.resource_count ?? 0}</strong>
                </div>
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
