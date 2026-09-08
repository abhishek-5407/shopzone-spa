import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star, ShoppingBag, Eye } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const originalPrice = product.discountPercentage 
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2) 
    : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="product-card">
      <div className="product-card-image-wrap">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="product-card-image"
          loading="lazy"
        />
        {product.discountPercentage > 5 && (
          <span className="product-discount-tag">
            -{Math.round(product.discountPercentage)}% OFF
          </span>
        )}
        <div className="product-card-actions-overlay">
          <Link 
            to={`/product/${product.id}`} 
            className="product-card-action-btn view"
            title="Quick View Details"
          >
            <Eye size={18} />
            <span>Details</span>
          </Link>
          <button
            type="button"
            className="product-card-action-btn add"
            onClick={handleAddToCart}
            title="Add to Cart"
          >
            <ShoppingBag size={18} />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="product-card-content">
        <div className="product-card-meta">
          <span className="product-category-pill">{product.category}</span>
          <div className="product-rating">
            <Star size={14} className="star-icon fill-star" />
            <span>{product.rating?.toFixed(1) || '4.5'}</span>
          </div>
        </div>

        <h3 className="product-card-title">
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h3>

        <div className="product-card-footer">
          <div className="product-price-box">
            <span className="product-current-price">${product.price.toFixed(2)}</span>
            {originalPrice && (
              <span className="product-original-price">${originalPrice}</span>
            )}
          </div>
          <button
            type="button"
            className="product-add-btn"
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingBag size={16} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
