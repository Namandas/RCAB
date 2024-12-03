import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => (
  <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
    <div className="bg-white shadow-lg rounded-lg p-8 text-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Access Denied</h1>
      <p className="text-gray-700 mb-6">
        Oops! You don’t have permission to view this page.
      </p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all"
      >
        Go Back to Dashboard
      </Link>
    </div>
  </div>
);

export default Unauthorized;
