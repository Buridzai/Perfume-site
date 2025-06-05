import React, { useState, useEffect } from "react";
import "../assets/css/Home.css";

function Home() {
  // Mảng URL ảnh (thay bằng link thật của bạn)
  const images = [
    "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/af48ac95889975.5ea4495e81a85.jpg",
    "https://blog.atome.id/wp-content/uploads/2022/06/Cek-harga-Dior-Sauvage-parfum-pria-dengan-wangi-maskulin.jpg",
    "https://mir-s3-cdn-cf.behance.net/project_modules/fs/ee930f66399247.5b153f063db9d.jpg",
    // Thêm link ảnh khác tại đây...
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  const goToIndex = (idx) => {
    setCurrentIndex(idx);
  };

  return (
    <div className="home-page">
      <div className="carousel-wrapper">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Slide ${idx + 1}`}
            className={`carousel-image ${idx === currentIndex ? "active" : ""}`}
          />
        ))}
      </div>

      <div className="carousel-dots">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`carousel-dot ${idx === currentIndex ? "active" : ""}`}
            onClick={() => goToIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <div className="home-text">
        <h1>Chào mừng đến với T&amp;N Essence</h1>
        <h2>Hương thơm &amp; cảm xúc như Sakura Nhật Bản</h2>
        <p>
          Khám phá bộ sưu tập nước hoa cao cấp, tinh tế và dịu dàng. Mỗi hương
          mang một câu chuyện, đánh thức mọi giác quan của bạn.
        </p>
        {/* Ví dụ nếu bạn muốn thêm nút khám phá:
        <a href="/products" className="btn-explore">Khám phá ngay</a>
        */}
      </div>
    </div>
  );
}

export default Home;
