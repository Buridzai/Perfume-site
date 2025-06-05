// src/pages/AdminProducts.jsx
import React, { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "../utils/api";
import "../assets/css/AdminProducts.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  // Dữ liệu form (dùng chung cho Thêm và Chỉnh sửa)
  const initialForm = {
    id: null,           // null = Thêm mới; Nếu có id = Chỉnh sửa
    name: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  };
  const [form, setForm] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);

  // Lấy token từ localStorage
  const token = localStorage.getItem("token");

  // 1) Fetch danh sách sản phẩm
  const fetchProducts = async () => {
    try {
      const data = await apiGet("/admin/products", token);
      setProducts(data || []);
      setMessage("");
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Lỗi khi tải danh sách sản phẩm.");
    }
  };

  // 2) Xóa sản phẩm
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá sản phẩm này?")) return;
    try {
      await apiDelete(`/admin/products/${id}`, token);
      // Loại bỏ khỏi danh sách đang có
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setMessage("✅ Đã xoá sản phẩm.");
      // Nếu đang chỉnh sửa chính sản phẩm này, reset form
      if (form.id === id) {
        setForm(initialForm);
        setIsEditing(false);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Không xoá được sản phẩm.");
    }
  };

  // 3) Khi nhấn “Sửa” → điền form, bật chế độ chỉnh sửa
  const handleEditClick = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      image: product.image || "",
      description: product.Description || "", // hoặc product.description tuỳ field model
    });
    setIsEditing(true);
    setMessage("");
    // Scroll lên form nếu muốn
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 4) Xử lý thay đổi form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 5) Submit form: thêm hoặc cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate cơ bản: bắt buộc phải có name, price, stock
    if (!form.name.trim() || !form.price || !form.stock) {
      setMessage("⚠️ Vui lòng điền tối thiểu Tên, Giá và Kho.");
      return;
    }

    // Chuẩn hoá payload
    const payload = {
      name: form.name.trim(),
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10),
      image: form.image.trim(),
      description: form.description.trim(),
    };

    try {
      if (isEditing && form.id) {
        // Gọi PUT /admin/products/:id
        await apiPut(`/admin/products/${form.id}`, payload, token);
        setMessage("✅ Cập nhật sản phẩm thành công.");
      } else {
        // Gọi POST /admin/products
        await apiPost("/admin/products", payload, token);
        setMessage("✅ Thêm sản phẩm thành công.");
      }
      // Làm mới danh sách
      fetchProducts();
      // Reset form
      setForm(initialForm);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setMessage(
        isEditing
          ? "❌ Không thể cập nhật sản phẩm."
          : "❌ Không thể thêm sản phẩm."
      );
    }
  };

  // 6) Hủy chỉnh sửa: reset form về ban đầu
  const handleCancelEdit = () => {
    setForm(initialForm);
    setIsEditing(false);
    setMessage("");
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="admin-products">
      <h2>📦 Quản lý sản phẩm</h2>
      {message && <p className="message">{message}</p>}

      {/* Form Thêm / Chỉnh sửa */}
      <div className="form-container">
        <h3>{isEditing ? "✏️ Chỉnh sửa sản phẩm" : "➕ Thêm sản phẩm mới"}</h3>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="name">
              Tên sản phẩm<span className="required">*</span>:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">
              Giá (VND)<span className="required">*</span>:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={form.price}
              onChange={handleInputChange}
              step="1000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">
              Kho (số lượng)<span className="required">*</span>:
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={form.stock}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">URL Ảnh:</label>
            <input
              type="text"
              id="image"
              name="image"
              value={form.image}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Mô tả:</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleInputChange}
              rows="3"
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-save">
              {isEditing ? "💾 Lưu thay đổi" : "➕ Thêm sản phẩm"}
            </button>
            {isEditing && (
              <button
                type="button"
                className="btn-cancel"
                onClick={handleCancelEdit}
              >
                ❌ Huỷ chỉnh sửa
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Bảng liệt kê sản phẩm */}
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Kho</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                <img
                  src={p.image}
                  alt={p.name}
                  className="product-thumb"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/60x60?text=No+Image";
                  }}
                />
              </td>
              <td>{p.name}</td>
              <td>{Number(p.price).toLocaleString("vi-VN")}₫</td>
              <td>{p.stock}</td>
              <td className="actions-cell">
                <button
                  className="btn-edit"
                  onClick={() => handleEditClick(p)}
                >
                  ✏️ Sửa
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(p.id)}
                >
                  ❌ Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;
