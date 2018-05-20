// topics fill preselected button catagorys
var topics = ['boats', 'nature', 'swimming', 'cats'];

function renderButtons() {
    $('#addButton').empty();
    //for loop that iterates through array and creates button
    for (let i = 0; i < topics.length; i++) {


        var button = $('<button>');
        button.addClass('topics');
        button.attr('data-name', topics[i]);
        button.text(topics[i]);
        $('#addButton').append(button);

    }
    addGif();

};
// allows user to input catagory selection
$('#addGif').on('click', function() {
    var userInput = $('#gif-input').val().trim();
    //console.log($('#gif-input'));
    topics.push(userInput);
    renderButtons();
    return false;
    // show input value and removes white space
    if (userInput === ' ') {
        $('#gif-input').val().trim();
    }
});


renderButtons();

      //  takes user input from above and adds it to search perameters
function addGif() {
    $('button').on('click', function() {
        var p = $(this).data('name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+"p"+"&api_key=QbXwW8Bhh9LKyavC78mxT8EEa7vk6nUD&limit=10";
      
        // gets the response from Giphy
        $.ajax({ url: queryURL, method: 'GET' })
            .done(function(response) {
                var results = response.data;
                //console.log(response);

                for (let i = 0; i < results.length; i++) {
                 // add rating to results   
                    var gifDiv = $('<div class="item">');
                    var rating = results[i].rating;
                    var p = $('<p>').text("Rating: " + rating);
                 // sort result attributes
                    var giphyImg = $('<img>');
                    giphyImg.attr('src', results[i].images.fixed_height_still.url);
                    giphyImg.attr('data-still', results[i].images.fixed_height_still.url);
                    giphyImg.attr('data-animate', results[i].images.fixed_height.url);
                    giphyImg.attr('data-state', results[i].images.fixed_height_still.url);

                    gifDiv.append(giphyImg)
                    gifDiv.append(p)
                 // places Gifs on page
                    $('#gifsAppearHere').prepend(gifDiv);

            

                $('.item').children('img').on('click', function() {

                   // adds functionality to Gif if avalable

                    var state = $(this).attr('data-state');

                    if (state == 'still') {
                        $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                    } else {
                        $(this).attr('src', $(this).data('still'));
                        $(this).attr('data-state', 'still');
                    }

                });
            }});
    })};
