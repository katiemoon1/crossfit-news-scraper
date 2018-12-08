$(document).ready(() => {

// Getting the articles and putting them on the page
$.getJSON('/articles', function(data) {
    for (var i = 0; i < data.length; i++) {
        $('#articles')
            .append("<h3 data-id='" + data[i]._id + "'>" + data[i].title + "</h3>")
            .append("<p>" + data[i].link + "</p>")
            .append("<p>" + data[i].synopsis + "</p>")
    }
})

// Creating a comment section when the title of the article is clicked on
$(document).on('click', 'h3', function() {

    let thisId = $(this).attr('data-id')

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        .then(function(data) {
            console.log(data)

            $('#comments')
                .append("<h3>" + data.title + "</h3>")
                .append("<label>Comment Title?</label>")
                .append("<input id='title-input' name='title' >")
                .append("<label>Comment?</label>")
                .append("<textarea id='body-input' name='body'></textarea>")
                .append("<button data-id='" + data._id + "' id='save-comment' class='btn btn-primary'>Save Comment</button>")

                if (data.comment) {
                    $("#title-input").val(data.comment.title)
                    $("#body-input").val(data.comment.body)
                }
        })
})

// On click event for saving the comment
$(document).on("click", "#save-comment", function() {

    let thisId = $(this).attr('data-id')

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#title-input").val(),
            body: $("#body-input").val()
        }
    })
        .then(function(data) {
            console.log(data)
            $("#comments").empty()
            $()
        })

        $("#title-input").val("")
        $("#body-input").val("")
})




})