// src/Components/LandingDashboard.js
import { useState } from "react";
import TruckTable from "./TruckTable";
import LoginForm from "./LoginForm";

function LandingDashboard({ trucks, setLoggedIn }) {
  const [showLogin, setShowLogin] = useState(false);

  const readyTrucks = trucks.filter((t) => t.completed);
  const processingTrucks = trucks.filter((t) => !t.completed);

  const toggleLogin = () => setShowLogin((prev) => !prev);

  return (
    <div className="container my-4 px-3">
      <style>{`
        .dashboard-header {
          border-bottom: 1px solid #dee2e6;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }

        .login-toggle-btn {
          font-size: 1.5rem;
          color: #495057;
          background: none;
          border: none;
          cursor: pointer;
        }

        .login-toggle-btn:hover {
          color: #0d6efd;
        }

        .login-card {
          background-color: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 24px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }

        .section-title {
          margin-top: 40px;
        }
      `}</style>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center dashboard-header">
        <div>
          <h3 className="fw-bold mb-1">🚛 STK STU W/S Dashboard</h3>
          <small className="text-muted">{new Date().toLocaleString()}</small>
        </div>
        <button
          onClick={toggleLogin}
          className="login-toggle-btn"
          title="Toggle Login"
        >
          🔐
        </button>
      </div>

      {/* Login Form */}
      {showLogin && (
        <div className="login-card">
          <LoginForm onLogin={() => setLoggedIn(true)} />
        </div>
      )}

      {/* Tables */}
      <div className="section-title">
        <TruckTable
          title="✅ Trucks Ready to Load"
          trucks={readyTrucks}
          onComplete={null}
          onMoveToLoading={null}
        />
      </div>

      <div className="section-title">
        <TruckTable
          title="🛠️ Maintenance in Progress"
          trucks={processingTrucks}
          onComplete={null}
          onMoveToLoading={null}
        />
      </div>
    </div>
  );
}

export default LandingDashboard;
