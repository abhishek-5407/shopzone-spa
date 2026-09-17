import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, CheckCircle2, CreditCard, Truck, Lock, ArrowLeft, ShoppingBag } from 'lucide-react';

export const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    address: '123 Residency Tech Park, Sector 62',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201301',
    phone: '8851407750',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const generatedId = `SZ-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="page-checkout order-success-view">
        <div className="order-success-card">
          <div className="success-badge-icon">
            <CheckCircle2 size={64} />
          </div>
          <h2>Order Confirmed!</h2>
          <p className="order-ref-text">
            Order Reference ID: <strong>#{orderId}</strong>
          </p>
          <p className="success-description">
            Thank you, <strong>{shippingInfo.fullName}</strong>. Your order has been placed successfully. A confirmation email has been dispatched to <strong>{user?.email}</strong>.
          </p>
          <div className="order-details-summary">
            <div><strong>Shipping Address:</strong> {shippingInfo.address}, {shippingInfo.city}</div>
            <div><strong>Payment Method:</strong> {paymentMethod.toUpperCase()}</div>
          </div>
          <div className="success-actions">
            <button
              type="button"
              className="btn btn-primary btn-large"
              onClick={() => navigate('/shop')}
            >
              Continue Shopping
            </button>
            <Link to="/" className="btn btn-secondary btn-large">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="page-checkout empty-checkout-view">
        <div className="empty-cart-card">
          <ShoppingBag size={48} />
          <h2>Your Cart is Empty</h2>
          <p>Add products to your cart before proceeding to checkout.</p>
          <Link to="/shop" className="btn btn-primary">
            Browse Shop Inventory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-checkout">
      <div className="checkout-header">
        <div className="checkout-header-container">
          <span className="protected-route-badge">
            <ShieldCheck size={16} /> Protected Route Guard Active
          </span>
          <h1>Checkout & Order Placement</h1>
          <p>Logged in as: <strong>{user?.name}</strong> ({user?.email})</p>
        </div>
      </div>

      <div className="checkout-main-container">
        {/* Shipping & Payment Form */}
        <div className="checkout-form-area">
          <form onSubmit={handlePlaceOrder} className="checkout-form">
            <section className="form-section">
              <div className="section-title">
                <Truck size={20} />
                <h3>1. Shipping Information</h3>
              </div>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={shippingInfo.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Pincode / Zip</label>
                  <input
                    type="text"
                    name="pincode"
                    value={shippingInfo.pincode}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Contact Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </section>

            <section className="form-section">
              <div className="section-title">
                <CreditCard size={20} />
                <h3>2. Payment Method</h3>
              </div>

              <div className="payment-options-grid">
                <label className={`payment-option-card ${paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="payment-svg-icon">
                    <rect x="2" y="6" width="28" height="20" rx="4" fill="url(#cardGrad)" />
                    <rect x="2" y="12" width="28" height="4" fill="#1E293B" />
                    <circle cx="20" cy="21" r="3" fill="#EB001B" opacity="0.9" />
                    <circle cx="24" cy="21" r="3" fill="#F79E1B" opacity="0.9" />
                    <defs>
                      <linearGradient id="cardGrad" x1="2" y1="6" x2="30" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#4F46E5" />
                        <stop offset="1" stopColor="#7C3AED" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div>
                    <strong>Credit / Debit Card</strong>
                    <span>Visa, Mastercard, RuPay</span>
                  </div>
                </label>

                <label className={`payment-option-card ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="payment-svg-icon">
                    <rect x="2" y="6" width="28" height="20" rx="4" fill="url(#upiGrad)" />
                    <path d="M12 11L16 19L20 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 15H23" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="upiGrad" x1="2" y1="6" x2="30" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#059669" />
                        <stop offset="1" stopColor="#10B981" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div>
                    <strong>UPI / QR Code</strong>
                    <span>GPay, PhonePe, Paytm</span>
                  </div>
                </label>

                <label className={`payment-option-card ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="payment-svg-icon">
                    <rect x="2" y="6" width="28" height="20" rx="4" fill="url(#codGrad)" />
                    <circle cx="16" cy="16" r="4" stroke="white" strokeWidth="2" fill="none" />
                    <path d="M8 16H8.01M24 16H24.01" stroke="white" strokeWidth="3" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="codGrad" x1="2" y1="6" x2="30" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#D97706" />
                        <stop offset="1" stopColor="#F59E0B" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div>
                    <strong>Cash On Delivery</strong>
                    <span>Pay at doorstep</span>
                  </div>
                </label>
              </div>
            </section>

            <div className="checkout-form-actions">
              <Link to="/cart" className="btn btn-secondary">
                <ArrowLeft size={16} />
                <span>Return to Cart</span>
              </Link>
              <button type="submit" className="btn btn-primary btn-large">
                <Lock size={18} />
                <span>Place Order (₹{Math.round(totalPrice).toLocaleString('en-IN')})</span>
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary Box */}
        <div className="checkout-summary-sidebar">
          <div className="summary-card">
            <h3>Items in Order ({cart.length})</h3>
            <div className="summary-divider"></div>

            <div className="checkout-items-preview">
              {cart.map((item) => (
                <div key={item.id} className="checkout-item-mini">
                  <img src={item.thumbnail} alt={item.title} />
                  <div className="mini-info">
                    <span className="mini-title">{item.title}</span>
                    <span className="mini-meta">{item.quantity} x ₹{Math.round(item.price).toLocaleString('en-IN')}</span>
                  </div>
                  <span className="mini-subtotal">₹{Math.round(item.quantity * item.price).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total-row">
              <span>Total Payable:</span>
              <span className="final-price-text">₹{Math.round(totalPrice).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
