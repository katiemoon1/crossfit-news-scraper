// Bringing in mongoose
let mongoose = require('mongoose')

// Saving a reference schema
let Schema = mongoose.Schema

// Creating a new comment schema
var commentSchema = new Schema({
    
    title: String,
    body: String
})

// Creating our model from the above schema
let comment = mongoose.model('comment', commentSchema)

// Exporting the comment module
module.exports = comment