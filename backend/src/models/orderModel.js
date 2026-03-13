const db = require('../config/db');

const Order = {
    create: async (productId, quantity, totalPrice) => {
        const result = await db.query(
            'INSERT INTO orders (product_id, quantity, total_price, status) VALUES ($1, $2, $3, $4) RETURNING *',
            [productId, quantity, totalPrice, 'Pending']
        );
        return result.rows[0];
    },
    getById: async (id) => {
        const result = await db.query(
            'SELECT o.*, p.name as product_name FROM orders o JOIN products p ON o.product_id = p.id WHERE o.id = $1',
            [id]
        );
        return result.rows[0];
    },
    updateStatus: async (id, status) => {
        const result = await db.query(
            'UPDATE orders SET status = $2, updated_at = NOW() WHERE id = $1 RETURNING *',
            [id, status]
        );
        return result.rows[0];
    }
};

module.exports = Order;
