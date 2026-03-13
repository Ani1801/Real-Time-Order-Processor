const paymentService = require('../services/paymentService');

const paymentController = {
    processPayment: async (req, res, next) => {
        try {
            const { orderId } = req.body;
            const payment = await paymentService.processPayment(orderId);
            res.json(payment);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = paymentController;
