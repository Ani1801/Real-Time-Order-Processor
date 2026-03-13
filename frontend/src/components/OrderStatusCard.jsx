import React from 'react';
import { Calendar, Package, DollarSign, CreditCard, Clock, CheckCircle2 } from 'lucide-react';

const OrderStatusCard = ({ order }) => {
    if (!order) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusStyle = (status) => {
        const s = status?.toLowerCase();
        if (s === 'delivered') return 'bg-green-100 text-green-700 border-green-200';
        if (s === 'shipped' || s === 'processing') return 'bg-blue-100 text-blue-700 border-blue-200';
        if (s === 'payment failed' || s === 'cancelled') return 'bg-red-100 text-red-700 border-red-200';
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-fade-in">
            <div className="bg-slate-50 p-6 border-bottom flex justify-between items-center">
                <div>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Order Identifier</h3>
                    <p className="text-xl font-mono font-bold text-slate-800">#{order.order_id}</p>
                </div>
                <div className={`px-4 py-2 rounded-full border text-sm font-bold ${getStatusStyle(order.order_status)}`}>
                    {order.order_status}
                </div>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <Package size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-500 uppercase mb-1">Product Details</h4>
                            <p className="text-lg font-bold text-slate-800">{order.product_name}</p>
                            <p className="text-slate-500">Quantity: <span className="font-bold text-slate-700">{order.quantity} units</span></p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-500 uppercase mb-1">Financial Summary</h4>
                            <p className="text-2xl font-extrabold text-slate-900">${parseFloat(order.total_price).toFixed(2)}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <CreditCard size={14} className="text-slate-400" />
                                <span className="text-sm font-medium text-slate-500">Payment: </span>
                                <span className={`text-sm font-bold ${order.payment_status?.toLowerCase() === 'completed' ? 'text-green-600' : 'text-blue-600'}`}>
                                    {order.payment_status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-500 uppercase mb-1">Placement Date</h4>
                            <p className="text-slate-800 font-bold">{formatDate(order.created_at)}</p>
                            <p className="text-sm text-slate-500 italic">Order timestamp</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                            <Clock size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-500 uppercase mb-1">Current Status</h4>
                            <p className="text-slate-800 font-bold">{order.order_status}</p>
                            <div className="flex items-center gap-1.5 mt-1 text-emerald-600">
                                <CheckCircle2 size={14} />
                                <span className="text-sm font-bold">Live Tracking Enabled</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderStatusCard;
