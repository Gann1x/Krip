const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetableController');

// Teacher/Admin: Create
router.post('/', timetableController.create);

// All: Read (optionally filter by class via query param)
router.get('/', timetableController.getAll);

// Teacher/Admin: Update
router.put('/:id', timetableController.update);

// Teacher/Admin: Delete
router.delete('/:id', timetableController.delete);

module.exports = router;
