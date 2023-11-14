const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    verificationToken: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    userStatus: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    profile: [

        {
            avatar: {
                type: String,
                required: true
            },
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            address: [
    
                {
                    name: {
                        type: String,
                        default: ""
                    },
                    mobile: {
                        type: Number,
                        default: 0
                    },
                    address1: {
                        type: String,
                        default: ""
                    },
                    address2: {
                        type: String,
                        default: ""
                    },
                    city: {
                        type: String,
                        default: ""
                    },
                    state: {
                        type: String,
                        default: ""
                    },
                    zip: {
                        type: Number,
                        default: 0
                    },
                }
            ]
            
            ,
        }
    ]
}, {
    timestamps: true
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)