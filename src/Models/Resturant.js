const mongoose = require('mongoose');

const resturantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: String
    },
    location: 
        [{
            place:String,
            lat: Number
            , lng: Number
        }]
    ,
    info :{

        type: String
    } 
});

const Resturant = mongoose.model('Restaurant', resturantSchema);

module.exports = Resturant;