const express = require('express');
const router = express.Router();
const { roles } = require('../constants/enum');
const {
  getAllOrders,
  getOneOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');//todo
const { isLoggedIn, checkRole } = require('../middleware/auth');

router.get('/orders', isLoggedIn, getAllOrders);
router.get('/order/:id', isLoggedIn, getOneOrder);
router.post('/order',checkRole(roles.ADMIN), createOrder);
router.put('/order/:id',checkRole(roles.ADMIN), updateOrder);
router.delete('/order/:id',checkRole(roles.ADMIN), deleteOrder);

module.exports = router;
