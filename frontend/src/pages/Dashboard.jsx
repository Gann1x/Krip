// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import DashboardView from '../components/DashboardView';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    const fetchUnread = async () => {
      if (user?.id) {
        const res = await fetch(`/api/notifications/${user.id}`);
        const data = await res.json();
        setUnread(data.filter(n => !n.is_read).length);
      }
    };
    fetchUnread();
  }, [user]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  if (!user) return <p>No user found.</p>;

  return (
    <DashboardView user={user} unread={unread} onLogout={handleLogout} />
  );
};

export default Dashboard;
