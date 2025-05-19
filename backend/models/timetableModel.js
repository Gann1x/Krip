const pool = require('../db');

// CREATE
const createTimetableEntry = async (entry) => {
  const { className, subject, teacher, day_of_week, start_time, end_time, created_by } = entry;
  const res = await pool.query(
    `INSERT INTO timetable (class, subject, teacher, day_of_week, start_time, end_time, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [className, subject, teacher, day_of_week, start_time, end_time, created_by]
  );
  return res.rows[0];
};

// READ (all for admin/teacher, filtered for student)
const getTimetable = async (filter = {}) => {
  if (filter.className) {
    const res = await pool.query(`SELECT * FROM timetable WHERE class = $1 ORDER BY day_of_week, start_time`, [filter.className]);
    return res.rows;
  } else {
    const res = await pool.query(`SELECT * FROM timetable ORDER BY class, day_of_week, start_time`);
    return res.rows;
  }
};

// UPDATE
const updateTimetableEntry = async (id, entry) => {
  const { className, subject, teacher, day_of_week, start_time, end_time } = entry;
  const res = await pool.query(
    `UPDATE timetable SET class = $1, subject = $2, teacher = $3, day_of_week = $4, start_time = $5, end_time = $6 WHERE id = $7 RETURNING *`,
    [className, subject, teacher, day_of_week, start_time, end_time, id]
  );
  return res.rows[0];
};

// DELETE
const deleteTimetableEntry = async (id) => {
  const res = await pool.query(`DELETE FROM timetable WHERE id = $1 RETURNING *`, [id]);
  return res.rows[0];
};

module.exports = {
  createTimetableEntry,
  getTimetable,
  updateTimetableEntry,
  deleteTimetableEntry
};
