import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ roles, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(true); 

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen">
      <div
        className={`bg-gray-800 text-white flex flex-col p-4 transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >

        <div className="flex flex-col items-center mb-6">
          <h3 className={`text-xl font-bold mb-2 ${!isOpen && "hidden"}`}>
            Welcome, Admin!
          </h3>
          <button
            onClick={toggleSidebar}
            className="text-white sm:hidden focus:outline-none"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-4 flex-1">
          <li>
            <Link
              to="/"
              className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/roles"
              className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              Roles
            </Link>
          </li>
        </ul>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded w-full hover:bg-red-600 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
