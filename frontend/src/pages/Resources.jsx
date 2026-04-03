import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpenText, Files, Layers3, Pencil, PlusCircle, Trash2 } from "lucide-react";
import ActionToast from "../components/ActionToast";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import usePortalData from "../hooks/usePortalData";
import { deleteWorkshopType, saveWorkshopType, updateWorkshopType } from "../utils/portalStorage";

const getActionButtonStyle = ({ tone = "neutral" } = {}) => {
  const tones = {
    neutral: { color: "#334155", border: "rgba(148,163,184,0.26)", background: "rgba(248,250,252,0.92)" },
    primary: { color: "#1d4ed8", border: "rgba(37,99,235,0.24)", background: "rgba(219,234,254,0.88)" },
    danger: { color: "#b91c1c", border: "rgba(220,38,38,0.2)", background: "rgba(254,226,226,0.92)" },
  };
  const current = tones[tone] || tones.neutral;

  return {
    height: 42,
    padding: "0 14px",
    borderRadius: 12,
    border: `1px solid ${current.border}`,
    background: current.background,
    color: current.color,
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  };
};

const Resources = () => {
  const { portalData, loading, error } = usePortalData();
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [typeForm, setTypeForm] = useState({
    name: "",
    duration: "",
    description: "",
    resource_count: "",
    level: "Beginner",
  });
  const [editingTypeId, setEditingTypeId] = useState(null);
  const [typePendingDelete, setTypePendingDelete] = useState(null);
  const [toast, setToast] = useState({ message: "", tone: "success" });
  const canManageTypes = user?.role === "Coordinator" || user?.role === "Admin";

  const inputStyle = {
    width: "100%",
    height: 48,
    padding: "0 14px",
    borderRadius: 14,
    border: "1px solid var(--panel-border)",
    background: isDark ? "rgba(15,23,42,0.72)" : "#ffffff",
    color: "var(--shell-text)",
    outline: "none",
    boxSizing: "border-box",
  };

  const handleTypeSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: typeForm.name,
      duration: Number(typeForm.duration),
      description: typeForm.description,
      resource_count: Number(typeForm.resource_count || 0),
      level: typeForm.level,
      created_by: user?.name || "Coordinator",
    };

    if (editingTypeId) {
      updateWorkshopType(editingTypeId, payload);
    } else {
      saveWorkshopType(payload);
    }

    setTypeForm({
      name: "",
      duration: "",
      description: "",
      resource_count: "",
      level: "Beginner",
    });
    setEditingTypeId(null);
    setToast({
      message: editingTypeId
        ? "Workshop type updated and saved."
        : "Workshop type added and available for coordinator workshop creation.",
      tone: editingTypeId ? "info" : "success",
    });
  };

  const startEditingType = (item) => {
    setEditingTypeId(item.id);
    setTypeForm({
      name: item.name || "",
      duration: String(item.duration || ""),
      description: item.description || "",
      resource_count: String(item.resource_count ?? ""),
      level: item.level || "Beginner",
    });
    setToast({ message: `Editing "${item.name}"`, tone: "info" });
  };

  const resetTypeForm = () => {
    setEditingTypeId(null);
    setTypeForm({
      name: "",
      duration: "",
      description: "",
      resource_count: "",
      level: "Beginner",
    });
  };

  const confirmDeleteType = () => {
    if (!typePendingDelete) {
      return;
    }

    deleteWorkshopType(typePendingDelete.id);
    if (editingTypeId === typePendingDelete.id) {
      resetTypeForm();
    }
    setToast({ message: `Workshop type "${typePendingDelete.name}" deleted.`, tone: "danger" });
    setTypePendingDelete(null);
  };

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

      {canManageTypes ? (
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          style={{
            marginTop: 20,
            padding: 24,
            borderRadius: 28,
            background: "var(--panel-bg)",
            border: "1px solid var(--panel-border)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <PlusCircle size={20} color="#2563eb" />
            <h3 style={{ margin: 0, color: "var(--shell-text)", fontSize: "1.35rem" }}>Coordinator Type Setup</h3>
          </div>
          <p style={{ margin: "0 0 18px", color: "var(--muted-text)", lineHeight: 1.65 }}>
            Add a new workshop type with duration, level, description, and resource count so it can be used in coordinator workshop planning.
          </p>

          <form
            onSubmit={handleTypeSubmit}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
            }}
          >
            <input
              value={typeForm.name}
              onChange={(e) => setTypeForm((current) => ({ ...current, name: e.target.value }))}
              placeholder="Workshop type name"
              required
              style={inputStyle}
            />
            <input
              type="number"
              min="1"
              value={typeForm.duration}
              onChange={(e) => setTypeForm((current) => ({ ...current, duration: e.target.value }))}
              placeholder="Duration in days"
              required
              style={inputStyle}
            />
            <select
              value={typeForm.level}
              onChange={(e) => setTypeForm((current) => ({ ...current, level: e.target.value }))}
              style={inputStyle}
            >
              {["Beginner", "Intermediate", "Advanced"].map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="0"
              value={typeForm.resource_count}
              onChange={(e) => setTypeForm((current) => ({ ...current, resource_count: e.target.value }))}
              placeholder="Resource count"
              style={inputStyle}
            />
            <textarea
              value={typeForm.description}
              onChange={(e) => setTypeForm((current) => ({ ...current, description: e.target.value }))}
              placeholder="What is covered in this workshop type?"
              required
              style={{
                ...inputStyle,
                minHeight: 110,
                padding: 14,
                resize: "vertical",
                gridColumn: "1 / -1",
              }}
            />
            <button
              type="submit"
              style={{
                height: 48,
                borderRadius: 14,
                border: "1px solid rgba(37,99,235,0.24)",
                background: "rgba(219,234,254,0.88)",
                color: "#1d4ed8",
                fontWeight: 700,
                cursor: "pointer",
                gridColumn: "1 / -1",
              }}
            >
              {editingTypeId ? "Update Workshop Type" : "Add Workshop Type"}
            </button>
            {editingTypeId ? (
              <button
                type="button"
                onClick={resetTypeForm}
                style={{
                  height: 48,
                  borderRadius: 14,
                  border: "1px solid var(--panel-border)",
                  background: "rgba(248,250,252,0.92)",
                  color: "var(--shell-text)",
                  fontWeight: 700,
                  cursor: "pointer",
                  gridColumn: "1 / -1",
                }}
              >
                Cancel Editing
              </button>
            ) : null}
          </form>

        </motion.section>
      ) : null}

      {error && <div style={{ marginTop: 18, color: "#be123c", fontWeight: 700 }}>{error}</div>}

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
                  { icon: BookOpenText, label: "Level", value: item.level || "Standard" },
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

              {canManageTypes && item.id?.startsWith("custom-type-") ? (
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={() => startEditingType(item)}
                    style={{
                      flex: 1,
                      ...getActionButtonStyle({ tone: "primary" }),
                    }}
                  >
                    <Pencil size={15} />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setTypePendingDelete(item)}
                    style={{
                      flex: 1,
                      ...getActionButtonStyle({ tone: "danger" }),
                    }}
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              ) : null}
            </motion.article>
          ))
        )}
      </section>

      {typePendingDelete ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            zIndex: 60,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 420,
              padding: 24,
              borderRadius: 24,
              background: "var(--panel-strong)",
              border: "1px solid var(--panel-border)",
              boxShadow: "var(--shadow-strong)",
            }}
          >
            <h3 style={{ margin: 0, color: "var(--shell-text)" }}>Delete workshop type?</h3>
            <p style={{ margin: "12px 0 0", color: "var(--muted-text)", lineHeight: 1.65 }}>
              This will remove <strong style={{ color: "var(--shell-text)" }}>{typePendingDelete.name}</strong> from
              the coordinator-created workshop type list.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <button
                type="button"
                onClick={() => setTypePendingDelete(null)}
                style={{
                  flex: 1,
                  height: 44,
                  borderRadius: 14,
                  border: "1px solid var(--panel-border)",
                  background: "var(--panel-bg)",
                  color: "var(--shell-text)",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteType}
                style={{
                  flex: 1,
                  height: 44,
                  borderRadius: 14,
                  border: "none",
                  background: "#dc2626",
                  color: "#fff",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <ActionToast
        message={toast.message}
        tone={toast.tone}
        onClose={() => setToast({ message: "", tone: "success" })}
      />
    </div>
  );
};

export default Resources;
