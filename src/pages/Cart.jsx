import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (promoCode.trim().toUpperCase() === 'SHOPZONE10' || promoCode.trim().toUpperCase() === 'NAKUL10') {
      setDiscountPercent(10);
      setPromoSuccess('10% Discount Coupon Applied Successfully!');
    } else if (promoCode.trim().toUpperCase() === 'RESIDENCY20') {
      setDiscountPercent(20);
      setPromoSuccess('20% Engineering Residency Discount Applied!');
    } else {
      setPromoError('Invalid promo code. Try "SHOPZONE10" or "RESIDENCY20".');
    }
  };

  const discountAmount = (totalPrice * discountPercent) / 100;
  const finalTotal = totalPrice - discountAmount;

  if (cart.length === 0) {
    return (
      <div className="page-cart empty-cart-view">
        <div className="empty-cart-card">
          <div className="empty-cart-icon-wrap">
            <ShoppingBag size={48} />
          </div>
          <h2>Your Cart is Empty</h2>
          <p>You haven't added any products to your shopping cart yet.</p>
          <Link to="/shop" className="btn btn-primary btn-large">
            <ArrowLeft size={18} />
            <span>Explore Shop Inventory</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-cart">
      <div className="cart-header">
        <div className="cart-header-container">
          <h1>Your Shopping Cart</h1>
          <p>Manage selected items and review order total prior to checkout.</p>
        </div>
      </div>

      <div className="cart-main-container">
        {/* Cart Items List */}
        <div className="cart-items-list-area">
          <div className="cart-table-header">
            <span>Product</span>
            <span className="col-price">Price</span>
            <span className="col-qty">Quantity</span>
            <span className="col-total">Subtotal</span>
            <span className="col-action">Action</span>
          </div>

          <div className="cart-items-rows">
            {cart.map((item) => {
              const itemSubtotal = item.price * item.quantity;
              return (
                <div key={item.id} className="cart-item-row">
                  <div className="cart-item-info">
                    <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
                    <div>
                      <h4 className="cart-item-title">
                        <Link to={`/product/${item.id}`}>{item.title}</Link>
                      </h4>
                      <span className="cart-item-category">{item.category}</span>
                    </div>
                  </div>

                  <div className="col-price cart-item-price">
                    ₹{Math.round(item.price).toLocaleString('en-IN')}
                  </div>

                  <div className="col-qty cart-item-qty">
                    <div className="quantity-selector compact">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease item quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase item quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="col-total cart-item-subtotal">
                    ₹{Math.round(itemSubtotal).toLocaleString('en-IN')}
                  </div>

                  <div className="col-action cart-item-remove">
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-list-actions">
            <Link to="/shop" className="btn btn-secondary">
              <ArrowLeft size={16} />
              <span>Continue Shopping</span>
            </Link>
            <button type="button" className="btn btn-outline-danger" onClick={clearCart}>
              <Trash2 size={16} />
              <span>Clear Cart</span>
            </button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="cart-summary-sidebar">
          <div className="summary-card">
            <h3>Order Summary</h3>
            <div className="summary-divider"></div>

            <div className="summary-row">
              <span>Items Total ({totalItems}):</span>
              <span>₹{Math.round(totalPrice).toLocaleString('en-IN')}</span>
            </div>

            <div className="summary-row">
              <span>Shipping Fee:</span>
              <span className="free-shipping">FREE</span>
            </div>

            {discountPercent > 0 && (
              <div className="summary-row discount-row">
                <span>Discount ({discountPercent}%):</span>
                <span>-₹{Math.round(discountAmount).toLocaleString('en-IN')}</span>
              </div>
            )}

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="promo-code-form">
              <label htmlFor="promoInput">Promo Code</label>
              <div className="promo-input-group">
                <input
                  id="promoInput"
                  type="text"
                  placeholder="e.g. SHOPZONE10"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button type="submit" className="btn btn-dark">Apply</button>
              </div>
              {promoSuccess && <p className="promo-feedback success">{promoSuccess}</p>}
              {promoError && <p className="promo-feedback error">{promoError}</p>}
            </form>

            <div className="summary-divider"></div>

            <div className="summary-row total-row">
              <span>Aggregate Total:</span>
              <span className="final-price-text">₹{Math.round(finalTotal).toLocaleString('en-IN')}</span>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-large btn-block"
              onClick={() => navigate('/checkout')}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <div className="checkout-security-notice">
              <ShieldCheck size={16} />
              <span>Protected route navigation requires authentication.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
