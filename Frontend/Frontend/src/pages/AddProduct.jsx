import React, { useState } from 'react';
import { apiPostForm } from '../utils/api';
import '../assets/css/AddProduct.css';

function AddProduct() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('description', form.description);
    formData.append('stock', form.stock);
    if (image) formData.append('image', image);

    try {
      const res = await apiPostForm('/admin/products', formData, token);
      if (res.id || res.name) {
        setMessage('✅ Đã thêm sản phẩm thành công!');
        setForm({ name: '', price: '', description: '', stock: '' });
        setImage(null);
      } else {
        setMessage('❌ Lỗi: Không thêm được sản phẩm.');
      }
    } catch {
      setMessage('⚠️ Lỗi kết nối server!');
    }
  };

  return (
    <div className="add-product-form">
      <h2>➕ Thêm sản phẩm mới</h2>
      <form onSubmit={handleAdd}>
        <label>Tên sản phẩm</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Tên sản phẩm"
          required
        />

        <label>Giá</label>
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          type="number"
          placeholder="Giá sản phẩm"
          required
        />

        <label>Mô tả</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          placeholder="Mô tả chi tiết"
          required
        ></textarea>

        <label>Tồn kho</label>
        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          type="number"
          placeholder="Số lượng tồn kho"
          required
        />

        <label>Ảnh sản phẩm</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button type="submit" className="btn-submit">Lưu sản phẩm</button>
        {message && <div style={{ marginTop: 16 }}>{message}</div>}
      </form>
    </div>
  );
}

export default AddProduct;
