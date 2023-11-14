const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema

const AdminSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    type: { 
        type: String, 
        default: 'Admin' 
    }

}, {
    timestamps: true
})

AdminSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Admin', AdminSchema)