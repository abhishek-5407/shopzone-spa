import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, User, LogOut, Menu, X, Sparkles, Compass, Home, LayoutGrid, Mail } from 'lucide-react';

export const Navbar = () => {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="navbar-header">
        <div className="navbar-container">
          {/* Brand Logo */}
          <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
            <div className="brand-icon-wrapper">
              <Sparkles size={22} className="brand-sparkle" />
            </div>
            <span className="brand-text">
              Shop<span className="brand-accent">Zone</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="navbar-nav desktop-nav">
            <NavLink 
              to="/" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end
            >
              Home
            </NavLink>
            <NavLink 
              to="/shop" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Shop Inventory
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Contact
            </NavLink>
          </nav>

          {/* Action Controls (Cart, User Auth, Mobile Toggle) */}
          <div className="navbar-actions">
            {/* Global Shopping Cart Button with Dynamic Badge */}
            <Link to="/cart" className="cart-badge-button" title="View Shopping Cart">
              <ShoppingBag size={22} />
              <span className="cart-badge-count">{totalItems}</span>
            </Link>

            {/* User Auth Control */}
            {isAuthenticated ? (
              <div className="user-dropdown-wrapper">
                <button
                  type="button"
                  className="user-profile-button"
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
                  title="Account Menu"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                    alt={user?.name || 'User Avatar'}
                    className="user-avatar-img"
                  />
                  <span className="user-name-text">{user?.name?.split(' ')[0]}</span>
                </button>

                {userDropdownOpen && (
                  <div className="user-dropdown-menu">
                    <div className="dropdown-header">
                      <p className="dropdown-user-name">{user?.name}</p>
                      <p className="dropdown-user-email">{user?.email}</p>
                      <span className="dropdown-user-role">{user?.role}</span>
                    </div>
                    <hr className="dropdown-divider" />
                    <Link
                      to="/checkout"
                      className="dropdown-item"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <Compass size={16} />
                      <span>Checkout</span>
                    </Link>
                    <button
                      type="button"
                      className="dropdown-item logout"
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="login-nav-btn desktop-only-auth">
                <User size={18} />
                <span>Login / Guest</span>
              </Link>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Side Drawer Overlay (Outside header to avoid backdrop-filter stacking context traps) */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={closeMobileMenu}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="navbar-brand">
                <div className="brand-icon-wrapper">
                  <Sparkles size={18} className="brand-sparkle" />
                </div>
                <span className="brand-text">
                  Shop<span className="brand-accent">Zone</span>
                </span>
              </div>
              <button
                type="button"
                className="close-drawer"
                onClick={closeMobileMenu}
                aria-label="Close mobile navigation"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mobile-drawer-body">
              <nav className="mobile-nav-list">
                <NavLink
                  to="/"
                  onClick={closeMobileMenu}
                  className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                  end
                >
                  <Home size={18} />
                  <span>Home</span>
                </NavLink>
                <NavLink
                  to="/shop"
                  onClick={closeMobileMenu}
                  className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                >
                  <LayoutGrid size={18} />
                  <span>Shop Inventory</span>
                </NavLink>
                <NavLink
                  to="/contact"
                  onClick={closeMobileMenu}
                  className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                >
                  <Mail size={18} />
                  <span>Contact Support</span>
                </NavLink>
                <NavLink
                  to="/cart"
                  onClick={closeMobileMenu}
                  className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                >
                  <ShoppingBag size={18} />
                  <span>Shopping Cart</span>
                  {totalItems > 0 && <span className="mobile-cart-badge">{totalItems}</span>}
                </NavLink>
              </nav>

              <div className="mobile-drawer-divider" />

              <div className="mobile-user-section">
                {isAuthenticated ? (
                  <div className="mobile-user-card">
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                      alt={user?.name || 'User Avatar'}
                      className="user-avatar-img"
                    />
                    <div className="mobile-user-info">
                      <p className="mobile-user-name">{user?.name}</p>
                      <p className="mobile-user-email">{user?.email}</p>
                    </div>
                    <button
                      type="button"
                      className="mobile-logout-btn"
                      onClick={() => {
                        logout();
                        closeMobileMenu();
                      }}
                      title="Logout"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                ) : (
                  <Link to="/login" onClick={closeMobileMenu} className="mobile-auth-btn">
                    <User size={18} />
                    <span>Login / Guest Access</span>
                  </Link>
                )}
              </div>
            </div>

            <div className="mobile-drawer-footer">
              <p>© 2026 ShopZone E-Commerce SPA</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
