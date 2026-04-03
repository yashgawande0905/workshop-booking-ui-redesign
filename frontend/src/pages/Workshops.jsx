import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarClock,
  CheckCircle2,
  CircleCheckBig,
  Hourglass,
  MapPin,
  Pencil,
  PlusCircle,
  ShieldCheck,
  Trash2,
  UserRound,
  XCircle,
} from "lucide-react";
import ActionToast from "../components/ActionToast";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import usePortalData from "../hooks/usePortalData";
import { deleteWorkshop, saveWorkshop, setWorkshopStatusOverride, updateWorkshop } from "../utils/portalStorage";

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

const getActionButtonStyle = ({ tone = "neutral", emphasis = "secondary" } = {}) => {
  const tones = {
    neutral: {
      color: "#334155",
      border: "rgba(148,163,184,0.26)",
      background: "#ffffff",
      accentBg: "rgba(241,245,249,0.92)",
    },
    primary: {
      color: "#1d4ed8",
      border: "rgba(37,99,235,0.24)",
      background: "#ffffff",
      accentBg: "rgba(219,234,254,0.86)",
    },
    success: {
      color: "#0f766e",
      border: "rgba(15,118,110,0.22)",
      background: "#ffffff",
      accentBg: "rgba(204,251,241,0.9)",
    },
    warning: {
      color: "#7c3aed",
      border: "rgba(124,58,237,0.2)",
      background: "#ffffff",
      accentBg: "rgba(237,233,254,0.9)",
    },
    danger: {
      color: "#b91c1c",
      border: "rgba(220,38,38,0.2)",
      background: "#ffffff",
      accentBg: "rgba(254,226,226,0.92)",
    },
  };

  const current = tones[tone] || tones.neutral;

  return {
    height: 42,
    padding: emphasis === "secondary" ? "0 14px" : "0 16px",
    borderRadius: 12,
    border: `1px solid ${current.border}`,
    background: emphasis === "ghost" ? "transparent" : current.accentBg,
    color: current.color,
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    boxShadow: "none",
    transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
  };
};

