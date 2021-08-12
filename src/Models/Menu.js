const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    resturant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resturant'
    },
    dishes: [{
        name: String,
        price: Number,
        info:String
    }]

});



const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;