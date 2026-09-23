/* src/components/ProductDetail.jsx */
import { useState, useEffect } from 'react';
import './ProductDetail.css';

export function ProductDetail({ product, onAddToCart, onBack, onSelectProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setSelectedImage(product.thumbnail);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Busca produtos da mesma categoria para exibir como relacionados
    const categoryEndpoint = product.category 
      ? `https://dummyjson.com/products/category/${product.category}?limit=4`
      : 'https://dummyjson.com/products?limit=4';

    fetch(categoryEndpoint)
      .then((res) => res.json())
      .then((data) => {
        const filtered = (data.products || []).filter(p => p.id !== product.id).slice(0, 4);
        setRelatedProducts(filtered);
      })
      .catch((err) => console.error('Erro ao buscar produtos relacionados:', err));
  }, [product]);

  const discount = product.discountPercentage || 10;
  const originalPrice = (product.price / (1 - discount / 100)).toFixed(2);
  const installmentPrice = (product.price / 12).toFixed(2);

  return (
    <div className="product-detail-container">
      {/* Breadcrumbs */}
      <nav className="detail-breadcrumbs">
        <span onClick={onBack} style={{ cursor: 'pointer' }}>Início</span> &gt;{' '}
        <span>{product.category}</span> &gt;{' '}
        <span className="current-crumb">{product.title}</span>
      </nav>
      
      <div className="product-detail-grid">
        <div className="product-gallery">
          <div className="main-image-container">
            <img src={selectedImage} alt={product.title} className="main-detail-img" />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="thumbnail-list">
              {product.images.map((img, idx) => (
                <img 
                  key={idx} 
                  src={img} 
                  alt="" 
                  className={`thumb-item ${selectedImage === img ? 'active' : ''}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-detail-info">
          <span className="detail-category">{product.category?.toUpperCase()}</span>
          <h1 className="detail-title">{product.title}</h1>
          
          <div className="product-meta-sub">
            {product.brand && <span>Marca: <strong>{product.brand}</strong></span>}
            {product.sku && <span>SKU: <strong>{product.sku}</strong></span>}
          </div>

          <div className="product-rating">
            <span className="stars">★★★★★</span>
            <span className="rating-score">{product.rating || '4.0'} {product.reviews ? `· ${product.reviews.length} avaliações` : ''}</span>
          </div>

          <div className="detail-pricing">
            <span className="original-price">R$ {originalPrice.replace('.', ',')} economize R$ {(originalPrice - product.price).toFixed(2).replace('.', ',')}</span>
            <div className="final-price-row">
              <span className="final-price">R$ {product.price.toFixed(2).replace('.', ',')}</span>
              <span className="discount-badge">-{Math.round(discount)}%</span>
            </div>
            <span className="installment-text">em até 12x de R$ {installmentPrice.replace('.', ',')} sem juros</span>
          </div>

          <div className="stock-status-indicator">
            <span className="stock-dot">🟢</span> {product.stock > 0 ? `${product.stock} em estoque · In Stock` : 'Indisponível'}
          </div>

          <div className="purchase-actions">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
            <button className="add-cart-detail-btn" onClick={() => onAddToCart(product, quantity)}>
              Adicionar ao carrinho
            </button>
          </div>

          <div className="product-badges-row">
            <div className="badge-box">
              <span className="badge-box-title">ENVIO</span>
              <span className="badge-box-desc">{product.shippingInformation || 'Envio padrão'}</span>
            </div>
            <div className="badge-box">
              <span className="badge-box-title">GARANTIA</span>
              <span className="badge-box-desc">{product.warrantyInformation || 'Garantia padrão'}</span>
            </div>
            <div className="badge-box">
              <span className="badge-box-title">DEVOLUÇÃO</span>
              <span className="badge-box-desc">{product.returnPolicy || 'Política padrão'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Seção Inferior: Descrição, Especificações e Avaliações */}
      <div className="product-bottom-sections">
        <div className="bottom-grid-two">
          <div className="section-card">
            <h3>Descrição</h3>
            <p>{product.description}</p>
            {product.tags && (
              <div className="product-tags">
                {product.tags.map((tag, i) => (
                  <span key={i}>#{tag} </span>
                ))}
              </div>
            )}
          </div>

          <div className="section-card">
            <h3>Especificações</h3>
            <div className="specs-table">
              {product.weight && <div className="spec-row"><span>Peso</span><strong>{product.weight} kg</strong></div>}
              {product.dimensions && (
                <div className="spec-row">
                  <span>Dimensões</span>
                  <strong>{product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm</strong>
                </div>
              )}
              <div className="spec-row"><span>Estoque</span><strong>{product.stock} unidades</strong></div>
              {product.minimumOrderQuantity && <div className="spec-row"><span>Pedido mínimo</span><strong>{product.minimumOrderQuantity} unidades</strong></div>}
            </div>
          </div>
        </div>

        {product.reviews && product.reviews.length > 0 && (
          <div className="section-card reviews-section">
            <h3>Avaliações ({product.reviews.length})</h3>
            <div className="reviews-grid">
              {product.reviews.map((rev, i) => (
                <div key={i} className="review-card">
                  <div className="review-header">
                    <span className="reviewer-avatar">{rev.reviewerName?.charAt(0) || 'U'}</span>
                    <div>
                      <strong>{rev.reviewerName}</strong>
                      <span className="review-date">{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="stars">{'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}</div>
                  <p>{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Seção de Produtos Relacionados */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h3>Produtos relacionados</h3>
            <div className="product-grid">
              {relatedProducts.map((relProduct) => {
                const relDiscount = relProduct.discountPercentage || 10;
                const relOriginalPrice = (relProduct.price / (1 - relDiscount / 100)).toFixed(2);
                return (
                  <article 
                    key={relProduct.id} 
                    className="product-card"
                    onClick={() => onSelectProduct && onSelectProduct(relProduct)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="discount-badge">
                      -{Math.round(relDiscount)}%
                    </span>
                    <div className="product-img-container">
                      <img 
                        src={relProduct.thumbnail} 
                        alt={relProduct.title} 
                        className="product-img"
                      />
                    </div>
                    <div className="product-info">
                      <span className="product-category">{relProduct.category}</span>
                      <h3 className="product-title">{relProduct.title}</h3>
                      <div className="product-rating">
                        <span className="stars">★★★★★</span>
                        <span className="rating-score">{relProduct.rating || '4.0'}</span>
                      </div>
                      <div className="product-pricing">
                        <span className="original-price">R$ {relOriginalPrice.replace('.', ',')}</span>
                        <span className="final-price">R$ {relProduct.price.toFixed(2).replace('.', ',')}</span>
                      </div>
                      <button 
                        className="buy-button" 
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(relProduct, 1);
                        }}
                      >
                        Adicionar
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}