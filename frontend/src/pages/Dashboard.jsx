import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    // Fetch notifications count
    const fetchUnread = async () => {
      if (user && user.id) {
        const res = await fetch(`/api/notifications/${user.id}`);
        const data = await res.json();
        setUnread(data.filter(n => !n.is_read).length);
      }
    };
    fetchUnread();
  }, [user]);

  if (!user) return <p>No user found.</p>;

  return (
    <div className="container">
      <h2>Welcome, {user.name}</h2>
      <p>Role: {user.role}</p>

      {/* Navigation links */}
      <nav style={{ margin: "1.5rem 0" }}>
        <Link to="/timetable">Go to Timetable</Link> |{" "}
        <Link to="/notifications">
          🔔 Notifications{unread > 0 && <span style={{color:'red'}}> ({unread})</span>}
        </Link>{" | "}
        <a
          href="/"
          onClick={() => {
            localStorage.clear();
            window.location.href = '/';
          }}
        >
          Logout
        </a>
      </nav>

      {user.role === 'student' && <p>This is the Student Dashboard.</p>}
      {user.role === 'teacher' && <p>This is the Teacher Dashboard.</p>}
      {user.role === 'parent' && <p>This is the Parent Dashboard.</p>}
      {user.role === 'admin' && <p>This is the Admin Panel.</p>}
    </div>
  );
};

export default Dashboard;
