/* src/components/CartPage.jsx */
import './CartPage.css';

export function CartPage({ cartItems, onUpdateQuantity, onRemoveFromCart, onBackToShop, onSelectProduct }) {
  const totalProductsCount = cartItems.length;
  const totalUnitsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce((acc, item) => {
    const orig = item.discountPercentage 
      ? item.price / (1 - item.discountPercentage / 100) 
      : item.price;
    return acc + (orig * item.quantity);
  }, 0);

  const finalTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalDiscount = subtotal - finalTotal;
  const installment = (finalTotal / 12).toFixed(2);

  return (
    <div className="cart-page-container">
      <div className="cart-page-content">
        {cartItems.length === 0 ? (
          <div className="empty-cart-state">
            <h2 className="cart-main-title">Seu carrinho</h2>
            <div className="empty-cart-box">
              <div className="empty-cart-icon">🛒</div>
              <h3>Seu carrinho está vazio</h3>
              <p>Escolha um produto na vitrine para começar.</p>
              <button className="buy-now-btn" onClick={onBackToShop}>
                Ir para a vitrine
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="cart-page-header">
              <div>
                <h2>Seu carrinho</h2>
                <span className="cart-count-subtitle">
                  {totalProductsCount} {totalProductsCount === 1 ? 'produto' : 'produtos'} · {totalUnitsCount} {totalUnitsCount === 1 ? 'unidade' : 'unidades'}
                </span>
              </div>
              <button className="back-shop-btn" onClick={onBackToShop}>
                Continuar comprando ›
              </button>
            </div>

            <div className="cart-layout">
              <div className="cart-items-list">
                {cartItems.map((item) => {
                  const unitPrice = item.price;
                  const itemTotal = unitPrice * item.quantity;
                  return (
                    <div key={item.id} className="cart-item-row">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        className="cart-item-img clickable-img" 
                        onClick={() => onSelectProduct && onSelectProduct(item)}
                        title="Ver detalhes do produto"
                      />
                      <div className="cart-item-details">
                        <span className="cart-item-cat">{item.category?.toUpperCase()}</span>
                        <h3 
                          className="clickable-title" 
                          onClick={() => onSelectProduct && onSelectProduct(item)}
                          title="Ver detalhes do produto"
                        >
                          {item.title}
                        </h3>
                        <span className="cart-item-unit-price">R$ {unitPrice.toFixed(2).replace('.', ',')} cada</span>
                        
                        {/* Botão explícito para voltar ao produto */}
                        {onSelectProduct && (
                          <button 
                            className="back-to-product-btn" 
                            onClick={() => onSelectProduct(item)}
                          >
                            ← Ver detalhes do produto
                          </button>
                        )}
                      </div>
                      
                      <div className="cart-item-qty-control">
                        <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                      </div>

                      <div className="cart-item-price-area">
                        <span className="cart-item-price">R$ {itemTotal.toFixed(2).replace('.', ',')}</span>
                        <button className="remove-item-btn" onClick={() => onRemoveFromCart(item.id)} title="Remover item">
                          ✕
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="cart-summary-card">
                <h3>Resumo do pedido</h3>
                <div className="summary-line">
                  <span>Subtotal ({totalUnitsCount} {totalUnitsCount === 1 ? 'item' : 'itens'})</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="summary-line discount-line">
                    <span>Descontos</span>
                    <span className="discount-value">- R$ {totalDiscount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                <div className="summary-line">
                  <span>Frete</span>
                  <span className="free-shipping">Grátis</span>
                </div>
                <hr className="summary-divider" />
                <div className="summary-total">
                  <span>Total</span>
                  <div>
                    <strong>R$ {finalTotal.toFixed(2).replace('.', ',')}</strong>
                    <span className="installment-summary">em até 12x de R$ {installment.replace('.', ',')}</span>
                  </div>
                </div>
                <button className="checkout-page-btn">
                  Finalizar compra
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}