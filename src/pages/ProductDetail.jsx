import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star, ShoppingBag, ArrowLeft, ShieldCheck, Truck, Plus, Minus, Box } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found in repository');
        }
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.thumbnail || data.images?.[0]);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError(err.message || 'Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const handleQuantityIncrement = () => setQuantity((q) => q + 1);
  const handleQuantityDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="product-detail-skeleton">
        <div className="skeleton-container">
          <div className="skeleton-detail-image"></div>
          <div className="skeleton-detail-content">
            <div className="skeleton-line title"></div>
            <div className="skeleton-line price"></div>
            <div className="skeleton-line body"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="detail-error-container">
        <h2>Product Not Found</h2>
        <p>Could not load product payload for ID #{id}.</p>
        <button type="button" className="btn btn-primary" onClick={() => navigate('/shop')}>
          <ArrowLeft size={16} />
          <span>Back to Shop</span>
        </button>
      </div>
    );
  }

  const originalPrice = product.discountPercentage 
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2) 
    : null;

  return (
    <div className="page-product-detail">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-nav">
        <div className="breadcrumb-container">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <span className="breadcrumb-current">{product.title}</span>
        </div>
      </div>

      <div className="product-detail-container">
        {/* Back Link */}
        <button type="button" className="back-link-btn" onClick={() => navigate('/shop')}>
          <ArrowLeft size={18} />
          <span>Back to Shop Inventory</span>
        </button>

        <div className="product-detail-grid">
          {/* Gallery View */}
          <div className="product-gallery-box">
            <div className="main-image-wrap">
              <img src={selectedImage} alt={product.title} className="main-detail-image" />
              {product.discountPercentage > 5 && (
                <span className="discount-floating-pill">
                  -{Math.round(product.discountPercentage)}% OFF
                </span>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="thumbnail-list">
                {product.images.map((imgUrl, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`thumbnail-btn ${selectedImage === imgUrl ? 'active' : ''}`}
                    onClick={() => setSelectedImage(imgUrl)}
                  >
                    <img src={imgUrl} alt={`${product.title} thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Data Content */}
          <div className="product-info-box">
            <div className="detail-meta-bar">
              <span className="detail-category-badge">{product.category}</span>
              {product.brand && <span className="detail-brand-badge">Brand: {product.brand}</span>}
              <div className="detail-rating">
                <Star size={16} className="star-icon fill-star" />
                <span><strong>{product.rating?.toFixed(1)}</strong> / 5.0</span>
              </div>
            </div>

            <h1 className="detail-title">{product.title}</h1>

            <div className="detail-price-box">
              <span className="detail-current-price">₹{product.price.toFixed(2)}</span>
              {originalPrice && (
                <span className="detail-original-price">₹{originalPrice}</span>
              )}
            </div>

            <p className="detail-description">{product.description}</p>

            <div className="detail-stock-indicator">
              <Box size={16} />
              <span>Availability: </span>
              {product.stock > 0 ? (
                <strong className="in-stock">In Stock ({product.stock} units)</strong>
              ) : (
                <strong className="out-stock">Out of Stock</strong>
              )}
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="detail-actions-wrapper">
              <div className="quantity-selector">
                <button type="button" onClick={handleQuantityDecrement} aria-label="Decrease quantity">
                  <Minus size={16} />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button type="button" onClick={handleQuantityIncrement} aria-label="Increase quantity">
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                className="btn btn-primary add-to-cart-large"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={20} />
                <span>Add {quantity} to Cart</span>
              </button>
            </div>

            {/* Product Guarantees */}
            <div className="product-guarantees">
              <div className="guarantee-item">
                <Truck size={20} />
                <div>
                  <strong>Free Delivery</strong>
                  <span>Orders over ₹500 qualify for free express shipping</span>
                </div>
              </div>
              <div className="guarantee-item">
                <ShieldCheck size={20} />
                <div>
                  <strong>Authentic Guarantee</strong>
                  <span>100% verified REST product payload</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
