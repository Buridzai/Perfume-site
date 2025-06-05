import { useState } from "react";
import ProductDetailModal from "../components/ProductDetailModal";
import { useAuth } from "../contexts/useAuth";
import { apiPost } from "../utils/api";
import "../assets/css/ProductList.css";

const products = [
  {
    id: 1,
    name: "Chanel No.5",
    price: 2900000,
    description: "Hương thơm kinh điển, quyến rũ & sang trọng bậc nhất thế giới.",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/af48ac95889975.5ea4495e81a85.jpg",
  },
  {
    id: 2,
    name: "Dior Sauvage",
    price: 2500000,
    description: "Năng động, cá tính, cuốn hút – biểu tượng của nam tính hiện đại.",
    image: "https://blog.atome.id/wp-content/uploads/2022/06/Cek-harga-Dior-Sauvage-parfum-pria-dengan-wangi-maskulin.jpg",
  },
  {
    id: 3,
    name: "Gucci Bloom",
    price: 2200000,
    description: "Hoa nhài và hoa huệ trắng thanh tao, ngọt dịu và nữ tính.",
    image: "https://th.bing.com/th/id/OIP.HMPSCQBUKsiJiWduRzk2MwAAAA?w=450&h=450&rs=1&pid=ImgDetMain",
  },
];

function ProductList() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { user } = useAuth();

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      await apiPost("/api/cart", { product_id: productId, quantity: 1 }, token);
      alert("🛒 Đã thêm vào giỏ hàng!");
    } catch (err) {
      console.error("Lỗi khi thêm giỏ hàng:", err);
      alert("❌ Lỗi thêm vào giỏ.");
    }
  };

  const handleBuyNow = async (productId) => {
  const token = localStorage.getItem("token");
  try {
    await apiPost("/api/orders", {
      items: [{ product_id: productId, quantity: 1 }],
    }, token);
    alert("✅ Đặt hàng thành công!");
  } catch (err) {
    console.error("Lỗi thêm giỏ hàng:", err);
    alert("❌ Lỗi đặt hàng");
  }
};



  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Danh sách nước hoa</h2>
      <div className="product-grid">
        {products.map((p) => (
          <div className="product-card" key={p.id}>
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="price">{p.price.toLocaleString()}₫</p>
            <button className="btn" onClick={() => setSelectedProduct(p)}>
              Xem chi tiết
            </button>

            {user && (
              <div style={{ display: "flex", gap: "8px", marginTop: 10 }}>
                <button className="btn" onClick={() => handleAddToCart(p.id)}>🛒 Thêm vào giỏ</button>
                <button className="btn" onClick={() => handleBuyNow(p.id)}>💳 Mua ngay</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default ProductList;
