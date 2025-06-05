import React, { useEffect, useState } from 'react';
import { apiGet, apiDelete } from '../utils/api';
import '../assets/css/AdminUsers.css';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await apiGet('/admin/users', token);
      setUsers(res || []);
    } catch {
      setMessage('⚠️ Lỗi khi tải danh sách người dùng');
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      setMessage('❌ ID người dùng không hợp lệ!');
      return;
    }

    if (!window.confirm('Bạn có chắc muốn xoá người dùng này?')) return;
    const token = localStorage.getItem('token');

    try {
      await apiDelete(`/admin/users/${id}`, token);
      setUsers(users.filter((u) => u.id !== id));
      setMessage('✅ Đã xoá người dùng.');
    } catch {
      setMessage('❌ Xoá thất bại.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-users">
      <h2>👥 Danh sách người dùng</h2>
      {message && <p className="status-msg">{message}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Role</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {u.role !== 'admin' && (
                  <button onClick={() => handleDelete(u.id)}>❌ Xoá</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
