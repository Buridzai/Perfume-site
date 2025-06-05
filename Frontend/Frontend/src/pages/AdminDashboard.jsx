import React, { useEffect, useState } from 'react';
import { apiGet } from '../utils/api';
import '../assets/css/AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    orders: 0,
    revenue: 0,
  });

  const fetchStats = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await apiGet('/admin/stats', token); // API thống kê backend
      setStats(res);
    } catch {
      console.error('Lỗi khi lấy thống kê');
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>📊 Thống kê quản trị</h2>
      <div className="stats-grid">
        <div className="stat-card pink">
          <h3>{stats.products}</h3>
          <p>Sản phẩm</p>
        </div>
        <div className="stat-card violet">
          <h3>{stats.users}</h3>
          <p>Người dùng</p>
        </div>
        <div className="stat-card orange">
          <h3>{stats.orders}</h3>
          <p>Đơn hàng</p>
        </div>
        <div className="stat-card gold">
          <h3>{stats.revenue.toLocaleString()}đ</h3>
          <p>Doanh thu</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
