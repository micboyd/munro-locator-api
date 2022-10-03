const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String
    }, 
    surname: {
        type: String
    },
    email: {
        type: String
    }, 
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
