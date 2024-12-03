import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [roleCount, setRoleCount] = useState(0);
  const [newUsers, setNewUsers] = useState(0);
  const [updatedRoles, setUpdatedRoles] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => {
        setUserCount(data.length);
        setNewUsers(5); 
      });

    fetch("http://localhost:3001/roles")
      .then((res) => res.json())
      .then((data) => {
        setRoleCount(data.length);
        setUpdatedRoles(3); 
      });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <div
          onClick={() => navigate("/users")}
          className="flex items-center justify-between bg-blue-500 text-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          title="Click to view all users"
        >
          <div>
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-4xl font-bold">{userCount}</p>
            <p className="text-sm">Click to view details</p>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a8 8 0 10-16 0v2h5m6-6a4 4 0 10-8 0 4 4 0 008 0z"
              />
            </svg>
          </div>
        </div>

        {/* Total Roles Card */}
        <div
          onClick={() => navigate("/roles")}
          className="flex items-center justify-between bg-green-500 text-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          title="Click to view all roles"
        >
          <div>
            <h3 className="text-lg font-semibold">Total Roles</h3>
            <p className="text-4xl font-bold">{roleCount}</p>
            <p className="text-sm">Click to view details</p>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0-3 1.5-5 4-5s4 2 4 5c0 1-1 5-4 5s-4-4-4-5zM8 21h8m-8-4h8m-8-8h2m4 0h2"
              />
            </svg>
          </div>
        </div>

        {/* Activity Overview Card */}
        <div
          className="flex items-center justify-between bg-purple-500 text-white p-6 rounded-lg shadow-md cursor-default"
          title="Summary of recent activity"
        >
          <div>
            <h3 className="text-lg font-semibold">Activity Overview</h3>
            <p className="text-sm">New Users: {newUsers} this week</p>
            <p className="text-sm">Roles Updated: {updatedRoles} this week</p>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h11M9 21V8m4 8h4M6 21h4"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
