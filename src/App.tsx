import React, { useState } from "react";
import { AuthProvider, useAuth } from "./AuthContext";
import Login from "./Login";
import Register from "./Register";
import Quiz from "./components/Quiz";
import { auth } from "./firebase";

const AppContent: React.FC = () => {
  const { user, loading, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      <div>
        {showRegister ? <Register /> : <Login />}
        <p style={{ textAlign: "center", marginTop: 10 }}>
          {showRegister ? (
            <>
              Already have an account?{" "}
              <button onClick={() => setShowRegister(false)}>Login</button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button onClick={() => setShowRegister(true)}>Register</button>
            </>
          )}
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <button onClick={logout}>Log Out</button>
      <h1>Welcome to the ACA Quiz</h1>
      <Quiz />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
export {};
