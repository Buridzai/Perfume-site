import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiGet } from "../utils/api";
import "../assets/css/UserPage.css";

function UserPage() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loadingOrders, setLoadingOrders] = useState(true);
  const [orderHistory, setOrderHistory] = useState([]);

  // Nếu không có user (chưa login), redirect về /login
  useEffect(() => {
    if (!user || !user.id) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch lịch sử đơn hàng (giả sử API có endpoint GET /api/orders của user hiện tại)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        // Giả sử API /api/orders trả về mảng đơn hàng của user hiện tại
        const res = await apiGet("/api/orders", token);
        setOrderHistory(res || []);
      } catch (err) {
        console.error("Không lấy được lịch sử đơn hàng:", err);
      } finally {
        setLoadingOrders(false);
      }
    };

    if (user && user.id) {
      fetchOrders();
    }
  }, [user]);

  if (!user) {
    // Trong lúc điều hướng hoặc chưa có user, có thể trả về null hoặc loading nhỏ
    return null;
  }

  return (
    <div className="user-page">
      {/* Card thông tin user */}
      <div className="user-card">
        <h2>Thông tin tài khoản</h2>
        <div className="user-info">
          <div className="info-row">
            <span className="label">Tên:</span>
            <span className="value">{user.name}</span>
          </div>
          <div className="info-row">
            <span className="label">Email:</span>
            <span className="value">{user.email}</span>
          </div>
          <div className="info-row">
            <span className="label">Vai trò:</span>
            <span className="value">{user.role}</span>
          </div>
        </div>
        <button className="btn-logout" onClick={logout}>
          Đăng xuất
        </button>
      </div>

      {/* Card Lịch sử đơn hàng */}
      <div className="orders-card">
        <h2>Lịch sử đơn hàng</h2>
        {loadingOrders ? (
          <p>Đang tải lịch sử đơn hàng...</p>
        ) : orderHistory.length === 0 ? (
          <p>Bạn chưa có đơn hàng nào.</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID đơn hàng</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    {new Date(order.created_at).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                  <td>
                    {order.total.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>{order.status || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default UserPage;
