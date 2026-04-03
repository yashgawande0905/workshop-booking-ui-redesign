import { Bell, LogOut, Moon, SunMedium } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import usePortalData from "../hooks/usePortalData";

const formatDate = (dateValue) => {
  const date = new Date(dateValue);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

const Navbar = () => {
  const { logout, user } = useAuth();
  const { theme, isDark, toggleTheme } = useTheme();
  const { portalData } = usePortalData();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 960 : false
  );
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handleResize = () => setIsMobile(window.innerWidth < 960);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = useMemo(() => {
    const items = [];
    const pendingCount = portalData?.stats?.pending_workshops ?? 0;
    const workshopTypes = portalData?.stats?.workshop_types ?? 0;
    const upcomingWorkshop = portalData?.workshops?.[0];

    if (pendingCount > 0) {
      items.push({
        id: "pending",
        title: `${pendingCount} pending request${pendingCount > 1 ? "s" : ""}`,
        text: "Review the latest workshop proposals waiting for approval.",
        to: user?.role === "Admin" ? "/workshops" : "/dashboard",
      });
    }

    if (upcomingWorkshop) {
      items.push({
        id: "upcoming",
        title: `${upcomingWorkshop.title} is coming up`,
        text: `${formatDate(upcomingWorkshop.date)} with ${upcomingWorkshop.coordinator}`,
        to: "/workshops",
      });
    }

    if (workshopTypes > 0) {
      items.push({
        id: "types",
        title: `${workshopTypes} workshop type${workshopTypes > 1 ? "s" : ""} available`,
        text: "The catalog is ready for new workshop bookings.",
        to: "/resources",
      });
    }

    return items.slice(0, 3);
  }, [portalData, user?.role]);

  const handleNotificationClick = (destination) => {
    setShowNotifications(false);
    navigate(destination);
  };

  return (
    <header
      style={{
        padding: isMobile ? "14px 14px" : "18px 16px",
        borderBottom: "1px solid var(--panel-border)",
        background: "var(--nav-bg)",
        backdropFilter: "blur(18px)",
        position: "sticky",
        top: 0,
        zIndex: 20,
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontSize: isMobile ? 11 : 13,
              fontWeight: 800,
              color: "var(--accent)",
              letterSpacing: "0.05em",
            }}
          >
            IITB WORKSHOP PORTAL
          </p>
          <h2
            style={{
              margin: "6px 0 0",
              fontSize: isMobile ? "1.1rem" : "1.45rem",
              color: "var(--shell-text)",
              lineHeight: 1.2,
            }}
          >
            Welcome back, {user?.name || "Student"}
          </h2>
          <p style={{ margin: "6px 0 0", color: "var(--muted-text)", fontWeight: 700, fontSize: 12.5 }}>
            {user?.role || "Student"} · {user?.profession || "Portal user"}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              border: "1px solid var(--panel-border)",
              background: "var(--panel-strong)",
              color: "var(--shell-text)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "var(--shadow-soft)",
              cursor: "pointer",
              transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
            }}
          >
            {isDark ? <SunMedium size={18} /> : <Moon size={18} />}
          </motion.button>

          <div ref={notificationRef} style={{ position: "relative" }}>
            <motion.button
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowNotifications((current) => !current)}
              aria-label="Open notifications"
              style={{
                width: 42,
                height: 42,
                borderRadius: 14,
                border: "1px solid var(--panel-border)",
                background: "var(--panel-strong)",
                color: "var(--shell-text)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "var(--shadow-soft)",
                cursor: "pointer",
                position: "relative",
                transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
              }}
            >
              <Bell size={18} />
              {notifications.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 7,
                    right: 7,
                    minWidth: 16,
                    height: 16,
                    padding: "0 4px",
                    borderRadius: 999,
                    background: "#ef4444",
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {notifications.length}
                </span>
              )}
            </motion.button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    top: 52,
                    right: 0,
                    width: isMobile ? 280 : 320,
                    padding: 14,
                    borderRadius: 22,
                    background: "var(--panel-strong)",
                    border: "1px solid var(--soft-border)",
                    boxShadow: "var(--shadow-strong)",
                    zIndex: 30,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      marginBottom: 10,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, color: "var(--shell-text)" }}>Notifications</div>
                      <div style={{ fontSize: 12, color: "var(--muted-text)", marginTop: 2 }}>
                        Recent portal updates
                      </div>
                    </div>
                    <span
                      style={{
                        padding: "6px 10px",
                        borderRadius: 999,
                        background: "var(--accent-soft)",
                        color: "var(--accent)",
                        fontSize: 11,
                        fontWeight: 800,
                      }}
                    >
                      {notifications.length || 0} new
                    </span>
                  </div>

                  <div style={{ display: "grid", gap: 10 }}>
                    {notifications.length > 0 ? (
                      notifications.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleNotificationClick(item.to)}
                          style={{
                            padding: "12px 13px",
                            borderRadius: 16,
                            background: "var(--panel-muted)",
                            border: "1px solid var(--panel-border)",
                            textAlign: "left",
                            cursor: "pointer",
                            width: "100%",
                          }}
                        >
                          <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--shell-text)" }}>
                            {item.title}
                          </div>
                          <div style={{ fontSize: 12.5, color: "var(--muted-text)", lineHeight: 1.55, marginTop: 4 }}>
                            {item.text}
                          </div>
                        </button>
                      ))
                    ) : (
                      <div
                        style={{
                          padding: "12px 13px",
                          borderRadius: 16,
                          background: "var(--panel-muted)",
                          border: "1px solid var(--panel-border)",
                          color: "var(--muted-text)",
                          fontSize: 13,
                          lineHeight: 1.55,
                        }}
                      >
                        No new notifications right now.
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              logout();
              navigate("/login");
            }}
            style={{
              height: 42,
              padding: isMobile ? "0 12px" : "0 16px",
              borderRadius: 14,
              border: "1px solid transparent",
              background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
              color: "#fff",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              boxShadow: isDark
                ? "0 12px 28px rgba(29,78,216,0.32)"
                : "0 10px 26px rgba(37,99,235,0.28)",
            }}
          >
            <LogOut size={16} />
            {!isMobile && "Logout"}
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
