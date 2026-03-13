const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

router.post('/create-order', orderController.createOrder);
router.get('/order-status/:id', orderController.getOrderStatus);

module.exports = router;
