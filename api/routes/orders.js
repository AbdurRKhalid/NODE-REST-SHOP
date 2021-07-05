const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/orders');

router.get('/', OrdersController.order_gets_all);

router.post('/', OrdersController.create_order);

router.get('/:orderId', OrdersController.get_order);

router.patch('/:orderId', OrdersController.update_order);

router.delete('/:orderId', OrdersController.delete_order);

module.exports = router;