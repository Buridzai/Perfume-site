import { useState } from "react";
import { apiPost } from "../utils/api";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate đơn giản
    if (!form.name || !form.email || !form.password) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    if (form.password.length < 6) {
      setError("Mật khẩu phải từ 6 ký tự trở lên.");
      return;
    }

    try {
      const res = await apiPost("/api/auth/register", {
        ...form,
        role: "user", // 👈 nếu BE yêu cầu truyền role
      });

      if (res.id || res.email) {
        setDone(true);
        setForm({ name: "", email: "", password: "" });
      } else if (res.error || res.message) {
        setError(res.message || "Email đã tồn tại.");
      } else {
        setError("Đăng ký thất bại.");
      }
    } catch (err) {
      console.error("Lỗi đăng ký:", err);
      setError("Lỗi kết nối đến máy chủ.");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <h1>Đăng ký tài khoản</h1>
      <form className="account-form" onSubmit={handleSubmit} autoComplete="off">
        <label>
          Họ tên
          <input
            name="name"
            type="text"
            placeholder="Nhập họ tên..."
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            placeholder="Email của bạn..."
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Mật khẩu
          <input
            name="password"
            type="password"
            placeholder="Mật khẩu (từ 6 ký tự)..."
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <button className="btn" type="submit" style={{ width: "100%" }}>
          Đăng ký
        </button>

        {error && <div className="form-error">{error}</div>}
        {done && (
          <div style={{ color: "#be627b", marginTop: 12, fontWeight: 500 }}>
            ✅ Đăng ký thành công! Bạn có thể{" "}
            <a href="/login" style={{ color: "#d63384" }}>đăng nhập</a> ngay.
          </div>
        )}
      </form>

      <div style={{ textAlign: "center", marginTop: 12, fontSize: 15 }}>
        Đã có tài khoản?{" "}
        <a href="/login" style={{ color: "#be627b", textDecoration: "underline" }}>
          Đăng nhập
        </a>
      </div>
    </div>
  );
}

export default Register;
