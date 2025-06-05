import "../assets/css/ProductDetailModal.css";

function ProductDetailModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <img className="modal-image" src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <p className="modal-price">{product.price.toLocaleString()}₫</p>
        <p className="modal-description">{product.description}</p>
        {/* Bạn có thể thêm nút mua hàng hoặc chia sẻ ở đây */}
      </div>
    </div>
  );
}

export default ProductDetailModal;
