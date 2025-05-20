const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.get('/:user_id', notificationController.getAll);
router.post('/markread/:user_id', notificationController.markRead);

module.exports = router;
