import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../utils/api";
import "../assets/css/CheckoutPage.css";

function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await apiGet("/api/cart", token);
        setCartItems(res || []);
      } catch {
        setMessage("⚠️ Không thể tải giỏ hàng.");
      }
    };
    fetchCart();
  }, [token]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      items: cartItems.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
      ...form,
    };

    try {
      await apiPost("/api/orders", orderData, token);
      setMessage("✅ Đặt hàng thành công!");
      setForm({ name: "", phone: "", address: "", note: "" });
    } catch (err) {
        console.error("Checkout error:", err);
      setMessage("❌ Lỗi khi đặt hàng.");
    }
  };

  return (
    <div className="checkout-page">
      <h2>🧾 Xác nhận đơn hàng</h2>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>Họ và tên</label>
        <input name="name" value={form.name} onChange={handleChange} required />

        <label>Số điện thoại</label>
        <input name="phone" value={form.phone} onChange={handleChange} required />

        <label>Địa chỉ giao hàng</label>
        <textarea name="address" value={form.address} onChange={handleChange} rows="2" required />

        <label>Ghi chú (tuỳ chọn)</label>
        <textarea name="note" value={form.note} onChange={handleChange} rows="2" />

        <h3>Tóm tắt đơn hàng</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.product.name} × {item.quantity} ={" "}
              {(item.product.price * item.quantity).toLocaleString()}₫
            </li>
          ))}
        </ul>
        <strong>Tổng cộng: {total.toLocaleString()}₫</strong>

        <button type="submit" className="btn-confirm">Xác nhận đặt hàng</button>
        {message && <p className="order-msg">{message}</p>}
      </form>
    </div>
  );
}

export default CheckoutPage;
