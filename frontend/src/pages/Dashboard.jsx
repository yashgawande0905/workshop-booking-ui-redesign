import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck2, Clock3, Layers3, Trash2, UserPlus, Users } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ActionToast from "../components/ActionToast";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { getProfessionsForRole, roleOptions } from "../data/userRoles";
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
  const { user, accounts, createAccount, removeAccount } = useAuth();
  const { isDark } = useTheme();
  const { portalData: dashboardData, loading, error } = usePortalData();
  const isAdmin = user?.role === "Admin";
  const adminRoleOptions = roleOptions;
  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Coordinator",
    profession: "Faculty Coordinator",
    customProfession: "",
    institute: "",
    department: "",
    phone: "",
  });
  const [toast, setToast] = useState({ message: "", tone: "success" });

  const accountSummaryCards = [
    {
      label: "Registered Students",
      value: accounts.filter((item) => item.role === "Student").length,
      accent: "#2563eb",
    },
    {
      label: "Registered Faculty",
      value: accounts.filter((item) => /faculty/i.test(item.profession || "")).length,
      accent: "#0f766e",
    },
    {
      label: "Registered Coordinators",
      value: accounts.filter((item) => item.role === "Coordinator").length,
      accent: "#7c3aed",
    },
  ];

  const chartData = dashboardData.workshop_types.map((item) => ({
    name: item.name.length > 16 ? `${item.name.slice(0, 16)}...` : item.name,
    duration: item.duration,
  }));
  const adminProfessionOptions = useMemo(
    () => getProfessionsForRole(adminForm.role),
    [adminForm.role]
  );

  const adminInputStyle = {
    width: "100%",
    height: 46,
    padding: "0 14px",
    borderRadius: 14,
    border: "1px solid var(--panel-border)",
    background: isDark ? "rgba(15,23,42,0.72)" : "#ffffff",
    color: "var(--shell-text)",
    outline: "none",
    boxSizing: "border-box",
  };

  const handleAdminField = (field, value) => {
    setAdminForm((current) => {
      const next = { ...current, [field]: value };
      if (field === "role") {
        next.profession = getProfessionsForRole(value)[0];
        next.customProfession = "";
      }
      return next;
    });
  };

  const handleAdminCreate = (e) => {
    e.preventDefault();
    const finalProfession =
      adminForm.profession === "Other" ? adminForm.customProfession.trim() : adminForm.profession;

    if (!finalProfession) {
      setToast({ message: "Please enter the profession or title.", tone: "danger" });
      return;
    }

    const result = createAccount({
      name: adminForm.name,
      email: adminForm.email,
      password: adminForm.password,
      role: adminForm.role,
      profession: finalProfession,
      institute: adminForm.institute,
      department: adminForm.department,
      phone: adminForm.phone,
    });

    if (!result.ok) {
      setToast({ message: result.message, tone: "danger" });
      return;
    }

    setAdminForm({
      name: "",
      email: "",
      password: "",
      role: "Coordinator",
      profession: "Faculty Coordinator",
      customProfession: "",
      institute: "",
      department: "",
      phone: "",
    });
    setToast({ message: `${result.account.name} added successfully.`, tone: "success" });
  };

  const handleAdminRemove = (accountId, accountName) => {
    const result = removeAccount(accountId);
    setToast({
      message: result.ok ? `${accountName} removed successfully.` : result.message,
      tone: result.ok ? "danger" : "danger",
    });
  };

  return (
    <div style={{ maxWidth: 1220, margin: "0 auto" }}>
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: "28px 24px",
          borderRadius: 28,
          background: "var(--panel-strong)",
          border: "1px solid var(--panel-border)",
          boxShadow: "var(--shadow-strong)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <p style={{ margin: 0, fontSize: 13, fontWeight: 800, letterSpacing: "0.06em", color: "var(--accent)" }}>
            DASHBOARD
          </p>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 18,
              background: isDark ? "rgba(15,23,42,0.72)" : "rgba(255,255,255,0.92)",
              border: "1px solid var(--panel-border)",
              boxShadow: "var(--shadow-soft)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <img
              src="/iitb-logo.png"
              alt="IIT Bombay logo"
              style={{
                width: 34,
                height: 34,
                objectFit: "contain",
              }}
            />
          </div>
        </div>
        <h1
          style={{
            margin: "10px 0 12px",
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            lineHeight: 1.1,
            color: "var(--shell-text)",
          }}
        >
          Welcome, {user?.name || "Student"}.
        </h1>
        <p style={{ margin: 0, maxWidth: 760, lineHeight: 1.7, color: "var(--muted-text)" }}>
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
              background: "var(--panel-bg)",
              border: "1px solid var(--panel-border)",
              boxShadow: "var(--shadow-soft)",
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
            <p style={{ margin: 0, color: "var(--muted-text)", fontWeight: 600 }}>{label}</p>
            <h2 style={{ margin: "8px 0 0", fontSize: "2.1rem", color: "var(--shell-text)" }}>
              {loading ? "--" : dashboardData.stats[key] ?? 0}
            </h2>
          </motion.div>
        ))}
      </section>

      {isAdmin ? (
        <>
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 18,
              marginTop: 22,
            }}
          >
            {accountSummaryCards.map(({ label, value, accent }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + index * 0.05 }}
                style={{
                  padding: 22,
                  borderRadius: 26,
                  background: "var(--panel-bg)",
                  border: "1px solid var(--panel-border)",
                  boxShadow: "var(--shadow-soft)",
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
                  <Users size={22} />
                </div>
                <p style={{ margin: 0, color: "var(--muted-text)", fontWeight: 600 }}>{label}</p>
                <h2 style={{ margin: "8px 0 0", fontSize: "2.1rem", color: "var(--shell-text)" }}>{value}</h2>
              </motion.div>
            ))}
          </section>

          <section
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(320px, 420px) minmax(0, 1fr)",
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
                background: "var(--panel-bg)",
                border: "1px solid var(--panel-border)",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <UserPlus size={20} color="#2563eb" />
                <h3 style={{ margin: 0, color: "var(--shell-text)", fontSize: "1.35rem" }}>Admin User Setup</h3>
              </div>
              <p style={{ margin: "0 0 18px", color: "var(--muted-text)", lineHeight: 1.65 }}>
                Add students, coordinators, faculty coordinators, or another admin from here.
              </p>
              <form
                onSubmit={handleAdminCreate}
                style={{
                  display: "grid",
                  gap: 12,
                }}
              >
                <input value={adminForm.name} onChange={(e) => handleAdminField("name", e.target.value)} placeholder="Full name" required style={adminInputStyle} />
                <input type="email" value={adminForm.email} onChange={(e) => handleAdminField("email", e.target.value)} placeholder="Email" required style={adminInputStyle} />
                <input type="password" value={adminForm.password} onChange={(e) => handleAdminField("password", e.target.value)} placeholder="Password" required style={adminInputStyle} />
                <select value={adminForm.role} onChange={(e) => handleAdminField("role", e.target.value)} style={adminInputStyle}>
                  {adminRoleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.title}
                    </option>
                  ))}
                </select>
                <select value={adminForm.profession} onChange={(e) => handleAdminField("profession", e.target.value)} style={adminInputStyle}>
                  {adminProfessionOptions.map((profession) => (
                    <option key={profession} value={profession}>
                      {profession}
                    </option>
                  ))}
                </select>
                {adminForm.profession === "Other" ? (
                  <input value={adminForm.customProfession} onChange={(e) => handleAdminField("customProfession", e.target.value)} placeholder="Custom profession / title" required style={adminInputStyle} />
                ) : null}
                <input value={adminForm.phone} onChange={(e) => handleAdminField("phone", e.target.value)} placeholder="Phone number" required style={adminInputStyle} />
                <input value={adminForm.institute} onChange={(e) => handleAdminField("institute", e.target.value)} placeholder="Institute / Organization" required style={adminInputStyle} />
                <input value={adminForm.department} onChange={(e) => handleAdminField("department", e.target.value)} placeholder="Department / Area" required style={adminInputStyle} />
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
                  }}
                >
                  Add User
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              style={{
                padding: 24,
                borderRadius: 28,
                background: "var(--panel-bg)",
                border: "1px solid var(--panel-border)",
                boxShadow: "var(--shadow-soft)",
                overflowX: "auto",
              }}
            >
              <h3 style={{ margin: 0, color: "var(--shell-text)", fontSize: "1.35rem" }}>Registered Users</h3>
              <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
                {accounts.map((account) => (
                  <div
                    key={account.id}
                    style={{
                      padding: 16,
                      borderRadius: 18,
                      background: "var(--panel-muted)",
                      border: "1px solid var(--panel-border)",
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 16,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <div style={{ color: "var(--shell-text)", fontWeight: 800 }}>{account.name}</div>
                      <div style={{ color: "var(--muted-text)", marginTop: 4, lineHeight: 1.55 }}>
                        {account.role} · {account.profession} · {account.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={account.id === user?.id}
                      onClick={() => handleAdminRemove(account.id, account.name)}
                      style={{
                        height: 42,
                        padding: "0 14px",
                        borderRadius: 12,
                        border: "1px solid rgba(220,38,38,0.22)",
                        background: account.id === user?.id ? "rgba(148,163,184,0.22)" : "rgba(254,242,242,0.9)",
                        color: account.id === user?.id ? "#94a3b8" : "#dc2626",
                        fontWeight: 700,
                        cursor: account.id === user?.id ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                      }}
                    >
                      <Trash2 size={15} />
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        </>
      ) : null}

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
            background: "var(--panel-bg)",
            border: "1px solid var(--panel-border)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "var(--accent)", letterSpacing: "0.05em" }}>
                WORKSHOPS
              </p>
              <h3 style={{ margin: "8px 0 0", fontSize: "1.4rem", color: "var(--shell-text)" }}>
                Recent workshops
              </h3>
            </div>
          </div>

          <div style={{ display: "grid", gap: 14, marginTop: 20 }}>
            {loading ? (
              <div style={{ color: "var(--muted-text)", fontWeight: 600 }}>Loading workshops...</div>
            ) : (
              dashboardData.workshops.map((item) => (
                <div
                  key={`${item.id}-${item.date}`}
                  style={{
                    padding: 18,
                    borderRadius: 22,
                    border: "1px solid var(--panel-border)",
                    background: isDark
                      ? "linear-gradient(180deg, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.76) 100%)"
                      : "linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)",
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
                      <h4 style={{ margin: 0, fontSize: "1.08rem", color: "var(--shell-text)" }}>{item.title}</h4>
                      <p style={{ margin: "8px 0 0", color: "var(--muted-text)", lineHeight: 1.6 }}>
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
                        background: "var(--panel-strong)",
                        border: "1px solid var(--panel-border)",
                      }}
                    >
                      <p style={{ margin: 0, fontSize: 12, color: "var(--muted-text)", fontWeight: 700 }}>
                        COORDINATOR
                      </p>
                      <p style={{ margin: "6px 0 0", color: "var(--shell-text)", fontWeight: 700 }}>
                        {item.coordinator}
                      </p>
                    </div>
                    <div
                      style={{
                        padding: "12px 14px",
                        borderRadius: 16,
                        background: "var(--panel-strong)",
                        border: "1px solid var(--panel-border)",
                      }}
                    >
                      <p style={{ margin: 0, fontSize: 12, color: "var(--muted-text)", fontWeight: 700 }}>
                        INSTRUCTOR
                      </p>
                      <p style={{ margin: "6px 0 0", color: "var(--shell-text)", fontWeight: 700 }}>
                        {item.instructor}
                      </p>
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
            background: "var(--panel-bg)",
            border: "1px solid var(--panel-border)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "var(--accent)", letterSpacing: "0.05em" }}>
            WORKSHOP TYPES
          </p>
          <h3 style={{ margin: "8px 0 0", fontSize: "1.4rem", color: "var(--shell-text)" }}>
            Available workshop types
          </h3>

          <div style={{ width: "100%", height: 260, marginTop: 20 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={isDark ? "rgba(148,163,184,0.2)" : "#e2e8f0"}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: isDark ? "#94a3b8" : "#64748b", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: isDark ? "#94a3b8" : "#64748b", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
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
                  background: "var(--panel-muted)",
                  border: "1px solid var(--panel-border)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                  <h4 style={{ margin: 0, fontSize: "1rem", color: "var(--shell-text)" }}>{item.name}</h4>
                  <div style={{ color: "var(--accent)", fontWeight: 800 }}>{item.duration} day(s)</div>
                </div>
                <p style={{ margin: "8px 0 0", color: "var(--muted-text)", lineHeight: 1.6 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
      <ActionToast
        message={toast.message}
        tone={toast.tone}
        onClose={() => setToast({ message: "", tone: "success" })}
      />
    </div>
  );
};

export default Dashboard;
