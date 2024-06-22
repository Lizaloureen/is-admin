// src/Users.js
import React from 'react';

const Users = () => {
  const users = [
    { id: 1, name: 'User One', role: 'Manager' },
    { id: 2, name: 'User Two', role: 'Manager' },
    { id: 3, name: 'User Three', role: 'Employee' },
  ];

  return (
    <div>
      <h1>Users Page</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.role}
            <button onClick={() => alert(`Managing ${user.name}`)}>Manage</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
