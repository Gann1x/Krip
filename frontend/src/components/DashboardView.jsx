// src/components/DashboardView.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiSettings } from 'react-icons/fi';
import '../styles/Dashboard.css';

const DashboardView = ({ user, unread, onLogout }) => {
  return (
    <div className="dashboard-page">
      <header className="dashboard-navbar">
        <div className="nav-left">
          <Link to="/timetable">Time Table</Link>
          <Link to="/notifications">
            Notifications {unread > 0 && <span className="badge">({unread})</span>}
          </Link>
        </div>

        <div className="nav-right">
          <span className="user-info">{user.name} ({user.role})</span>

          <Link to="/settings" className="icon-button" title="Settings">
            <FiSettings size={20} />
          </Link>

          <button className="icon-button" title="Logout" onClick={onLogout}>
            <FiPower size={20} />
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <h2>Welcome to your dashboard</h2>
      </main>
    </div>
  );
};

export default DashboardView;
