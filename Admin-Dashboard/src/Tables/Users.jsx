import React, { useState } from 'react';

const initialUsers = [
  { id: 1, name: 'Manish', email: 'manish@example.com', role: 'Admin' },
  { id: 2, name: 'Anjali', email: 'anjali@example.com', role: 'Editor' },
  { id: 3, name: 'Ravi', email: 'ravi@example.com', role: 'Viewer' },
  { id: 4, name: 'Pooja', email: 'pooja@example.com', role: 'Admin' },
  { id: 5, name: 'Rahul', email: 'rahul@example.com', role: 'Viewer' },
];

function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Viewer' });

  const handleAddUser = () => {
    const newId = users.length + 1;
    setUsers([...users, { id: newId, ...newUser }]);
    setNewUser({ name: '', email: '', role: 'Viewer' });
  };

  return (
    <div className="page-container">
      <h2>Users</h2>

      <div className="add-user-form">
        <h4>Add New User</h4>
        <input placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
        <input placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
        <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
          <option>Admin</option>
          <option>Editor</option>
          <option>Viewer</option>
        </select>
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td><button onClick={() => alert(`Details of ${user.name}`)}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;

