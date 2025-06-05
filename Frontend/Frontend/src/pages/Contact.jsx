import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    // Thực tế sẽ gọi API gửi liên hệ, ở đây demo chỉ báo thành công
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <h1>Liên hệ với T&N Essence</h1>
      <p>
        Nếu bạn có thắc mắc, góp ý, hoặc cần tư vấn về sản phẩm, hãy điền thông tin bên dưới.
        Chúng tôi sẽ phản hồi trong thời gian sớm nhất!
      </p>
      <form className="contact-form" onSubmit={handleSubmit} autoComplete="off">
        <label>
          Họ tên
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Nhập họ tên..."
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Email của bạn..."
          />
        </label>
        <label>
          Nội dung
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            required
            placeholder="Nhập nội dung liên hệ..."
            style={{ resize: "vertical" }}
          />
        </label>
        <button className="btn" type="submit" style={{ width: "100%" }}>
          Gửi liên hệ
        </button>
        {sent && (
          <div style={{ color: "#be627b", marginTop: 12, fontWeight: 500 }}>
            Đã gửi liên hệ thành công! Xin cảm ơn bạn 💌
          </div>
        )}
      </form>
    </div>
  );
}
export default Contact;
