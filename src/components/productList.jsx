/* src/components/productList.jsx */
import { useState, useEffect } from 'react';
import './productList.css';

export function ProductList({ onAddToCart, onSelectProduct, searchTerm, onResetFilters }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error('Erro ao buscar categorias:', err));
  }, []);

  const fetchProducts = () => {
    let url = 'https://dummyjson.com/products?limit=20';
    if (selectedCategory !== 'all') {
      url = `https://dummyjson.com/products/category/${selectedCategory}`;
    }
    if (searchTerm) {
      url = `https://dummyjson.com/products/search?q=${searchTerm}`;
    }

    setLoading(true);
    setError(false);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Falha na rede');
        return res.json();
      })
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar produtos:', err);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchTerm]);

  return (
    <div className="catalog-container">
      <div className="categories-wrapper">
        <button 
          className={`category-pill ${selectedCategory === 'all' && !searchTerm ? 'active' : ''}`}
          onClick={() => {
            setSelectedCategory('all');
            if (onResetFilters) onResetFilters();
          }}
        >
          Todas
        </button>
        {categories.slice(0, 7).map((cat) => {
          const catSlug = typeof cat === 'string' ? cat : cat.slug;
          const catName = typeof cat === 'string' ? cat : cat.name;
          return (
            <button 
              key={catSlug}
              className={`category-pill ${selectedCategory === catSlug ? 'active' : ''}`}
              onClick={() => setSelectedCategory(catSlug)}
            >
              {catName}
            </button>
          );
        })}
        <span className="category-more">+16</span>
        <div className="sort-selector">
          <span>Ordenar: Relevância ▾</span>
        </div>
      </div>

      <div className="catalog-info-bar">
        <span>{products.length} produtos encontrados</span>
      </div>

      {loading ? (
        <div className="product-grid">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="product-card skeleton-card" style={{ height: '320px', background: '#f1f5f9', borderRadius: '12px' }} />
          ))}
        </div>
      ) : error ? (
        <div className="error-state" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>
            Não foi possível carregar os produtos
          </h2>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
            Verifique sua conexão e tente de novo.
          </p>
          <button 
            onClick={fetchProducts}
            style={{ background: '#a3e635', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
          >
            Tentar novamente
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="empty-search-state" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: '36px', marginBottom: '16px' }}>🔍</div>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>
            Nenhum produto encontrado
          </h2>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
            Tente outro termo ou limpe os filtros.
          </p>
          <button 
            onClick={() => {
              setSelectedCategory('all');
              if (onResetFilters) onResetFilters();
            }}
            style={{ background: 'transparent', border: '1px solid #cbd5e1', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', color: '#1e293b' }}
          >
            Limpar busca
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => {
            const discount = product.discountPercentage || 10;
            const originalPrice = (product.price / (1 - discount / 100)).toFixed(2);
            return (
              <article 
                key={product.id} 
                className="product-card"
                onClick={() => onSelectProduct(product)}
                style={{ cursor: 'pointer' }}
              >
                <span className="discount-badge">
                  -{Math.round(discount)}%
                </span>
                <div className="product-img-container">
                  <img 
                    src={product.thumbnail} 
                    alt={product.title} 
                    className="product-img"
                  />
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-title">{product.title}</h3>
                  <div className="product-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-score">{product.rating || '4.0'}</span>
                  </div>
                  <div className="product-pricing">
                    <span className="original-price">R$ {originalPrice.replace('.', ',')}</span>
                    <span className="final-price">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <button 
                    className="buy-button" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product, 1);
                    }}
                  >
                    Adicionar
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}