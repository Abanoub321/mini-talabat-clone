const express = require("express");
const { makeOrder, getOrder } = require("../controller/ordercontroller");
const requireLogin = require("../MiddleWares/requireLogin");


const orderRoute = express.Router();

orderRoute.get('/:orderId',getOrder);
orderRoute.post('/add').use(requireLogin,makeOrder);

module.exports = orderRoute