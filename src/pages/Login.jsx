import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserCheck, LogIn, Lock, Mail, Sparkles, ShieldCheck } from 'lucide-react';

export const Login = () => {
  const { loginAsGuest, loginWithCredentials, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Destination path to redirect to after successful authentication
  const fromPath = location.state?.from?.pathname || '/checkout';

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate(fromPath, { replace: true });
  };

  const handleCredentialSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    loginWithCredentials(email, password);
    navigate(fromPath, { replace: true });
  };

  return (
    <div className="page-login">
      <div className="login-card-container">
        <div className="login-card-header">
          <div className="login-logo-wrap">
            <Sparkles size={28} className="brand-sparkle" />
          </div>
          <h2>Sign In to ShopZone</h2>
          <p>Access your persistent shopping cart and execute protected checkout.</p>
        </div>

        {isAuthenticated ? (
          <div className="logged-in-box">
            <UserCheck size={48} className="success-icon" />
            <h3>Already Logged In</h3>
            <p>You are authenticated as <strong>{user?.name}</strong> ({user?.email}).</p>
            <div className="logged-in-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="login-body">
            {/* Guest Quick Login Action */}
            <div className="guest-action-block">
              <div className="guest-badge">Phase 3 Requirement</div>
              <h3>Quick Guest Access</h3>
              <p>One-click instant authentication without password required.</p>
              <button
                type="button"
                className="btn btn-primary btn-large btn-block guest-login-btn"
                onClick={handleGuestLogin}
              >
                <UserCheck size={20} />
                <span>Login as Guest</span>
              </button>
            </div>

            <div className="auth-divider">
              <span>OR USE CREDENTIALS</span>
            </div>

            {/* Email/Password Mock Form */}
            <form onSubmit={handleCredentialSubmit} className="credentials-form">
              <div className="form-group">
                <label htmlFor="authEmail">Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    id="authEmail"
                    type="email"
                    placeholder="guest@shopzone.io"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="authPassword">Password</label>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input
                    id="authPassword"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-secondary btn-block">
                <LogIn size={18} />
                <span>Sign In with Email</span>
              </button>
            </form>

            <div className="login-footer-notice">
              <ShieldCheck size={16} />
              <span>Auth state persists in LocalStorage across hard browser refreshes.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
