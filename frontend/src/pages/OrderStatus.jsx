import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Loader2, RefreshCw, ChevronLeft, AlertCircle } from 'lucide-react';
import { orderService } from '../services/api';
import OrderStatusCard from '../components/OrderStatusCard';
import OrderProgressTracker from '../components/OrderProgressTracker';

const OrderStatus = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lookupId, setLookupId] = useState(orderId || '');

    useEffect(() => {
        if (orderId) {
            fetchOrderStatus(orderId);
            setLookupId(orderId);
        }
    }, [orderId]);

    const fetchOrderStatus = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await orderService.getOrderStatus(id);
            setOrder(response.data);
        } catch (err) {
            console.error("Fetch order status error:", err);
            // Handling non-JSON responses or explicit errors
            const message = err.response?.data?.message || err.message || "Connection failure";
            setError(err.response?.status === 404
                ? "Order not found. Please check your order ID."
                : `Error: ${message}`);
            setOrder(null);
        } finally {
            setLoading(false);
        }
    };

    const handleLookup = (e) => {
        e.preventDefault();
        if (lookupId.trim()) {
            navigate(`/order-status/${lookupId.trim()}`);
        }
    };

    return (
        <div className="order-status-page">
            <header className="page-header">
                <div className="container">
                    <div className="flex items-center gap-4 mb-4">
                        <button onClick={() => navigate('/')} className="text-primary hover:bg-blue-50 p-2 rounded-full transition-colors">
                            <ChevronLeft size={24} />
                        </button>
                        <h1 className="page-title !mb-0 text-left">Track Your Order</h1>
                    </div>
                    <p className="page-subtitle text-left ml-12">
                        Get real-time updates on your purchase and follow its journey to your doorstep.
                    </p>
                </div>
            </header>

            <main className="container py-12">
                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Lookup Section */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg">
                        <form onSubmit={handleLookup} className="lookup-form">
                            <div className="lookup-container">
                                <Search className="lookup-icon" size={20} />
                                <input
                                    type="text"
                                    placeholder="Enter your Order ID (e.g. 123456)"
                                    value={lookupId}
                                    onChange={(e) => setLookupId(e.target.value)}
                                    className="lookup-input"
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn-primary-large px-8"
                                disabled={loading || !lookupId.trim()}
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : "Track Order"}
                            </button>
                        </form>
                    </div>

                    {/* Results Section */}
                    {loading ? (
                        <div className="flex flex-col items-center py-20 animate-pulse">
                            <Loader2 className="animate-spin text-primary mb-4" size={48} />
                            <p className="text-slate-500 font-medium">Retrieving real-time order data...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-100 rounded-2xl p-10 text-center animate-fade-in">
                            <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
                            <h3 className="text-xl font-bold text-red-900 mb-2">Tracking Failed</h3>
                            <p className="text-red-700 max-w-md mx-auto">{error}</p>
                            <button
                                onClick={() => navigate('/order-status')}
                                className="mt-6 text-primary font-bold underline"
                            >
                                Try checking another ID
                            </button>
                        </div>
                    ) : order ? (
                        <div className="space-y-12 animate-fade-in">
                            <div className="flex justify-between items-center px-2">
                                <h3 className="text-2xl font-extrabold text-slate-900">Current Progress</h3>
                                <button
                                    onClick={() => fetchOrderStatus(orderId)}
                                    className="flex items-center gap-2 text-primary font-bold hover:underline"
                                >
                                    <RefreshCw size={18} />
                                    Refresh Status
                                </button>
                            </div>

                            <div className="tracker-container">
                                <OrderProgressTracker currentStatus={order.order_status} />
                            </div>

                            <OrderStatusCard order={order} />
                        </div>
                    ) : (
                        <div className="status-placeholder">
                            <Search size={80} />
                            <h3 className="text-2xl font-bold text-slate-400">Ready to track?</h3>
                            <p className="text-slate-400 mt-2">Enter an order ID above to see the status.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default OrderStatus;
