import { Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import "../assets/css/layout.css";

function Header() {
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <span role="img" aria-label="flower">🌸</span>
          <h1>T&N Essence</h1>
        </div>
        <nav>
          <Link to="/">Trang chủ</Link>
          <Link to="/products">Sản phẩm</Link>
          <Link to="/about">Giới thiệu</Link>
          <Link to="/contact">Liên hệ</Link>

          {isLoggedIn && !isAdmin && (
            <Link to="/cart">🛒 Giỏ hàng</Link> // ✅ Chỉ hiện cho user thường
          )}

          {isAdmin && (
            <>
              <Link to="/admin/dashboard">Quản lý</Link>
              <Link to="/admin/products">Sản phẩm</Link>
              <Link to="/admin/users">Người dùng</Link>
            </>
          )}

          {!isLoggedIn ? (
            <>
              <Link to="/login">Đăng nhập</Link>
              <Link to="/register">Đăng ký</Link>
            </>
          ) : (
            <>
              <Link to="/account">Xin chào, {user.name}</Link>
              <button onClick={logout} className="logout-btn">Đăng xuất</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
