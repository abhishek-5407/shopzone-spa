import { Link } from 'react-router-dom';
import { Sparkles, Phone, Mail, MapPin, Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-trust-bar">
        <div className="trust-container">
          <div className="trust-item">
            <Truck size={24} className="trust-icon" />
            <div>
              <h4>Free Express Shipping</h4>
              <p>On all orders over ₹500</p>
            </div>
          </div>
          <div className="trust-item">
            <ShieldCheck size={24} className="trust-icon" />
            <div>
              <h4>Secure Payment</h4>
              <p>100% encrypted checkout</p>
            </div>
          </div>
          <div className="trust-item">
            <RefreshCw size={24} className="trust-icon" />
            <div>
              <h4>30-Day Money Back</h4>
              <p>Hassle-free returns</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-col brand-col">
            <Link to="/" className="navbar-brand text-light">
              <Sparkles size={20} className="brand-sparkle" />
              <span className="brand-text">
                Shop<span className="brand-accent">Zone</span>
              </span>
            </Link>
            <p className="brand-tagline">
              Modern enterprise e-commerce platform built with React Router v7 and client-side global state management.
            </p>
            <div className="sync-footer-notice">
              <Phone size={14} />
              <span>Mandatory 1-on-1 Sync: <strong>8851407750</strong> (Mr. Nakul)</span>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home View</Link></li>
              <li><Link to="/shop">Shop Inventory</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
              <li><Link to="/contact">Contact Support</Link></li>
              <li><Link to="/login">Guest Login</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Top Categories</h4>
            <ul className="footer-links">
              <li><Link to="/shop">Beauty & Cosmetics</Link></li>
              <li><Link to="/shop">Fragrances & Perfumes</Link></li>
              <li><Link to="/shop">Luxury Furniture</Link></li>
              <li><Link to="/shop">Groceries & Essentials</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Engineering Residency</h4>
            <ul className="footer-contact">
              <li><MapPin size={16} /> ShopZone Residency HQ</li>
              <li><Mail size={16} /> support@shopzone.io</li>
              <li><Phone size={16} /> 8851407750 (Mr. Nakul)</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-container bottom-flex">
            <p>&copy; {new Date().getFullYear()} ShopZone SPA. Crafted for Enterprise Engineering Residency Phase 3.</p>
            <p className="dev-credit">
              Built with <Heart size={14} className="heart-icon" /> React 19 & React Router v7
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
