import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

const OrderStatus = ({ order }) => {
    const steps = [
        { label: 'Pending', icon: Clock, id: 'pending' },
        { label: 'Processing', icon: Package, id: 'processing' },
        { label: 'Shipped', icon: Truck, id: 'shipped' },
        { label: 'Delivered', icon: CheckCircle, id: 'delivered' }
    ];

    const currentStepIndex = steps.findIndex(s => s.id === (order.status || 'pending').toLowerCase());

    return (
        <div className="order-status p-6 glass-card mb-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-xl font-bold">Order #{order.id.slice(-6)}</h3>
                    <p className="text-text-muted text-sm">{order.productName} • Quantity: {order.quantity}</p>
                </div>
                <div className="status-badge" data-status={order.status.toLowerCase()}>
                    {order.status}
                </div>
            </div>

            <div className="status-timeline relative grow flex justify-between">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 z-0"></div>
                <motion.div
                    className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />

                {steps.map((step, idx) => {
                    const Icon = step.icon;
                    const isActive = idx <= currentStepIndex;
                    const isCurrent = idx === currentStepIndex;

                    return (
                        <div key={step.id} className="status-step relative z-10 flex flex-col items-center">
                            <motion.div
                                className={`step-dot h-12 w-12 rounded-full flex items-center justify-center mb-2 ${isActive ? 'bg-primary text-white' : 'bg-bg-color text-text-muted border border-glass-border'}`}
                                animate={isCurrent ? { scale: [1, 1.1, 1], boxShadow: ["0 0 0 0px var(--primary-glow)", "0 0 20px 5px var(--primary-glow)", "0 0 0 0px var(--primary-glow)"] } : {}}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Icon size={20} />
                            </motion.div>
                            <span className={`text-xs font-semibold ${isActive ? 'text-primary' : 'text-text-muted'}`}>{step.label}</span>
                        </div>
                    );
                })}
            </div>

            <style jsx>{`
        .status-badge {
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--glass-border);
        }
        .status-badge[data-status="pending"] { color: var(--text-muted); }
        .status-badge[data-status="processing"] { color: var(--primary); border-color: var(--primary); }
        .status-badge[data-status="shipped"] { color: var(--secondary); border-color: var(--secondary); }
        .status-badge[data-status="delivered"] { color: var(--accent); border-color: var(--accent); }
        
        .status-step { width: 60px; }
      `}</style>
        </div>
    );
};

export default OrderStatus;
