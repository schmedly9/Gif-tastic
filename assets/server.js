var topics = ['books', 'nature', 'swimming', 'space'];

function renderButtons() {
    $('#addButton').empty();
    //for loop that iterates through array and creates button
    for (var i = 0; i < topics.length; i++) {


        var button = $('<button>');
        button.addClass('topic');
        button.attr('data-name', topics[i]);
        button.text(topics[i]);
        $('#addButton').append(button);

    }
    addGif();

};

$('#addGif').on('click', function() {
    var userInput = $('#gif-input').val().trim();
    console.log($('#gif-input'));
    topics.push(userInput);
    renderButtons();
    return false;
    
    if (userInput === ' ') {
        $('#gif-input').val().trim();
    }
});

renderButtons();


function addGif() {
    $('button').on('click', function() {
        var p = $(this).data('name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=fish&api_key=QbXwW8Bhh9LKyavC78mxT8EEa7vk6nUD";

        $.ajax({ url: queryURL, method: 'GET' })
            .done(function(response) {
                var results = response.data;
                console.log(response);

                for (var i = 0; i < results.length; i++) {
                    
                    var gifDiv = $('<div class="item">');
                    var rating = results[i].rating;
                    var p = $('<p>').text("Rating: " + rating);

                    var giphyImg = $('<img>');
                    giphyImg.attr('src', results[i].images.fixed_height_still.url);
                    giphyImg.attr('data-still', results[i].images.fixed_height_still.url);
                    giphyImg.attr('data-animate', results[i].images.fixed_height.url);
                    giphyImg.attr('data-state', results[i].images.fixed_height_still.url);

                    gifDiv.append(giphyImg)
                    gifDiv.append(p)

                    $('#gifsAppearHere').prepend(gifDiv);

                }

                $('.item').children('img').on('click', function() {


                    var state = $(this).attr('data-state');

                    if (state == 'still') {
                        $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                    } else {
                        $(this).attr('src', $(this).data('still'));
                        $(this).attr('data-state', 'still');
                    }

                });
            });
    })};
