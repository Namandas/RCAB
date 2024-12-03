import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import Sidebar from "./components/Sidebar";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check localStorage for user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Parse and set user if found in localStorage
      navigate("/"); // Redirect to the dashboard if logged in
    } else {
      navigate("/login"); // Redirect to login if no user found
    }
  }, []); // Empty dependency array to run once on initial load

  // Logout function to clear user and localStorage
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user from localStorage
    navigate("/login"); // Redirect to login
  };

  // Protected route component to protect pages that need authentication
  const ProtectedRoute = ({ children, roles }) => {
    if (!user) return <Navigate to="/login" />; // If no user, redirect to login
    if (roles && !roles.some((role) => user?.roles?.includes(role))) {
      return <Navigate to="/unauthorized" />; // If no matching role, redirect to unauthorized
    }
    return children;
  };

  return (
    <div className="flex">
      {user && <Sidebar roles={user?.roles || []} handleLogout={handleLogout} />}
      <div className="flex-1">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute roles={["Admin"]}>
                <Users user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roles"
            element={
              <ProtectedRoute roles={["Admin", "Editor"]}>
                <Roles />
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<div>Unauthorized</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
