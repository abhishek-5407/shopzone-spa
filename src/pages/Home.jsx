import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, ShoppingBag, Zap, Shield, Sparkles, PhoneCall, Package, Layers } from 'lucide-react';

export const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=8');
        const data = await response.json();
        setFeaturedProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="page-home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-pill">
              <Sparkles size={16} /> Phase 3 Core Engineering Deliverable
            </span>
            <h1 className="hero-title">
              Experience Next-Gen <span className="gradient-text">E-Commerce SPA</span>
            </h1>
            <p className="hero-description">
              Browse inventory, inspect live API details, and manage your global shopping cart with zero page reloads using React Router v7 and Context API architecture.
            </p>
            <div className="hero-cta-group">
              <Link to="/shop" className="btn btn-primary btn-large">
                <ShoppingBag size={20} />
                <span>Browse Shop Inventory</span>
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-large">
                <span>Contact Engineering</span>
                <ArrowRight size={18} />
              </Link>
            </div>
            
            {/* Quick Metrics */}
            <div className="hero-metrics">
              <div className="metric-item">
                <span className="metric-number">30+</span>
                <span className="metric-label">REST API Products</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-item">
                <span className="metric-number">0s</span>
                <span className="metric-label">Page Reload Delay</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-item">
                <span className="metric-number">100%</span>
                <span className="metric-label">State Persistence</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-glow"></div>
            <div className="hero-showcase-card">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"
                alt="E-Commerce Showcase"
                className="showcase-img"
              />
              <div className="hero-floating-badge top-right">
                <Zap size={18} className="badge-icon-zap" />
                <div>
                  <strong>Client Routing</strong>
                  <span>Instant URL updates</span>
                </div>
              </div>
              <div className="hero-floating-badge bottom-left">
                <Shield size={18} className="badge-icon-shield" />
                <div>
                  <strong>Protected Checkout</strong>
                  <span>Auth Guard enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Residency Sync Callout */}
      <section className="sync-callout-section">
        <div className="sync-callout-card">
          <div className="sync-callout-info">
            <div className="sync-callout-icon-box">
              <PhoneCall size={28} />
            </div>
            <div>
              <h3>Mandatory Action Item: 1-on-1 Sync</h3>
              <p>
                Complete your concise 3-minute sync with <strong>Mr. Nakul (8851407750)</strong> evaluating your Technical Communication KPI.
              </p>
            </div>
          </div>
          <a href="tel:8851407750" className="btn btn-dark">
            Direct Dial: 8851407750
          </a>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="categories-section">
        <div className="section-header">
          <span className="section-subtitle">Curated Catalog</span>
          <h2 className="section-title">Shop by Category</h2>
        </div>
        <div className="categories-grid">
          <Link to="/shop?category=beauty" className="category-card">
            <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400" alt="Beauty" />
            <div className="category-overlay">
              <Sparkles size={24} />
              <h3>Beauty & Cosmetics</h3>
              <span>Explore Collection &rarr;</span>
            </div>
          </Link>

          <Link to="/shop?category=fragrances" className="category-card">
            <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400" alt="Fragrances" />
            <div className="category-overlay">
              <Layers size={24} />
              <h3>Fragrances</h3>
              <span>Explore Collection &rarr;</span>
            </div>
          </Link>

          <Link to="/shop?category=furniture" className="category-card">
            <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400" alt="Furniture" />
            <div className="category-overlay">
              <Package size={24} />
              <h3>Luxury Furniture</h3>
              <span>Explore Collection &rarr;</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Trending Products */}
      <section className="featured-products-section">
        <div className="section-header flex-header">
          <div>
            <span className="section-subtitle">Live REST Payload</span>
            <h2 className="section-title">Featured Products</h2>
          </div>
          <Link to="/shop" className="view-all-link">
            <span>View All Products</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        {loading ? (
          <div className="products-grid">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="product-skeleton-card">
                <div className="skeleton-image"></div>
                <div className="skeleton-line title"></div>
                <div className="skeleton-line price"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="products-grid">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
