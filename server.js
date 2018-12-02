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
let PORT = 3000

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

app.get('/scrape', function(req, res) {

    axios.get('http://journal.crossfit.com/basics/').then(function(response) {
        console.log(response.data)
        let $ = cheerio.load(response.data)

        $('.listArticle h2').each(function(i, element) {

            var result = {}

            result.title = $(this)
                .children('a')
                .text()
            result.link = $(this)
                .children('a')
                .attr('href')
            result.synopsis = $(this)
                .parent()
                .siblings('.span-21')
                .children('.span-13')
                .children('.span-8')
                .children('p')
                .text()

            db.article.create(result) 
                .then(function(dbArticle){
                    console.log(dbArticle)
                })
                .catch(function(err) {
                    console.log(err)
                })
        })

        res.send('Scrape complete!')
    })
})

app.get('/articles', function(req, res) {
    db.article.find({})
        .then(function(dbArticle){
            res.json(dbArticle)
        })
        .catch(function(err){
            res.json(err)
        })
})


// Starting the server
app.listen(PORT, function() {
    console.log('Server listening on PORT: ' + PORT)
})
