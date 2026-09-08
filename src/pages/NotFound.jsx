import { Link } from 'react-router-dom';
import { AlertTriangle, Home, ShoppingBag } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="page-not-found">
      <div className="not-found-card">
        <div className="not-found-icon">
          <AlertTriangle size={64} />
        </div>
        <h1>404 - Page Not Found</h1>
        <p>The route you are trying to access does not exist or has been moved.</p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary btn-large">
            <Home size={18} />
            <span>Go to Home Page</span>
          </Link>
          <Link to="/shop" className="btn btn-secondary btn-large">
            <ShoppingBag size={18} />
            <span>Browse Shop Inventory</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
