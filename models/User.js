const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    minutes: {
        type: Number
    }
});

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
    activities: {
        type: [activitySchema]
    },
    date: {
        type:Date,
        default: Date.now()
    }
});

 module.exports = mongoose.model('Users', userSchema);