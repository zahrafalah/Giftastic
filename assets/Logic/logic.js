$(document).ready(function() {
var celebrity;
var celebrities = ["Taylor Swift","Elvis Presley","Michael Jackson","Hugh Laurie","Sherlock","Trump","Trevor Noah","Jim Parson"];
var myNewArr = [];

function removeSpace(){

    for (i = 0; i < celebrities.length; i++) {

        var empSpace = celebrities[i].substring(0, celebrities[i].indexOf(" "));

        var replaceTxt = empSpace.replace(empSpace, empSpace + "+");

        var celebrityItem = replaceTxt + celebrities[i].substring(celebrities[i].indexOf(" ") + 1, celebrities[i].length);

        myNewArr[i] = celebrityItem;

    }
}

function displayInfo() {

    var celebrity = $(this).attr("data-name");
    var queryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=vC94xlaeCQ6VeKHy5v0mtGsyFroqqmjA&q='+celebrity+'&limit=10&lang=en'

    
    $("#giphs-view").empty();

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).done(function(response){
        
        console.log(queryUrl);
        console.log(response);
    
        for ( i = 0 ; i < response.data.length ; i++ ) {
            var newDiv = $('<div class="inline">')
            var newP = $("<p> Rating: " + response.data[i].rating + "</p>");
            var image = $(`<img src='' data-still='' data-animate='' data-state='' class='gif'> `);
            image.attr("src",response.data[i].images.fixed_height_still.url);
            image.attr("data-still",response.data[i].images.fixed_height_still.url);
            image.attr("data-animate",response.data[i].images.fixed_height.url);
            image.attr("data-state","still");

            newDiv.append(newP);
            newDiv.append(image);
            $("#giphs-view").append(newDiv);
        }
    })
}

$(document).on("click", ".gif", function() {
    console.log("hi");
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
})

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < myNewArr.length; i++) {
        var a = $("<button class='btn btn-outline-success'>");  
        a.addClass("celeb-btn");
        a.attr("data-name", myNewArr[i]);
        a.text(celebrities[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-name").on("click", function(event) {
   event.preventDefault();
   var name = $("#celeb-input").val().trim();
   celebrities.push(name);
   $("#celeb-input").val('');
   removeSpace(); 
   renderButtons();
   
});

$(document).on("click",".celeb-btn", displayInfo);

removeSpace();
renderButtons(); 
})
