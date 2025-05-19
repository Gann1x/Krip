const {
  createTimetableEntry,
  getTimetable,
  updateTimetableEntry,
  deleteTimetableEntry
} = require('../models/timetableModel');

exports.create = async (req, res) => {
  try {
    const entry = await createTimetableEntry(req.body);
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating timetable entry', err });
  }
};

exports.getAll = async (req, res) => {
  try {
    const { className } = req.query; // For filtering if needed
    const timetable = await getTimetable({ className });
    res.json(timetable);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching timetable', err });
  }
};

exports.update = async (req, res) => {
  try {
    const entry = await updateTimetableEntry(req.params.id, req.body);
    res.json(entry);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating timetable entry', err });
  }
};

exports.delete = async (req, res) => {
  try {
    const entry = await deleteTimetableEntry(req.params.id);
    res.json(entry);
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting timetable entry', err });
  }
};
