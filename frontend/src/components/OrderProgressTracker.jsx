import React from 'react';
import { Check, Truck, Package, CreditCard, ShoppingBag, MapPin } from 'lucide-react';

const OrderProgressTracker = ({ currentStatus }) => {
    const steps = [
        { id: 1, name: 'Order Placed', status: ['pending', 'placed', 'order placed'], icon: ShoppingBag },
        { id: 2, name: 'Payment Confirmed', status: ['payment confirmed', 'paid', 'completed'], icon: CreditCard },
        { id: 3, name: 'Processing', status: ['processing', 'preparing'], icon: Package },
        { id: 4, name: 'Shipped', status: ['shipped', 'dispatched', 'in transit'], icon: Truck },
        { id: 5, name: 'Delivered', status: ['delivered'], icon: MapPin },
    ];

    const getCurrentStep = () => {
        const status = currentStatus?.toLowerCase();
        let currentStepIndex = 0;

        // Logic to determine how far along the status is
        if (status === 'delivered') return 4;
        if (status === 'shipped') return 3;
        if (status === 'processing') return 2;
        if (status === 'payment confirmed' || status === 'paid') return 1;
        return 0; // Default to Order Placed
    };

    const activeIndex = getCurrentStep();

    return (
        <div className="w-full py-12 px-4">
            <div className="relative flex justify-between">
                {/* Background Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0"></div>

                {/* Active Progress Line */}
                <div
                    className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-1000 ease-out"
                    style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isCompleted = index < activeIndex;
                    const isActive = index === activeIndex;

                    return (
                        <div key={step.id} className="relative z-10 flex flex-col items-center">
                            <div
                                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${isCompleted || isActive
                                        ? 'bg-primary text-white shadow-lg shadow-blue-200'
                                        : 'bg-white border-4 border-slate-100 text-slate-300'
                                    } ${isActive ? 'scale-125 ring-4 ring-blue-50' : ''}`}
                            >
                                {isCompleted ? <Check size={28} /> : <Icon size={24} />}
                            </div>
                            <div className="mt-6 text-center">
                                <p
                                    className={`text-sm font-bold truncate max-w-[100px] md:max-w-none transition-colors ${isCompleted || isActive ? 'text-slate-900' : 'text-slate-400'
                                        }`}
                                >
                                    {step.name}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderProgressTracker;
