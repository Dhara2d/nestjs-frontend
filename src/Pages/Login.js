import React, { useState } from "react";
import axios from "axios";

import { useAuth } from "../hooks/useAuth";
export default function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });
      login(response.data.token);
      setIsLoggedIn(true);
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleLoginSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Not an user <a href="/signup">Signup</a>
          </p>
        </div>
      </form>
    </div>
  );
}