const Workshops = () => {
  const { portalData, loading, error } = usePortalData();
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [toast, setToast] = useState({ message: "", tone: "success" });
  const [editingWorkshopId, setEditingWorkshopId] = useState(null);
  const [workshopPendingDelete, setWorkshopPendingDelete] = useState(null);
  const [workshopForm, setWorkshopForm] = useState({
    title: "",
    type_name: "",
    customType: "",
    date: "",
    duration: "",
    instructor: "",
    mode: "Online",
    target_audience: "",
    state_name: "",
    institute_name: "",
    notes: "",
  });

  const workshopTypeNames = useMemo(
    () => [...new Set((portalData.workshop_types ?? []).map((item) => item.name))],
    [portalData.workshop_types]
  );
  const canManageWorkshops = user?.role === "Coordinator" || user?.role === "Admin";
  const isAdmin = user?.role === "Admin";

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

  const handleWorkshopSubmit = (e) => {
    e.preventDefault();
    const finalType = workshopForm.type_name === "Other" ? workshopForm.customType.trim() : workshopForm.type_name;

    const payload = {
      title: workshopForm.title,
      type_name: finalType,
      date: workshopForm.date,
      duration: Number(workshopForm.duration),
      instructor: workshopForm.instructor,
      coordinator: user?.name || "Coordinator",
      mode: workshopForm.mode,
      target_audience: workshopForm.target_audience,
      state_name: workshopForm.state_name,
      institute_name: workshopForm.institute_name,
      notes: workshopForm.notes,
      status: "Pending",
    };

    if (editingWorkshopId) {
      updateWorkshop(editingWorkshopId, payload);
    } else {
      saveWorkshop(payload);
    }

    setWorkshopForm({
      title: "",
      type_name: "",
      customType: "",
      date: "",
      duration: "",
      instructor: "",
      mode: "Online",
      target_audience: "",
      state_name: "",
      institute_name: "",
      notes: "",
    });
    setEditingWorkshopId(null);
    setToast({
      message: editingWorkshopId
        ? "Workshop draft updated."
        : "Workshop draft added for the coordinator and shown in the list with pending status.",
      tone: editingWorkshopId ? "info" : "success",
    });
  };

  const startEditingWorkshop = (workshop) => {
    const knownType = workshopTypeNames.includes(workshop.type_name);
    setEditingWorkshopId(workshop.id);
    setWorkshopForm({
      title: workshop.title || "",
      type_name: knownType ? workshop.type_name : "Other",
      customType: knownType ? "" : workshop.type_name || "",
      date: workshop.date || "",
      duration: String(workshop.duration || ""),
      instructor: workshop.instructor || "",
      mode: workshop.mode || "Online",
      target_audience: workshop.target_audience || "",
      state_name: workshop.state_name || "",
      institute_name: workshop.institute_name || "",
      notes: workshop.notes || "",
    });
    setToast({ message: `Editing "${workshop.title}"`, tone: "info" });
  };

  const resetWorkshopForm = () => {
    setEditingWorkshopId(null);
    setWorkshopForm({
      title: "",
      type_name: "",
      customType: "",
      date: "",
      duration: "",
      instructor: "",
      mode: "Online",
      target_audience: "",
      state_name: "",
      institute_name: "",
      notes: "",
    });
  };

  const confirmDeleteWorkshop = () => {
    if (!workshopPendingDelete) {
      return;
    }

    deleteWorkshop(workshopPendingDelete.id);
    if (editingWorkshopId === workshopPendingDelete.id) {
      resetWorkshopForm();
    }
    setToast({ message: `Workshop "${workshopPendingDelete.title}" deleted.`, tone: "danger" });
    setWorkshopPendingDelete(null);
  };

  const handleAdminStatusChange = (workshop, status, message, tone) => {
    setWorkshopStatusOverride(workshop.id, status);
    setToast({ message, tone });
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
          WORKSHOPS
        </p>
        <h1 style={{ margin: "10px 0 12px", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "var(--shell-text)" }}>
          Workshop list
        </h1>
        <p style={{ margin: 0, color: "var(--muted-text)", lineHeight: 1.7, maxWidth: 720 }}>
          View currently available workshops, assigned instructors, coordinators, and scheduled dates.
        </p>
      </motion.section>

      {canManageWorkshops ? (
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
            <h3 style={{ margin: 0, color: "var(--shell-text)", fontSize: "1.35rem" }}>Coordinator Workshop Setup</h3>
          </div>
          <p style={{ margin: "0 0 18px", color: "var(--muted-text)", lineHeight: 1.65 }}>
            Add a workshop with type, instructor, mode, target audience, location, institute, and planning notes. New coordinator entries start as pending.
          </p>

          <form
            onSubmit={handleWorkshopSubmit}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
            }}
          >
            <input
              value={workshopForm.title}
              onChange={(e) => setWorkshopForm((current) => ({ ...current, title: e.target.value }))}
              placeholder="Workshop title"
              required
              style={inputStyle}
            />
            <select
              value={workshopForm.type_name}
              onChange={(e) => setWorkshopForm((current) => ({ ...current, type_name: e.target.value }))}
              required
              style={inputStyle}
            >
              <option value="">Select workshop type</option>
              {workshopTypeNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
            <input
              type="date"
              value={workshopForm.date}
              onChange={(e) => setWorkshopForm((current) => ({ ...current, date: e.target.value }))}
              required
              style={inputStyle}
            />
            <input
              type="number"
              min="1"
              value={workshopForm.duration}
              onChange={(e) => setWorkshopForm((current) => ({ ...current, duration: e.target.value }))}
              placeholder="Duration in days"
              required
              style={inputStyle}
            />
            {workshopForm.type_name === "Other" ? (
              <input
                value={workshopForm.customType}
                onChange={(e) => setWorkshopForm((current) => ({ ...current, customType: e.target.value }))}
                placeholder="Enter custom workshop type"
                required
                style={inputStyle}
              />
            ) : null}
            <input
              value={workshopForm.instructor}
              onChange={(e) => setWorkshopForm((current) => ({ ...current, instructor: e.target.value }))}
              placeholder="Instructor name"
              required
              style={inputStyle}
            />
            <select
              value={workshopForm.mode}
              onChange={(e) => setWorkshopForm((current) => ({ ...current, mode: e.target.value }))}
              style={inputStyle}
            >
              {["Online", "Offline", "Hybrid"].map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
            <input
              value={workshopForm.target_audience}
              onChange={(e) => setWorkshopForm((current) => ({ ...current, target_audience: e.target.value }))}
              placeholder="Target audience"
              required
              style={inputStyle}
            />
            <input
              value={workshopForm.state_name}
              onChange={(e) => setWorkshopForm((current) => ({ ...current, state_name: e.target.value }))}
              placeholder="State / Region"
              required
              style={inputStyle}
            />
            <input
              value={workshopForm.institute_name}
              onChange={(e) => setWorkshopForm((current) => ({ ...current, institute_name: e.target.value }))}
              placeholder="Institute / Organization"
              required
              style={inputStyle}
            />
            <textarea
              value={workshopForm.notes}
              onChange={(e) => setWorkshopForm((current) => ({ ...current, notes: e.target.value }))}
              placeholder="Planning notes, requirements, resources, lab setup, or follow-up details"
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
              {editingWorkshopId ? "Update Workshop" : "Add Workshop"}
            </button>
            {editingWorkshopId ? (
              <button
                type="button"
                onClick={resetWorkshopForm}
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
                      Scheduled for {formatDate(workshop.date)} · {workshop.duration} day(s)
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
                    { icon: Hourglass, label: "Type", value: workshop.type_name || "General" },
                    { icon: MapPin, label: "Location", value: workshop.state_name || workshop.mode || "Not specified" },
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

                {(workshop.target_audience || workshop.institute_name || workshop.notes) ? (
                  <div
                    style={{
                      marginTop: 14,
                      padding: 16,
                      borderRadius: 18,
                      background: isDark ? "rgba(15,23,42,0.68)" : "rgba(248,250,252,0.92)",
                      border: "1px solid var(--panel-border)",
                      display: "grid",
                      gap: 8,
                    }}
                  >
                    {workshop.target_audience ? (
                      <div style={{ color: "var(--muted-text)", lineHeight: 1.6 }}>
                        <strong style={{ color: "var(--shell-text)" }}>Audience:</strong> {workshop.target_audience}
                      </div>
                    ) : null}
                    {workshop.institute_name ? (
                      <div style={{ color: "var(--muted-text)", lineHeight: 1.6 }}>
                        <strong style={{ color: "var(--shell-text)" }}>Institute:</strong> {workshop.institute_name}
                      </div>
                    ) : null}
                    {workshop.notes ? (
                      <div style={{ color: "var(--muted-text)", lineHeight: 1.6 }}>
                        <strong style={{ color: "var(--shell-text)" }}>Notes:</strong> {workshop.notes}
                      </div>
                    ) : null}
                  </div>
                ) : null}

                    {canManageWorkshops && workshop.id?.startsWith("custom-workshop-") ? (
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
                    <button
                      type="button"
                      onClick={() => startEditingWorkshop(workshop)}
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
                      onClick={() => setWorkshopPendingDelete(workshop)}
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

                {isAdmin ? (
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
                    <button
                      type="button"
                      onClick={() =>
                        handleAdminStatusChange(workshop, "Accepted", `Workshop "${workshop.title}" accepted.`, "success")
                      }
                      style={{
                        flex: 1,
                        minWidth: 120,
                        ...getActionButtonStyle({ tone: "success" }),
                      }}
                    >
                      <CheckCircle2 size={15} />
                      Accept
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleAdminStatusChange(workshop, "Pending", `Workshop "${workshop.title}" kept pending.`, "info")
                      }
                      style={{
                        flex: 1,
                        minWidth: 120,
                        ...getActionButtonStyle({ tone: "warning" }),
                      }}
                    >
                      <ShieldCheck size={15} />
                      Keep Pending
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleAdminStatusChange(workshop, "Deleted", `Workshop "${workshop.title}" rejected.`, "danger")
                      }
                      style={{
                        flex: 1,
                        minWidth: 120,
                        ...getActionButtonStyle({ tone: "danger" }),
                      }}
                    >
                      <XCircle size={15} />
                      Reject
                    </button>
                  </div>
                ) : null}
              </motion.div>
            );
          })
        )}
      </div>

      {workshopPendingDelete ? (
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
              maxWidth: 440,
              padding: 24,
              borderRadius: 24,
              background: "var(--panel-strong)",
              border: "1px solid var(--panel-border)",
              boxShadow: "var(--shadow-strong)",
            }}
          >
            <h3 style={{ margin: 0, color: "var(--shell-text)" }}>Delete workshop?</h3>
            <p style={{ margin: "12px 0 0", color: "var(--muted-text)", lineHeight: 1.65 }}>
              This will remove <strong style={{ color: "var(--shell-text)" }}>{workshopPendingDelete.title}</strong>
              {" "}from the coordinator-created workshop list.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <button
                type="button"
                onClick={() => setWorkshopPendingDelete(null)}
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
                onClick={confirmDeleteWorkshop}
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

export default Workshops;
