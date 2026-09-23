/* src/App.jsx */
import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ProductList } from './components/productList';
import { CartPage } from './components/CartPage';
import { ProductDetail } from './components/ProductDetail';
import './App.css';
import './index.css';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('vitrine_alegre_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'cart', 'detail'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Persistência do carrinho no localStorage
  useEffect(() => {
    localStorage.setItem('vitrine_alegre_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [...prev, { ...product, quantity: qty }];
      }
    });
  };

  const handleUpdateQuantity = (productId, delta) => {
    setCartItems((prev) => {
      return prev.map((item) => {
        if (item.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const changePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="app-container">
      <Navbar 
        cartCount={totalCartCount} 
        onCartClick={() => changePage('cart')}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onHomeClick={() => {
          changePage('home');
          setSearchTerm('');
        }}
      />
      
      <main className="main-content">
        {currentPage === 'home' && (
          <ProductList 
            onAddToCart={handleAddToCart} 
            onSelectProduct={handleSelectProduct}
            searchTerm={searchTerm} 
          />
        )}
        {currentPage === 'detail' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            onBack={() => changePage('home')}
          />
        )}
        {currentPage === 'cart' && (
          <CartPage 
            cartItems={cartItems} 
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onBackToShop={() => changePage('home')}
            onSelectProduct={handleSelectProduct}
          />
        )}
      </main>

      <footer className="site-footer">
        <div className="footer-content">
          <div className="logo-brand" onClick={() => { changePage('home'); setSearchTerm(''); }} style={{ cursor: 'pointer' }}>
            <span className="logo-icon">V</span>
            <span className="logo-text">Vitrine Alegre</span>
          </div>
          <p className="footer-info">Projeto acadêmico · Ifes Campus de Alegre · TADS</p>
          <div className="footer-credits">
            <span>Dados: dummyjson.com</span>
            <span>Imagens e produtos são fictícios</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;