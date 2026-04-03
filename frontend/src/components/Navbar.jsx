import { Bell, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
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

  return (
    <header
      style={{
        padding: isMobile ? "14px 14px" : "18px 16px",
        borderBottom: "1px solid rgba(148,163,184,0.18)",
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(16px)",
        position: "sticky",
        top: 0,
        zIndex: 20,
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
              color: "#2563eb",
              letterSpacing: "0.05em",
            }}
          >
            IITB WORKSHOP PORTAL
          </p>
          <h2
            style={{
              margin: "6px 0 0",
              fontSize: isMobile ? "1.1rem" : "1.45rem",
              color: "#0f172a",
              lineHeight: 1.2,
            }}
          >
            Welcome back, {user?.name || "Student"}
          </h2>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            type="button"
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              border: "1px solid rgba(148,163,184,0.22)",
              background: "rgba(255,255,255,0.92)",
              color: "#475569",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
              cursor: "pointer",
            }}
          >
            <Bell size={18} />
          </button>

          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/login");
            }}
            style={{
              height: 42,
              padding: isMobile ? "0 12px" : "0 16px",
              borderRadius: 14,
              border: "none",
              background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
              color: "#fff",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              boxShadow: "0 10px 26px rgba(37,99,235,0.28)",
            }}
          >
            <LogOut size={16} />
            {!isMobile && "Logout"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
