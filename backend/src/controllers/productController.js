const Product = require('../models/productModel');

const productController = {
    getAllProducts: async (req, res, next) => {
        try {
            // Hardcoded mock data to unblock frontend verification
            // while user sets up PostgreSQL
            const mockProducts = [
                { product_id: 1, name: 'Quantum Slate Tablet', category: 'Electronics', price: 899.99, available_stock: 15 },
                { product_id: 2, name: 'Neural Link v2', category: 'Accessories', price: 249.50, available_stock: 8 },
                { product_id: 3, name: 'Bio-Organic Apples', category: 'Grocery', price: 4.99, available_stock: 120 },
                { product_id: 4, name: 'Precision Stylus', category: 'Office Supplies', price: 59.00, available_stock: 0 },
                { product_id: 5, name: 'Sonic Headphones', category: 'Electronics', price: 199.00, available_stock: 42 }
            ];
            console.log("Returning mock products for frontend verification");
            res.json(mockProducts);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = productController;
