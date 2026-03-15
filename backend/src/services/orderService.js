const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const { publishToQueue } = require('../queue/producer');

const inventoryService = require('./inventoryService');

const orderService = {
    createOrder: async (productId, quantity, userId) => {
        // 1. Check inventory availability
        const isAvailable = await inventoryService.checkAvailability(productId, quantity);
        if (!isAvailable) throw new Error('Insufficient stock');

        // 2. Reserve stock
        const reserved = await inventoryService.reserveStock(productId, quantity);
        if (!reserved) throw new Error('Failed to reserve stock');

        const product = await Product.getById(productId);
        const totalPrice = product.price * quantity;

        // 3. Create order and order items
        const order = await Order.create(userId, productId, quantity, totalPrice);

        // 4. Publish to RabbitMQ
        await publishToQueue('order_created', {
            orderId: order.id,
            userId,
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
