import React, { useState, useEffect } from "react";
import UserTable from "../components/UserTable";

const Users = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    roles: [], 
    status: "Active"
  });
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    // Fetch users from the backend
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "roles") {
      setNewUser({ ...newUser, [name]: value.split(",").map((role) => role.trim()) });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  
    const url = showEditUserForm ? `http://localhost:3001/users/${selectedUser.id}` : "http://localhost:3001/users";
    const method = showEditUserForm ? "PUT" : "POST";
  
    console.log("Sending data:", newUser);
  
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        console.log("Response status:", response.status); 
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data); 
  
        if (showEditUserForm) {
          const updatedUsers = users.map((user) =>
            user.id === data.id ? { ...user, ...data } : user
          );
          setUsers(updatedUsers);
        } else {
          setUsers([...users, data]);
        }
  
        setNewUser({ name: "", email: "", roles: [], status: "Active" });
        setShowAddUserForm(false);
        setShowEditUserForm(false);
      })
      .catch((error) => {
        console.error("Error adding/updating user:", error);
        alert("Error adding/updating user");
      })
      .finally(() => setLoading(false));
  };
  
  const handleDelete = (userId) => {
    fetch(`http://localhost:3001/users/${userId}`, { method: "DELETE" })
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        alert("Error deleting user");
      });
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setNewUser({
      ...user,
      roles: Array.isArray(user.roles) ? user.roles : user.roles.split(",").map((role) => role.trim()) 
    });
    setShowEditUserForm(true);
    setShowAddUserForm(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      {user.roles.includes("Admin") && (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => {
            setShowAddUserForm(true);
            setShowEditUserForm(false);
          }}
        >
          Add User
        </button>
      )}

      {/* Add/Edit User form */}
      {(showAddUserForm || showEditUserForm) && (
        <div className="bg-white p-4 rounded shadow-md mb-4">
          <h3 className="text-xl font-bold mb-4">{showEditUserForm ? "Edit User" : "Add New User"}</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="roles" className="block text-sm font-medium mb-2">
                Roles (comma separated)
              </label>
              <input
                type="text"
                id="roles"
                name="roles"
                value={newUser.roles.join(", ")}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={newUser.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md" disabled={loading}>
              {loading ? "Submitting..." : showEditUserForm ? "Update User" : "Add User"}
            </button>
            <button
              type="button"
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md"
              onClick={() => {
                setShowAddUserForm(false);
                setShowEditUserForm(false);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Users;
