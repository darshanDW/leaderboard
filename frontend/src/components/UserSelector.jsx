import React from 'react';

function UserSelector({ users, selectedUser, setSelectedUser, claimPoints }) {
  return (
    <div>
      <h2>Select User</h2>
      <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
        <option value="">-- Select a User --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
      <button onClick={claimPoints}>Claim Points</button>
    </div>
  );
}

export default UserSelector;
