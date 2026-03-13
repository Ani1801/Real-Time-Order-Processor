const Payment = require('../models/paymentModel');
const Order = require('../models/orderModel');

const paymentService = {
    processPayment: async (orderId) => {
        const order = await Order.getById(orderId);
        if (!order) throw new Error('Order not found');

        // Simulate payment processing
        const isSuccess = Math.random() > 0.1; // 90% success rate
        const status = isSuccess ? 'Completed' : 'Failed';

        const payment = await Payment.create(orderId, order.total_price, status);

        if (isSuccess) {
            await Order.updateStatus(orderId, 'Processing');
        } else {
            await Order.updateStatus(orderId, 'Payment Failed');
        }

        return payment;
    }
};

module.exports = paymentService;
