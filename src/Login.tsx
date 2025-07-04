import React, { useState } from "react";
import { useAuth } from "./AuthContext";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      setError(null);
    } catch {
      setError("Failed to log in. Check your email and password.");
    }
  };

  return (
    <>
      <style>{`
        .login-form {
          max-width: 320px;
          margin: 3rem auto;
          padding: 20px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          font-family: 'Segoe UI', sans-serif;
        }

        .login-title {
          text-align: center;
          margin-bottom: 1rem;
          color: #1d1d5c;
        }

        .login-input {
          width: 100%;
          padding: 10px;
          margin-bottom: 14px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 1rem;
        }

        .login-button {
          width: 100%;
          padding: 10px;
          background-color: #1d1d5c;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
        }

        .login-button:hover {
          background-color: #1d1d5c;
        }

        .login-error {
          margin-top: 10px;
          color: red;
          text-align: center;
          font-size: 0.9rem;
        }
      `}</style>

      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">Log In</button>
        {error && <p className="login-error">{error}</p>}
      </form>
    </>
  );
};

export default Login;
