import React from "react";

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <div className="p-4 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">User Management</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between space-y-4"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-500 text-sm">
                <span className="font-semibold">Roles:</span>{" "}
                {user.roles.join(", ")}
              </p>
              <p
                className={`text-sm font-semibold ${
                  user.status === "Active"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {user.status}
              </p>
            </div>

            <div className="flex space-x-2">
              <button
                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                onClick={() => onEdit(user)}
              >
                Edit
              </button>
              <button
                className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                onClick={() => onDelete(user.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;
