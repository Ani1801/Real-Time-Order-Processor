const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const { publishToQueue } = require('../queue/producer');

const orderService = {
    createOrder: async (productId, quantity) => {
        const product = await Product.getById(productId);
        if (!product) throw new Error('Product not found');
        if (product.stock < quantity) throw new Error('Insufficient stock');

        const totalPrice = product.price * quantity;
        const order = await Order.create(productId, quantity, totalPrice);

        // Publish to RabbitMQ
        await publishToQueue('order_queue', {
            orderId: order.id,
            productId,
            quantity,
            totalPrice,
            type: 'ORDER_CREATED'
        });

        return order;
    },
    getOrderStatus: async (orderId) => {
        return await Order.getById(orderId);
    }
};

module.exports = orderService;
