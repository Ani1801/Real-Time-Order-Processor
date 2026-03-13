import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';
import ProductModal from '../components/ProductModal';

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [inStockOnly, setInStockOnly] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await productService.getProducts();

            // Handle axios response
            const data = response.data;

            if (Array.isArray(data)) {
                setProducts(data);
            } else {
                console.error("Unexpected data format:", data);
                setProducts([]);
            }
        } catch (err) {
            console.error("Failed to fetch products:", err);
            // If the error message from backend is available, show it
            const msg = err.response?.data?.message || err.message || "Connection failure";
            setError(`Could not load products: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDetails = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleConfirmOrder = (product, quantity) => {
        // Option: Navigate to place-order with state
        navigate('/place-order', { state: { product, quantity } });
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesStock = !inStockOnly || p.available_stock > 0;
        return matchesSearch && matchesCategory && matchesStock;
    });

    return (
        <div className="products-page">
            <header className="page-header">
                <div className="container">
                    <h1 className="page-title">Available Products</h1>
                    <p className="page-subtitle">Browse available items and place an order instantly.</p>
                </div>
            </header>

            <main className="container py-12">
                <ProductFilter
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    inStockOnly={inStockOnly}
                    setInStockOnly={setInStockOnly}
                />

                {loading ? (
                    <div className="loading-state">
                        <Loader2 className="animate-spin text-primary" size={48} />
                        <p>Loading products...</p>
                    </div>
                ) : error ? (
                    <div className="empty-state">
                        <h3 className="text-red-500">Connection Error</h3>
                        <p>{error}</p>
                        <button className="btn-primary-small" onClick={fetchProducts} style={{ width: 'auto', padding: '0.75rem 2rem', marginTop: '1rem' }}>
                            Try Again
                        </button>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="product-grid">
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product.product_id}
                                product={product}
                                onOpenDetails={handleOpenDetails}
                                onPlaceOrder={(p) => handleConfirmOrder(p, 1)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <h3>No products found</h3>
                        <p>Try adjusting your search or filters to find what you're looking for.</p>
                        <button className="btn-secondary-small" onClick={() => {
                            setSearchQuery('');
                            setSelectedCategory('All');
                            setInStockOnly(false);
                        }}>Reset Filters</button>
                    </div>
                )}
            </main>

            <ProductModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirmOrder={handleConfirmOrder}
            />
        </div>
    );
};

export default Products;
