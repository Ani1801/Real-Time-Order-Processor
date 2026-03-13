import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import OrderSummaryCard from '../components/OrderSummaryCard';
import OrderForm from '../components/OrderForm';

const PlaceOrder = () => {
    const location = useLocation();
    const { product } = location.state || {};

    // Redirect to products if no product state is present
    if (!product) {
        return <Navigate to="/products" replace />;
    }

    return (
        <div className="place-order-page">
            <header className="page-header">
                <div className="container">
                    <div className="flex items-center gap-4 mb-4">
                        <Link to="/products" className="text-primary hover:bg-blue-50 p-2 rounded-full transition-colors">
                            <ArrowLeft size={24} />
                        </Link>
                        <h1 className="page-title !mb-0 text-left">Confirm Your Order</h1>
                    </div>
                    <p className="page-subtitle text-left ml-12">
                        Review the selected product details and specify the quantity to complete your purchase.
                    </p>
                </div>
            </header>

            <main className="container py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
                    {/* Left Side: Summary */}
                    <OrderSummaryCard product={product} />

                    {/* Right Side: Form */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-100">
                        <OrderForm product={product} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PlaceOrder;
