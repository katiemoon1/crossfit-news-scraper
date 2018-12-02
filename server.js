// Bringing in the dependencies
let express = require('express')
let exphbs = require('express-handlebars')
let mongoose = require('mongoose')

// Bringing in the scraping tools
let axios = require('axios')
let cheerio = require('cheerio')

// Bringing in all of the models
let db = require('./models')

// Setting the port
const PORT = process.env.PORT || 3030

// Initializing express
let app = express()

// Parse the request body as JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Setting the assets folder as a static folder
app.use(express.static(__dirname + '/assets'))

// Setting up handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Connect to the Mongo DB
mongoose.connect('mongodb://localhost/crossfitnewsdb', { useNewUrlParser: true })






// Starting the server
app.listen(PORT => {
    console.log('Server listening on PORT: ' + PORT)
})
