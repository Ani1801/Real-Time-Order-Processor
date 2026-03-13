import React from 'react';
import { motion } from 'framer-motion';
import OrderStatus from '../components/OrderStatus';
import { History } from 'lucide-react';

const Orders = () => {
    const dummyOrders = [
        { id: 'ORD-829312', productName: 'Neural Link v2', quantity: 1, status: 'Processing' },
        { id: 'ORD-742911', productName: 'Quantum Slate', quantity: 2, status: 'Shipped' },
        { id: 'ORD-123456', productName: 'Aero Hoverpad', quantity: 1, status: 'Pending' },
    ];

    return (
        <div className="orders-page container py-12">
            <header className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                        <History size={32} />
                    </div>
                    <h1 className="text-4xl font-bold">Your Orders</h1>
                </div>
                <p className="text-text-muted">Track the progress of your real-time orders below.</p>
            </header>

            <div className="orders-grid space-y-6">
                {dummyOrders.map((order, index) => (
                    <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <OrderStatus order={order} />
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
        .space-y-6 > * + * { margin-top: 1.5rem; }
        .text-4xl { font-size: 2.25rem; }
      `}</style>
        </div>
    );
};

export default Orders;
