const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    phoneNo: {
        type: String,
        unique: true,
        required: true
    },
    address: String,
    password: String
});



const User = mongoose.model('User', userSchema);

module.exports = User;