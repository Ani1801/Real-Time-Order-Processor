import React, { useState } from 'react';
import { ShoppingCart, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { orderService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const OrderForm = ({ product }) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const price = product ? parseFloat(product.price) : 0;
    const totalPrice = (quantity * price).toFixed(2);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product) return;

        try {
            setLoading(true);
            setError(null);

            // Using dummy user_id as per project context (usually would come from auth)
            const orderData = {
                user_id: 1,
                product_id: product.product_id,
                quantity: quantity
            };

            const response = await orderService.createOrder(orderData);

            // Assuming backend returns { success: true, order_id: ... } or similar
            const result = response.data;
            setSuccess(result.order_id || 'SUCCESS');
        } catch (err) {
            console.error("Order creation failed:", err);
            const msg = err.response?.data?.message || "Failed to place order. Please try again.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="order-form success-state">
                <CheckCircle size={64} className="text-green-500 mb-4 mx-auto" />
                <h2 className="text-2xl font-bold mb-2">Order placed successfully!</h2>
                <p className="text-muted mb-6">Your order ID: <span className="font-mono font-bold text-dark">{success}</span></p>

                <button
                    onClick={() => navigate(`/order-status/${success}`)}
                    className="btn-primary-large w-full"
                >
                    Track Your Order
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="order-form">
            <h3 className="text-xl font-bold mb-6">Order Configuration</h3>

            {error && (
                <div className="error-alert mb-6">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}

            <div className="form-group mb-6">
                <label className="block text-sm font-semibold mb-2">Quantity</label>
                <input
                    type="number"
                    min="1"
                    max={product?.available_stock || 1}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                    required
                />
                <p className="text-xs text-muted mt-2">
                    Enter a quantity between 1 and {product?.available_stock || 0}.
                </p>
            </div>

            <div className="total-preview mb-8 p-4 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                <div className="flex justify-between items-center">
                    <span className="text-muted font-medium">Estimated Total</span>
                    <span className="text-2xl font-extrabold text-primary">${totalPrice}</span>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading || !product || product.available_stock <= 0}
                className="btn-primary-full py-4 flex items-center justify-center gap-2 text-lg"
            >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin" size={20} />
                        Processing...
                    </>
                ) : (
                    <>
                        <ShoppingCart size={20} />
                        Confirm Order
                    </>
                )}
            </button>

            {!loading && product?.available_stock <= 0 && (
                <p className="text-center text-red-500 text-sm mt-4 font-medium">
                    This item is currently out of stock.
                </p>
            )}
        </form>
    );
};

export default OrderForm;
