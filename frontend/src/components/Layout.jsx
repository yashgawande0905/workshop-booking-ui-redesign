import { useEffect, useState } from "react";
import MobileNav from "./MobileNav";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useTheme } from "../context/ThemeContext";

const Layout = ({ children }) => {
  const { isDark } = useTheme();
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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "var(--shell-bg)",
        color: "var(--shell-text)",
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
        transition: "background 0.25s ease, color 0.25s ease",
      }}
    >
      <Sidebar />
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />
        <main
          style={{
            flex: 1,
            padding: isMobile ? "20px 14px 104px" : "24px 16px 32px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: isMobile ? 6 : 20,
              right: isMobile ? 6 : 20,
              width: isMobile ? 120 : 180,
              height: isMobile ? 120 : 180,
              borderRadius: "50%",
              background: isDark
                ? "radial-gradient(circle, rgba(96,165,250,0.16) 0%, rgba(96,165,250,0) 72%)"
                : "radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0) 72%)",
              pointerEvents: "none",
            }}
          />
          {children}
        </main>
      </div>
      {isMobile && <MobileNav />}
    </div>
  );
};

export default Layout;
