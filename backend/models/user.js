// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    profileImage: {
        type: String,
        default: "https://st2.depositphotos.com/1009634/7235/v/950/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg"
    }
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
