import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';

const ProductCard = ({ product, onOpenDetails, onPlaceOrder }) => {
    const { name, category, price, available_stock, image_url } = product;

    const getStockStatus = () => {
        if (available_stock <= 0) return { label: 'Out of Stock', color: 'red' };
        if (available_stock < 10) return { label: 'Low Stock', color: 'yellow' };
        return { label: 'In Stock', color: 'green' };
    };

    const status = getStockStatus();

    return (
        <div className="product-card">
            <div className="product-image-container">
                {image_url ? (
                    <img src={image_url} alt={name} className="product-image" />
                ) : (
                    <div className="image-fallback">
                        <ShoppingCart size={48} />
                    </div>
                )}
            </div>
            <div className="product-info">
                <div className="product-meta">
                    <span className="product-category">{category}</span>
                    <span className={`status-badge status-${status.color}`}>
                        {status.label}
                    </span>
                </div>
                <h3 className="product-name line-clamp-2" title={name}>{name}</h3>
                
                <div className="product-bottom-section">
                    <div className="product-price-row">
                        <span className="product-price">${parseFloat(price).toFixed(2)}</span>
                        <span className="product-stock">{available_stock} units left</span>
                    </div>
                    <div className="product-actions">
                        <button
                            className="btn-primary-small flex-btn"
                            onClick={() => onPlaceOrder(product)}
                            disabled={available_stock <= 0}
                        >
                            <ShoppingCart size={18} />
                            Order
                        </button>
                        <button
                            className="btn-secondary-small icon-btn"
                            onClick={() => onOpenDetails(product)}
                            aria-label="View Details"
                        >
                            <Eye size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
