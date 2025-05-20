const { createNotification, getNotificationsForUser, markAllAsRead } = require('../models/notificationModel');

// Get notifications for user
exports.getAll = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const notes = await getNotificationsForUser(user_id);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching notifications' });
  }
};

// Mark all as read
exports.markRead = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    await markAllAsRead(user_id);
    res.json({ msg: 'All notifications marked as read' });
  } catch (err) {
    res.status(500).json({ msg: 'Error marking as read' });
  }
};
