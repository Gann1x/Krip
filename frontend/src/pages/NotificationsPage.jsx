import React, { useEffect, useState } from 'react';

const NotificationsPage = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications for this user
  const fetchNotifications = async () => {
    const res = await fetch(`/api/notifications/${user.id}`);
    const data = await res.json();
    setNotifications(data);
  };

  // Mark all as read
  const markAllAsRead = async () => {
    await fetch(`/api/notifications/markread/${user.id}`, { method: 'POST' });
    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <nav style={{ margin: "1rem 0" }}>
        <a href="/dashboard">← Back to Dashboard</a>
      </nav>
      <h2>Notifications</h2>
      <button onClick={markAllAsRead}>Mark all as read</button>
      <ul>
        {notifications.length === 0 && <li>No notifications yet.</li>}
        {notifications.map(note => (
          <li key={note.id} style={{ fontWeight: note.is_read ? "normal" : "bold" }}>
            {note.message} <span style={{ color: "#888", fontSize: "0.85em" }}>({new Date(note.created_at).toLocaleString()})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;
