// Getting the articles and putting them on the page
$.getJSON('/articles', function(data) {
    for (var i = 0; i < data.length; i++) {
        $('#articles').append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>")
    }
})