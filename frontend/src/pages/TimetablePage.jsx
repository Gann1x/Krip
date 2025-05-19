import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TimetablePage = () => {
  const [timetable, setTimetable] = useState([]);
  const [form, setForm] = useState({
    className: '',
    subject: '',
    teacher: '',
    day_of_week: '',
    start_time: '',
    end_time: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState('');

  // Get user info & role
  const user = JSON.parse(localStorage.getItem('user')) || {};

  // Fetch timetable
  const fetchTimetable = async () => {
    let url = '/api/timetable';
    if (user.role === 'student') {
      url += `?className=${encodeURIComponent(user.className || '')}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    setTimetable(data);
  };

  useEffect(() => {
    fetchTimetable();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');

    const body = {
      ...form,
      created_by: user.id
    };

    try {
      let res, data;
      if (editingId) {
        res = await fetch(`/api/timetable/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
      } else {
        res = await fetch('/api/timetable', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      }
      data = await res.json();
      setMsg(editingId ? 'Entry updated!' : 'Entry added!');
      setForm({ className: '', subject: '', teacher: '', day_of_week: '', start_time: '', end_time: '' });
      setEditingId(null);
      fetchTimetable();
    } catch (err) {
      setMsg('Error submitting form');
    }
  };

  const handleEdit = (entry) => {
    setForm({
      className: entry.class,
      subject: entry.subject,
      teacher: entry.teacher,
      day_of_week: entry.day_of_week,
      start_time: entry.start_time,
      end_time: entry.end_time
    });
    setEditingId(entry.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this entry?')) return;
    await fetch(`/api/timetable/${id}`, { method: 'DELETE' });
    fetchTimetable();
  };

  // Days of week helper
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="container">
      {/* Back to Dashboard link */}
      <nav style={{ margin: "1rem 0" }}>
        <Link to="/dashboard">← Back to Dashboard</Link>
      </nav>
      <h2>Timetable</h2>
      {(user.role === 'teacher' || user.role === 'admin') && (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <input type="text" name="className" placeholder="Class" value={form.className} onChange={handleChange} required />
          <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
          <input type="text" name="teacher" placeholder="Teacher" value={form.teacher} onChange={handleChange} required />
          <select name="day_of_week" value={form.day_of_week} onChange={handleChange} required>
            <option value="">Day</option>
            {days.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <input type="time" name="start_time" value={form.start_time} onChange={handleChange} required />
          <input type="time" name="end_time" value={form.end_time} onChange={handleChange} required />
          <button type="submit">{editingId ? 'Update' : 'Add'} Entry</button>
        </form>
      )}
      <p>{msg}</p>
      <table border="1" cellPadding="6" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Class</th>
            <th>Subject</th>
            <th>Teacher</th>
            <th>Day</th>
            <th>Start</th>
            <th>End</th>
            {(user.role === 'teacher' || user.role === 'admin') && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {timetable.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.class}</td>
              <td>{entry.subject}</td>
              <td>{entry.teacher}</td>
              <td>{entry.day_of_week}</td>
              <td>{entry.start_time}</td>
              <td>{entry.end_time}</td>
              {(user.role === 'teacher' || user.role === 'admin') && (
                <td>
                  <button onClick={() => handleEdit(entry)}>Edit</button>
                  <button onClick={() => handleDelete(entry.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimetablePage;
