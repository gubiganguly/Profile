const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema(
    {
        account: {
            type: String,
            required: true
        },
        profileImage: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        profileDescript: {
            type: String,
            required: false
        },
        posts: {
            type: String,
            required: false
        },
        products: {
            type: String,
            required: false
        }
    }
)

module.exports = mongoose.model('Profile', profileSchema)