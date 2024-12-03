import React, { useState, useEffect } from "react";

const RoleTable = ({ currentUser }) => {
  const [roles, setRoles] = useState([]);
  const [editingRole, setEditingRole] = useState(null);
  const [newPermissions, setNewPermissions] = useState({});

  useEffect(() => {
    fetch("http://localhost:3001/roles")
      .then((res) => res.json())
      .then((data) => setRoles(data));
  }, []);

  const handleAddPermission = (roleId) => {
    const newPermission = newPermissions[roleId];
    if(!newPermission) return;
    if (!newPermission.trim()) return;

    const updatedRoles = roles.map((role) =>
      role.id === roleId
        ? { ...role, permissions: [...role.permissions, newPermission] }
        : role
    );

    fetch(`http://localhost:3001/roles/${roleId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        permissions: updatedRoles.find((r) => r.id === roleId).permissions,
      }),
    }).then(() => {
      setRoles(updatedRoles);
      setNewPermissions((prevState) => ({ ...prevState, [roleId]: "" }));
    });
  };

  const handleRemovePermission = (roleId, permission) => {
    const updatedRoles = roles.map((role) =>
      role.id === roleId
        ? {
            ...role,
            permissions: role.permissions.filter((perm) => perm !== permission),
          }
        : role
    );

    fetch(`http://localhost:3001/roles/${roleId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        permissions: updatedRoles.find((r) => r.id === roleId).permissions,
      }),
    }).then(() => {
      setRoles(updatedRoles);
    });
  };

  const handleEditRoleName = (roleId, newName) => {
    const updatedRoles = roles.map((role) =>
      role.id === roleId ? { ...role, name: newName } : role
    );

    fetch(`http://localhost:3001/roles/${roleId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    }).then(() => {
      setRoles(updatedRoles);
      setEditingRole(null);
    });
  };

  const handleDeleteRole = (roleId) => {
    const roleToDelete = roles.find((role) => role.id === roleId);
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (loggedInUser && roleToDelete) {
      if (loggedInUser.id === roleToDelete.id) {
        alert("You cannot delete your own role!");
        return;
      }
    }

    fetch(`http://localhost:3001/roles/${roleId}`, { method: "DELETE" }).then(() =>
      setRoles(roles.filter((role) => role.id !== roleId))
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Role Management
      </h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            <div className="flex justify-between items-center mb-4">
              {editingRole === role.id ? (
                <input
                  type="text"
                  defaultValue={role.name}
                  onBlur={(e) => handleEditRoleName(role.id, e.target.value)}
                  className="border rounded px-2 py-1 w-full text-gray-700"
                />
              ) : (
                <h3
                  className="text-xl font-semibold cursor-pointer text-gray-800"
                  onClick={() => setEditingRole(role.id)}
                >
                  {role.name}
                </h3>
              )}
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-medium text-gray-700 mb-2">
                Permissions:
              </h4>
              {role.permissions.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {role.permissions.map((permission, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center text-gray-600"
                    >
                      <span>{permission}</span>
                      <button
                        onClick={() => handleRemovePermission(role.id, permission)}
                        className="text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No permissions assigned.</p>
              )}
              <div className="flex items-center space-x-2 mt-3">
                <input
                  type="text"
                  placeholder="New Permission"
                  value={newPermissions[role.id] || ""}
                  onChange={(e) =>
                    setNewPermissions((prevState) => ({
                      ...prevState,
                      [role.id]: e.target.value,
                    }))
                  }
                  className="border rounded px-3 py-2 w-full text-gray-700 focus:ring focus:ring-blue-300"
                />
                <button
                  onClick={() => handleAddPermission(role.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                >
                  Add
                </button>
              </div>
            </div>
            <button
              onClick={() => handleDeleteRole(role.id)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-auto hover:bg-red-600 transition-colors duration-300"
            >
              Delete Role
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleTable;
