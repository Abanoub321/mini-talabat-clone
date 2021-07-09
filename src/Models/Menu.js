const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    resturant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resturant'
    },
    dishes: [{
        name: String,
        price: Number,
        //quantity: Number
    }],
    appetizers: [{
        name: String,
        price: Number,
        // quantity: Number
    }]

});

menuSchema.pre('updateOne', (next) => {
    if (0 === this.appetizers.length) {
        this.appetizers = undefined;
    }
    if (0 === this.dishes.length)
        this.dishes = undefined;
    next();
})

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;