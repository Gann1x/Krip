const pool = require('../db');

// Create notification
const createNotification = async (user_id, message) => {
  const res = await pool.query(
    'INSERT INTO notifications (user_id, message) VALUES ($1, $2) RETURNING *',
    [user_id, message]
  );
  return res.rows[0];
};

// Get notifications for a user
const getNotificationsForUser = async (user_id) => {
  const res = await pool.query(
    'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC',
    [user_id]
  );
  return res.rows;
};

// Mark all notifications as read
const markAllAsRead = async (user_id) => {
  await pool.query('UPDATE notifications SET is_read = TRUE WHERE user_id = $1', [user_id]);
};

module.exports = { createNotification, getNotificationsForUser, markAllAsRead };
