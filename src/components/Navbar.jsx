/* src/components/Navbar.jsx */
import './Navbar.css';

export function Navbar({ cartCount, onCartClick, searchTerm, setSearchTerm, onHomeClick }) {
  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <div className="logo-brand" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
          <span className="logo-icon">V</span>
          <span className="logo-text">Vitrine Alegre</span>
        </div>
        
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Buscar produtos..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="clear-search-btn" 
              onClick={() => setSearchTerm('')}
              title="Limpar busca"
            >
              ✕
            </button>
          )}
        </div>

        <div className="navbar-actions">
          <button className="login-btn">Entrar</button>
          <button className="cart-btn" onClick={onCartClick}>
            <span className="cart-icon">🛒</span>
            <span>Carrinho</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}