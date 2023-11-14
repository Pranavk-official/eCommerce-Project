const mongoose = require('mongoose');

const Schema = mongoose.Schema

const UserVerificationSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    uniqueString: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    expiresAt: {
        type: Boolean,
    },
}, {
    timestamps:true
})



module.exports = mongoose.model('UserVerification', UserVerification)