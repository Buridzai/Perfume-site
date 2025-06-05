import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../utils/api";
import { useAuth } from "../contexts/useAuth";
import { jwtDecode } from "jwt-decode"; 

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [logged, setLogged] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await apiPost("/api/auth/login", form);
      console.log("Phản hồi từ API:", res); // 🪵 debug

      if (res.token) {
        let userInfo = res.user;

        // 👇 Nếu không có user trong response → dùng jwtDecode để trích từ token
        if (!userInfo) {
          try {
            userInfo = jwtDecode(res.token);
          } catch (decodeErr) {
            console.error("Không thể giải mã token:", decodeErr);
            setError("Không thể xác định thông tin người dùng.");
            return;
          }
        }

        login(userInfo, res.token); // ✅ lưu thông tin vào context
        setLogged(true);
        navigate("/");
      } else {
        setError("Sai email hoặc mật khẩu.");
      }
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <div style={{ maxWidth: 380, margin: "0 auto" }}>
      <h1>Đăng nhập</h1>
      <form className="account-form" onSubmit={handleSubmit} autoComplete="off">
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Mật khẩu
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </label>
        <button className="btn" type="submit" style={{ width: "100%" }}>
          Đăng nhập
        </button>
        {error && <div className="form-error">{error}</div>}
        {logged && <div style={{ color: "#be627b", marginTop: 12, fontWeight: 500 }}>✅ Đăng nhập thành công!</div>}
      </form>
      <div style={{ textAlign: "center", marginTop: 12, fontSize: 15 }}>
        Chưa có tài khoản?{" "}
        <a href="/register" style={{ color: "#be627b", textDecoration: "underline" }}>
          Đăng ký ngay
        </a>
      </div>
    </div>
  );
}

export default Login;
