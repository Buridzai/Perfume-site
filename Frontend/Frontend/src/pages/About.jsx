// src/pages/About.jsx
import React from "react";
import "../assets/css/About.css";

function About() {
  return (
    <div className="about-page">
      <div className="about-card">
        <h1>Giới thiệu về T&amp;N Essence</h1>
        <p className="about-intro">
          <strong>T&amp;N Essence</strong> là thương hiệu nước hoa chuyên nghiệp,
          lấy cảm hứng từ vẻ đẹp tinh tế của hoa anh đào Nhật Bản.
        </p>
        <p className="about-mission">
          Chúng tôi tin rằng:{" "}
          <em>“Mỗi người đều xứng đáng có một mùi hương đặc trưng cho chính mình.”</em>
          <br />
          T&amp;N Essence mang đến bộ sưu tập nước hoa chính hãng, đa dạng phong cách:
          từ cổ điển quyến rũ, đến trẻ trung, năng động và dịu dàng tinh tế.
        </p>

        <ul className="about-list">
          <li>Cam kết sản phẩm chính hãng, nguồn gốc rõ ràng</li>
          <li>Chính sách đổi trả linh hoạt, tư vấn tận tâm</li>
          <li>Truyền cảm hứng yêu thương và tự tin mỗi ngày</li>
        </ul>

        <p className="about-closing">
          Đến với T&amp;N Essence –{" "}
          <span className="highlight">lan tỏa hương thơm, khơi nguồn cảm xúc!</span>
        </p>
      </div>
    </div>
  );
}

export default About;
