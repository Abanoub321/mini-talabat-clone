const mongoose = require('mongoose');

const resturantSchema = new mongoose.Schema({
    name : {
        type: String,
        required:true,
    },
    logo: {
        type:String
    },
    location: {
        type:String,
        required:true,
    }
});

const Resturant = mongoose.model('Restaurant',resturantSchema);

module.exports = Resturant;