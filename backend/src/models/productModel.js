const db = require('../config/db');

const Product = {
    getAll: async () => {
        const result = await db.query('SELECT * FROM products');
        return result.rows;
    },
    getById: async (id) => {
        const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
        return result.rows[0];
    },
    updateStock: async (id, quantity) => {
        const result = await db.query(
            'UPDATE products SET stock = stock - $2 WHERE id = $1 AND stock >= $2 RETURNING *',
            [id, quantity]
        );
        return result.rows[0];
    }
};

module.exports = Product;
