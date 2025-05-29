const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        minlength: [5, 'Username should be of atleast 5 characters long']
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: [13, 'Email should be of atleast 5 characters long']
    }, 
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [8, 'Password should be of atleast 8 characters long']
    }
})

const user = mongoose.model('User', userSchema);

module.exports = user;