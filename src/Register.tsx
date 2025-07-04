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
    <>
      <style>{`
        .register-form {
          max-width: 320px;
          margin: 3rem auto;
          padding: 20px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          font-family: 'Segoe UI', sans-serif;
        }

        .register-title {
          text-align: center;
          margin-bottom: 1rem;
          color: #1d1d5c;
        }

        .register-input {
          width: 100%;
          padding: 10px;
          margin-bottom: 14px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 1rem;
        }

        .register-button {
          width: 100%;
          padding: 10px;
          background-color: #1d1d5c;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
        }

        .register-button:hover {
          background-color: #1d1d5c;
        }

        .register-error {
          margin-top: 10px;
          color: red;
          text-align: center;
          font-size: 0.9rem;
        }
      `}</style>

      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="register-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="register-input"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
          className="register-input"
        />
        <button type="submit" className="register-button">Register</button>
        {error && <p className="register-error">{error}</p>}
      </form>
    </>
  );
};

export default Register;
