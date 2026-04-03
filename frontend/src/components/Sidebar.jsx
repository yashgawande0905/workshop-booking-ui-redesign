import {
  BarChart3,
  BookOpenText,
  Home,
  Layers3,
  LogOut,
  PanelLeftOpen,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const navGroups = [
  {
    title: "Main",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: Home, badge: "Home" },
      { to: "/workshops", label: "Workshop List", icon: Layers3, badge: "List" },
    ],
  },
  {
    title: "Sections",
    items: [
      { to: "/resources", label: "Workshop Types", icon: BookOpenText, badge: "Types" },
      { to: "/insights", label: "Statistics", icon: BarChart3, badge: "Stats" },
      { to: "/profile", label: "My Profile", icon: UserRound, badge: "User" },
    ],
  },
];

const Sidebar = () => {
  const { logout, user } = useAuth();
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
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        width: 298,
        minHeight: "100vh",
        padding: 24,
        background:
          "linear-gradient(180deg, rgba(15,23,42,0.98) 0%, rgba(30,41,59,0.98) 18%, rgba(37,99,235,0.98) 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: 22,
        boxShadow: "0 24px 60px rgba(15,23,42,0.2)",
      }}
    >
      <div
        style={{
          padding: 18,
          borderRadius: 24,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 20,
            background: "rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <Sparkles size={24} />
        </div>
        <h2 style={{ margin: 0, fontSize: "1.6rem", lineHeight: 1.15 }}>FOSSEE Portal</h2>
        <p style={{ margin: "10px 0 0", color: "rgba(255,255,255,0.76)", lineHeight: 1.6 }}>
          Workshop booking, workshop types, and profile details in one place.
        </p>
      </div>

      <div style={{ display: "grid", gap: 18 }}>
        {navGroups.map((group) => (
          <div key={group.title}>
            <p
              style={{
                margin: "0 0 10px",
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.58)",
              }}
            >
              {group.title}
            </p>
            <div style={{ display: "grid", gap: 10 }}>
              {group.items.map(({ to, label, icon: Icon, badge }) => {
                const active = location.pathname === to;

                return (
                  <Link
                    key={label}
                    to={to}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      padding: "14px 16px",
                      borderRadius: 18,
                      textDecoration: "none",
                      color: "#fff",
                      background: active ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow: active ? "0 14px 30px rgba(15,23,42,0.18)" : "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: 14,
                          background: active ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.09)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800 }}>{label}</div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.62)" }}>
                          {active ? "Current page" : "Open"}
                        </div>
                      </div>
                    </div>
                    <span
                      style={{
                        padding: "6px 10px",
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.12)",
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {badge}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: 18,
          borderRadius: 22,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 18,
              background: "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.08))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShieldCheck size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 800 }}>{user?.name || "Student"}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.64)" }}>{user?.email || "portal user"}</div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "auto",
          padding: 18,
          borderRadius: 22,
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.14)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <PanelLeftOpen size={18} />
          <strong>Account</strong>
        </div>
        <p style={{ margin: "0 0 16px", color: "rgba(255,255,255,0.76)", lineHeight: 1.6 }}>
          Use this to sign out and return to the login page.
        </p>
        <button
          type="button"
          onClick={() => {
            logout();
            navigate("/login");
          }}
          style={{
            width: "100%",
            height: 48,
            borderRadius: 16,
            border: "none",
            background: "#ffffff",
            color: "#1d4ed8",
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            cursor: "pointer",
          }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
