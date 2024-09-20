import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const {users, setUsers} = useState([])

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/v1/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
      console.log(response.data)
    };
    fetchUsers();
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
          <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Roles</th>
            <th className="border border-gray-300 p-2">Department</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.roles.join(', ')}</td>
              <td className="border border-gray-300 p-2">{user.staff.depId}</td>
            </tr>
          ))}d
        </tbody>
        </table>
    </div>
  );
};

export default Home;
