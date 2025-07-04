import React, { useState } from "react";
import { useAuth } from "./AuthContext";

const Register: React.FC = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await register(email, password);
      setError(null);
    } catch {
      setError("Failed to register. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: "auto", padding: 20 }}>
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{ width: "100%", padding: 8, marginBottom: 12 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        style={{ width: "100%", padding: 8, marginBottom: 12 }}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        required
        style={{ width: "100%", padding: 8, marginBottom: 12 }}
      />
      <button type="submit" style={{ width: "100%", padding: 10 }}>Register</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default Register;

export {};  
