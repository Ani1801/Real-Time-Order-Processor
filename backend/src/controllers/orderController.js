const orderService = require('../services/orderService');

const orderController = {
    createOrder: async (req, res, next) => {
        try {
            const { product_id, quantity, user_id } = req.body;

            // Basic validation
            if (!product_id || !quantity || !user_id) {
                return res.status(400).json({ message: "Missing required fields: product_id, quantity, user_id" });
            }

            if (quantity <= 0) {
                return res.status(400).json({ message: "Quantity must be greater than zero" });
            }

            console.log(`Creating order for product ${product_id}, quantity ${quantity}, user ${user_id}`);

            const order = await orderService.createOrder(product_id, quantity, user_id);
            return res.status(201).json({
                message: "Order created successfully",
                order_id: order.id
            });
        } catch (error) {
            if (error.message === 'Insufficient stock') {
                return res.status(400).json({ message: error.message });
            }
            next(error);
        }
    },
    getOrderStatus: async (req, res, next) => {
        try {
            const { id } = req.params;
            const order = await orderService.getOrderStatus(id);

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            // Map database fields to the requested frontend format
            const formattedOrder = {
                order_id: order.id,
                product_name: order.product_name,
                quantity: order.quantity,
                total_price: order.total_price,
                payment_status: order.payment_status || 'Pending',
                order_status: order.status,
                created_at: order.created_at
            };

            res.json(formattedOrder);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = orderController;
