const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 1
    },
    lastName: {
        type: String,
        required: true,
        min: 2
    },
    email: { 
        type: String,
        required: true,
        min: 3
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    date: {
        type:Date,
        default: Date.now()
    }
});

 module.exports = mongoose.model('Users', userSchema);