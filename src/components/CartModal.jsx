/* src/components/CartModal.jsx */
import './CartModal.css';

export function CartModal({ isOpen, onClose, cartItems, onRemoveFromCart }) {
  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Seu carrinho</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="cart-items-list">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Seu carrinho está vazio.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} className="cart-item-img" />
                <div className="cart-item-info">
                  <h4>{item.title}</h4>
                  <span className="cart-item-price">
                    {item.quantity}x R$ {item.price.toFixed(2).replace('.', ',')} = <strong>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</strong>
                  </span>
                </div>
                <button className="remove-btn" onClick={() => onRemoveFromCart(item.id)}>Remover</button>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <strong>R$ {total.toFixed(2).replace('.', ',')}</strong>
          </div>
          <button className="checkout-btn" disabled={cartItems.length === 0}>
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}