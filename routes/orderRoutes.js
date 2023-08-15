const express = require('express');
const orderController = require('../controllers/orderController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/', orderController.getOrders);
router.post('/', orderController.createOrder);

module.exports = router