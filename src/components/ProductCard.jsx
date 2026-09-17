import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { getProductUnit } from '../utils/productUtils';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const originalPrice = product.discountPercentage 
    ? Math.round(product.price / (1 - product.discountPercentage / 100))
    : null;

  const unitText = getProductUnit(product);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
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
            className={`product-card-action-btn add ${isAdded ? 'added' : ''}`}
            onClick={handleAddToCart}
            title="Add to Cart"
          >
            {isAdded ? <Check size={18} /> : <ShoppingBag size={18} />}
            <span>{isAdded ? 'Added' : 'Add'}</span>
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
            <span className="product-current-price">₹{Math.round(product.price).toLocaleString('en-IN')}</span>
            <span className="product-unit-pill">/ {unitText}</span>
            {originalPrice && (
              <span className="product-original-price">₹{originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
          <button
            type="button"
            className={`product-add-btn ${isAdded ? 'added' : ''}`}
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to cart`}
          >
            {isAdded ? <Check size={16} /> : <ShoppingBag size={16} />}
            <span>{isAdded ? 'Added!' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
