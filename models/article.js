// Bringing in mongoose
let mongoose = require('mongoose')

// Saving a reference schema
let Schema = mongoose.Schema

// Creating a new user schema object
let articleSchema = new Schema({

    tile: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }
})

// Creates our model from the above schema
let article = mongoose.model('article', articleSchema)

// Exporting the module
module.exports = article