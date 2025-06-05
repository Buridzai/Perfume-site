import React, { useEffect, useState } from "react";
import { apiGet, apiPut, apiDelete, apiPost } from "../utils/api";
import "../assets/css/CartPage.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    try {
      const res = await apiGet("/api/cart", token);
      setCartItems(res || []);
    } catch (err) {
      console.error("Lỗi khi lấy giỏ hàng:", err);
      setMessage("⚠️ Lỗi khi lấy giỏ hàng");
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;
    try {
      await apiPut(`/api/cart/${id}`, { quantity }, token);
      fetchCart();
    } catch {
      alert("Không thể cập nhật số lượng");
    }
  };

  const removeFromCart = async (id) => {
    if (!window.confirm("Xoá sản phẩm này khỏi giỏ hàng?")) return;
    try {
      await apiDelete(`/api/cart/${id}`, token);
      fetchCart();
    } catch {
      alert("Không thể xoá sản phẩm");
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return alert("Giỏ hàng đang trống!");

    const items = cartItems.map((item) => ({
      product_id: item.product.id,
      quantity: item.quantity,
    }));

    try {
      await apiPost("/api/orders", { items }, token);
      setMessage("✅ Đặt hàng thành công!");
      setCartItems([]);
      setTotal(0);
    } catch (err) {
      setMessage("❌ Không thể thanh toán");
      console.error("Checkout error:", err);
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotal(t);
  }, [cartItems]);

  return (
    <div className="cart-page">
      <h2>🛒 Giỏ hàng của bạn</h2>
      {message && <p className="status-msg">{message}</p>}
      {cartItems.length === 0 ? (
        <p>Không có sản phẩm nào trong giỏ hàng.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Tên</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.product.image} alt={item.product.name} />
                  </td>
                  <td>{item.product.name}</td>
                  <td>{item.product.price.toLocaleString()}₫</td>
                  <td>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    {item.quantity}
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </td>
                  <td>{(item.product.price * item.quantity).toLocaleString()}₫</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)}>Xoá</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-total">
            <h3>Tổng cộng: {total.toLocaleString()}₫</h3>
            <button className="btn-checkout" onClick={handleCheckout}>
              💳 Thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
