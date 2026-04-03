import {
  BarChart3,
  BookOpenText,
  Home,
  Layers3,
  LogOut,
  PanelLeftOpen,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const navGroups = [
  {
    title: "Overview",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: Home, hint: "Home" },
      { to: "/workshops", label: "Workshop List", icon: Layers3, hint: "Browse" },
    ],
  },
  {
    title: "Portal",
    items: [
      { to: "/resources", label: "Workshop Types", icon: BookOpenText, hint: "Categories" },
      { to: "/insights", label: "Statistics", icon: BarChart3, hint: "Reports" },
      { to: "/profile", label: "My Profile", icon: UserRound, hint: "Account" },
    ],
  },
];

const sidebarMotion = {
  hidden: { x: -18, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const groupMotion = {
  hidden: { opacity: 0, y: 10 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * index, duration: 0.35, ease: "easeOut" },
  }),
};

const Sidebar = () => {
  const { logout, user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 960 : false
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handleResize = () => setIsMobile(window.innerWidth < 960);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return null;
  }

  return (
    <motion.aside
      variants={sidebarMotion}
      initial="hidden"
      animate="visible"
      style={{
        width: 284,
        minHeight: "100vh",
        padding: "22px 18px 20px",
        background: "var(--sidebar-bg)",
        borderRight: "1px solid var(--sidebar-border)",
        color: "var(--shell-text)",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        position: "relative",
        overflow: "hidden",
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "0 auto auto 0",
          width: 180,
          height: 180,
          background: isDark
            ? "radial-gradient(circle, rgba(96,165,250,0.16) 0%, rgba(96,165,250,0) 72%)"
            : "radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(59,130,246,0) 72%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{
          position: "relative",
          padding: 18,
          borderRadius: 26,
          background: "var(--panel-bg)",
          border: "1px solid var(--soft-border)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <motion.div
          whileHover={{ rotate: -4, scale: 1.04 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          style={{
            width: 52,
            height: 52,
            borderRadius: 18,
            background: isDark
              ? "linear-gradient(135deg, rgba(30,41,59,0.96), rgba(15,23,42,0.86))"
              : "linear-gradient(135deg, #dbeafe, #eff6ff)",
            color: "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 14,
            border: isDark
              ? "1px solid rgba(96,165,250,0.18)"
              : "1px solid rgba(147,197,253,0.55)",
          }}
        >
          <PanelLeftOpen size={20} />
        </motion.div>

        <h2 style={{ margin: 0, fontSize: "1.28rem", lineHeight: 1.2, fontWeight: 800, color: "var(--shell-text)" }}>
          Workshop Portal
        </h2>
        <p style={{ margin: "8px 0 0", color: "var(--secondary-text)", lineHeight: 1.6, fontSize: 14 }}>
          A simpler way to manage workshops, categories, and account details.
        </p>
      </motion.div>

      <div style={{ display: "grid", gap: 16 }}>
        {navGroups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            custom={groupIndex}
            variants={groupMotion}
            initial="hidden"
            animate="visible"
          >
            <p
              style={{
                margin: "0 0 10px",
                paddingLeft: 8,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted-text)",
              }}
            >
              {group.title}
            </p>

            <div style={{ display: "grid", gap: 6 }}>
              {group.items.map(({ to, label, icon: Icon, hint }) => {
                const active = location.pathname === to;

                return (
                  <motion.div
                    key={label}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  >
                    <Link
                      to={to}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        padding: "12px 12px 12px 10px",
                        borderRadius: 18,
                        textDecoration: "none",
                        color: "var(--shell-text)",
                        background: active ? "var(--panel-strong)" : "transparent",
                        border: active
                          ? isDark
                            ? "1px solid rgba(96,165,250,0.28)"
                            : "1px solid rgba(191,219,254,0.95)"
                          : "1px solid transparent",
                        boxShadow: active ? "var(--shadow-soft)" : "none",
                        transition:
                          "background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {active && (
                        <motion.div
                          layoutId="sidebar-active-pill"
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 10,
                            bottom: 10,
                            width: 4,
                            borderRadius: 999,
                            background: "linear-gradient(180deg, #2563eb, #60a5fa)",
                          }}
                        />
                      )}

                      <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                        <motion.div
                          animate={
                            active
                              ? { backgroundColor: "var(--accent-soft)", color: "var(--accent)", scale: 1.03 }
                              : { backgroundColor: "var(--hover-surface)", color: "var(--muted-text)", scale: 1 }
                          }
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 14,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: active
                              ? isDark
                                ? "1px solid rgba(96,165,250,0.28)"
                                : "1px solid rgba(147,197,253,0.75)"
                              : "1px solid var(--soft-border)",
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={18} />
                        </motion.div>

                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: active ? 800 : 700, fontSize: 14.5 }}>{label}</div>
                          <div style={{ fontSize: 12, color: "var(--muted-text)", marginTop: 2 }}>
                            {active ? "You are here" : hint}
                          </div>
                        </div>
                      </div>

                      <motion.span
                        animate={
                          active
                            ? { backgroundColor: "var(--accent-soft)", color: "var(--accent)" }
                            : { backgroundColor: "var(--hover-surface)", color: "var(--muted-text)" }
                        }
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        style={{
                          padding: "6px 10px",
                          borderRadius: 999,
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.02em",
                          border: "1px solid var(--soft-border)",
                          flexShrink: 0,
                        }}
                      >
                        {hint}
                      </motion.span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{
          padding: 16,
          borderRadius: 22,
          background: "var(--panel-bg)",
          border: "1px solid var(--soft-border)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 16,
              background: isDark
                ? "linear-gradient(135deg, rgba(30,41,59,0.96), rgba(15,23,42,0.86))"
                : "linear-gradient(135deg, #e0f2fe, #eff6ff)",
              color: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: isDark
                ? "1px solid rgba(96,165,250,0.18)"
                : "1px solid rgba(186,230,253,0.95)",
              flexShrink: 0,
            }}
          >
            <ShieldCheck size={19} />
          </div>

          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 800, color: "var(--shell-text)" }}>{user?.name || "Student"}</div>
            <div
              style={{
                fontSize: 12,
                color: "var(--muted-text)",
                marginTop: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user?.email || "portal user"}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{
          marginTop: "auto",
          padding: 16,
          borderRadius: 22,
          background: "var(--panel-muted)",
          border: "1px solid var(--soft-border)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, color: "var(--secondary-text)" }}>
          <LogOut size={16} />
          <strong style={{ fontSize: 14 }}>Sign out</strong>
        </div>
        <p style={{ margin: "0 0 14px", color: "var(--muted-text)", lineHeight: 1.55, fontSize: 13 }}>
          End the current session and return to the login screen.
        </p>
        <motion.button
          type="button"
          whileHover={{ y: -1, backgroundColor: "#0f172a", color: "#ffffff" }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={() => {
            logout();
            navigate("/login");
          }}
          style={{
            width: "100%",
            height: 46,
            borderRadius: 15,
            border: "1px solid var(--soft-border)",
            background: "var(--panel-strong)",
            color: "var(--shell-text)",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            cursor: "pointer",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <LogOut size={15} />
          Logout
        </motion.button>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;
