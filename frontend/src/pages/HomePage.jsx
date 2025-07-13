import React, { useState, useEffect } from 'react';
import UserSelector from '../components/UserSelector';
import Leaderboard from '../components/Leaderboard';

function HomePage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newUserName, setNewUserName] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchLeaderboard();
  }, []);

  const fetchUsers = async (page = 1) => {
    try {
      const response = await fetch(`https://leaderboard-tg1b.onrender.com/users?page=${page}&limit=5`);
      const data = await response.json();
      // console.log(`${page}:`, data);
      setUsers(data.users);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('https://leaderboard-tg1b.onrender.com/leaderboard');
      const data = await response.json();
      setLeaderboard(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const claimPoints = async () => {
    if (!selectedUser) return alert('Please select a user');

    try {
      const response = await fetch('https://leaderboard-tg1b.onrender.com/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: selectedUser }),
      });

      if (response.ok) {
        fetchLeaderboard();
      } else {
        console.error('Error claiming points:', await response.text());
      }
    } catch (error) {
      console.error('Error claiming points:', error);
    }
  };

  const addUser = async (name) => {
    if (!name) return alert('Please enter a user name');

    try {
      const response = await fetch('https://leaderboard-tg1b.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        fetchUsers(currentPage); // Refresh the user list
      } else {
        console.error('Error adding user:', await response.text());
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      fetchUsers(newPage);
    }
  };

  return (
    <div className="container">
      <h1>Leaderboard</h1>

      <div className="add-user">
        <input
          type="text"
          placeholder="Enter user name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <button onClick={() => addUser(newUserName)}>Add User</button>
      </div>

      <UserSelector
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        claimPoints={claimPoints}
      />

      <div className="table-container">
        <Leaderboard leaderboard={leaderboard} />
      </div>

      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          ⬅ Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next ➡
        </button>
      </div>
    </div>
  );
}

export default HomePage;
