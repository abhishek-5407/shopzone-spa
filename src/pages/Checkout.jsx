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
                  <label>Contact Phone (Mandatory Sync Reference)</label>
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
                  <CreditCard size={24} />
                  <div>
                    <strong>Credit / Debit Card</strong>
                    <span>Instant mock gateway</span>
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
                  <Lock size={24} />
                  <div>
                    <strong>UPI / NetBanking</strong>
                    <span>GPay, PhonePe, Paytm</span>
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
                <span>Place Order (${totalPrice.toFixed(2)})</span>
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
                    <span className="mini-meta">{item.quantity} x ${item.price.toFixed(2)}</span>
                  </div>
                  <span className="mini-subtotal">${(item.quantity * item.price).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total-row">
              <span>Total Payable:</span>
              <span className="final-price-text">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
