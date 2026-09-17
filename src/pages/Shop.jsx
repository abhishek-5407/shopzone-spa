import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { Search, Filter, SlidersHorizontal, RefreshCw, AlertCircle } from 'lucide-react';

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('default');
  const [maxPrice, setMaxPrice] = useState(200000);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://dummyjson.com/products?limit=30');
        if (!response.ok) {
          throw new Error(`API Error: ${response.statusText}`);
        }
        const data = await response.json();
        const formatted = (data.products || []).map((p) => ({
          ...p,
          price: Math.round(p.price * 85),
        }));
        setProducts(formatted);
      } catch (err) {
        console.error('Error fetching inventory:', err);
        setError('Failed to load shop inventory from DummyJSON REST endpoint.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Update URL search parameter when category changes
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  // Get list of unique categories
  const categories = ['all', ...new Set(products.map((p) => p.category))];

  // Filter & Sort Logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="page-shop">
      {/* Header Banner */}
      <div className="shop-header">
        <div className="shop-header-container">
          <h1>Explore Shop Inventory</h1>
          <p>Consuming REST endpoint: <code>https://dummyjson.com/products</code></p>
        </div>
      </div>

      <div className="shop-main-container">
        {/* Sidebar / Filters Bar */}
        <aside className="shop-filters-sidebar">
          <div className="filter-block">
            <div className="filter-title">
              <Search size={18} />
              <span>Search Inventory</span>
            </div>
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="filter-block">
            <div className="filter-title">
              <Filter size={18} />
              <span>Categories</span>
            </div>
            <div className="category-pills-list">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-block">
            <div className="filter-title">
              <SlidersHorizontal size={18} />
              <span>Max Price: ₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="0"
              max="200000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-slider"
            />
          </div>

          <div className="filter-block">
            <div className="filter-title">Sort By</div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="default">Default Sorting</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {(searchQuery || selectedCategory !== 'all' || sortBy !== 'default' || maxPrice < 200000) && (
            <button
              type="button"
              className="reset-filters-btn"
              onClick={() => {
                setSearchQuery('');
                handleCategoryChange('all');
                setSortBy('default');
                setMaxPrice(200000);
              }}
            >
              <RefreshCw size={14} />
              <span>Reset Filters</span>
            </button>
          )}
        </aside>

        {/* Product Grid Area */}
        <main className="shop-grid-area">
          <div className="results-bar">
            <span>Showing <strong>{filteredProducts.length}</strong> of {products.length} Products</span>
          </div>

          {loading ? (
            <div className="products-grid">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="product-skeleton-card">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-line title"></div>
                  <div className="skeleton-line price"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="error-box">
              <AlertCircle size={24} />
              <p>{error}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-results-box">
              <Search size={40} className="empty-icon" />
              <h3>No products matched your criteria</h3>
              <p>Try searching for another term or clearing active filters.</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setSearchQuery('');
                  handleCategoryChange('all');
                  setMaxPrice(2000);
                }}
              >
                Clear Search & Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
