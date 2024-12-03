import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); 

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    // Mock API for user login
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => {
        const user = data.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          setUser(user); 
          localStorage.setItem("user", JSON.stringify(user)); 
          navigate("/"); 
        } else {
          setError("Invalid email or password");
        }
      })
      .catch((error) => {
        setError("Failed to fetch user data. Please try again.");
        console.error(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-1/3">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="block w-full mb-4 p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="block w-full mb-4 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
