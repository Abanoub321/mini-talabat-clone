const mongoose = require('mongoose');

const checker = (id) => {
    if (mongoose.Types.ObjectId.isValid(id))
        return true
    else
        return false
}

module.exports = checker;