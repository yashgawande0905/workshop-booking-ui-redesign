import { BarChart3, BookOpenText, Home, Layers3, UserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/workshops", label: "Workshops", icon: Layers3 },
  { to: "/resources", label: "Resources", icon: BookOpenText },
  { to: "/insights", label: "Insights", icon: BarChart3 },
  { to: "/profile", label: "Profile", icon: UserRound },
];

const MobileNav = () => {
  const location = useLocation();

  return (
    <nav
      style={{
        position: "fixed",
        left: 12,
        right: 12,
        bottom: 12,
        zIndex: 40,
        padding: "10px 8px",
        borderRadius: 24,
        background: "rgba(15,23,42,0.92)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 22px 50px rgba(15,23,42,0.24)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 6,
          alignItems: "stretch",
        }}
      >
        {items.map(({ to, label, icon: Icon }) => {
          const active = location.pathname === to;

          return (
            <Link
              key={to}
              to={to}
              style={{
                minHeight: 60,
                borderRadius: 18,
                textDecoration: "none",
                color: active ? "#ffffff" : "rgba(255,255,255,0.72)",
                background: active ? "linear-gradient(135deg, #2563eb, #60a5fa)" : "transparent",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.02em",
              }}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
