import React from 'react';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return <p>No user found.</p>;

  return (
    <div className="container">
      <h2>Welcome, {user.name}</h2>
      <p>Role: {user.role}</p>

      {user.role === 'student' && <p>This is the Student Dashboard.</p>}
      {user.role === 'teacher' && <p>This is the Teacher Dashboard.</p>}
      {user.role === 'parent' && <p>This is the Parent Dashboard.</p>}
      {user.role === 'admin' && <p>This is the Admin Panel.</p>}
    </div>
  );
};

export default Dashboard;

