const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    orderItem: [{
        name: String,
        orderId: { type: mongoose.Schema.Types.ObjectId },
        price: Number,
        quantity: Number
    }],
    restId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    totalPrice: Number,
    address: String
});



const Order = mongoose.model('Order', orderSchema);

module.exports = Order;