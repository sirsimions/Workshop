// src/Components/LoginForm.js
import { useState } from "react";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://workshopback-rk2x.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid credentials");
        return res.json();
      })
      .then((data) => {
        sessionStorage.setItem("workshopLoggedIn", "true");
        sessionStorage.setItem("workshopToken", data.token);
        sessionStorage.setItem("workshopName", data.name);
        onLogin();
      })
      .catch((err) => alert(err.message));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>Managers Login</h5>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-control mb-2"
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-control mb-2"
        placeholder="Password"
        required
      />
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
