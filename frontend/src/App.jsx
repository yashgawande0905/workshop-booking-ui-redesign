import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Workshops = lazy(() => import("./pages/Workshops"));
const Resources = lazy(() => import("./pages/Resources"));
const Insights = lazy(() => import("./pages/Insights"));
const Profile = lazy(() => import("./pages/Profile"));

const PageLoader = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(180deg, #eff6ff 0%, #f8fafc 100%)",
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      color: "#2563eb",
      fontWeight: 800,
      letterSpacing: "0.04em",
    }}
  >
    Loading workspace...
  </div>
);

const ProtectedPage = ({ children, allowedRoles }) => (
  <ProtectedRoute allowedRoles={allowedRoles}>
    <Layout>{children}</Layout>
  </ProtectedRoute>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedPage>
                    <Dashboard />
                  </ProtectedPage>
                }
              />
              <Route
                path="/workshops"
                element={
                  <ProtectedPage>
                    <Workshops />
                  </ProtectedPage>
                }
              />
              <Route
                path="/resources"
                element={
                  <ProtectedPage>
                    <Resources />
                  </ProtectedPage>
                }
              />
              <Route
                path="/insights"
                element={
                  <ProtectedPage allowedRoles={["Coordinator", "Admin"]}>
                    <Insights />
                  </ProtectedPage>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedPage>
                    <Profile />
                  </ProtectedPage>
                }
              />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
