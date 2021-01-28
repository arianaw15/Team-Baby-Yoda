$(".default").on("click", function(){
$("#inputBox").addClass("hide");
$(".itinerary").removeClass("hide");
// console.log("works")
})

$(".listBtn").on("click",function(){
  var list = $(".thingsToDo").val().trim();
  var listItems= document.createElement("li");
  listItems.textContent=list;
  $(".listBtn").append(listItems);
})

$(".submitBtn").on("click", function(event){
    event.preventDefault();
    var cityName = $("#search").val().trim();
    console.log(cityName);
    omNomNom();
})


function omNomNom(){
    var APIKey= "ccfafb472d62ea2ef5624c2697d65c8c"
    var cityName = $("#search").val().trim();
    var settings = {
        "url": "https://developers.zomato.com/api/v2.1/search?q="+cityName,
        "method": "GET",
        "timeout": 0,
        "headers": {
          "user-key": APIKey
        },
      };

      $.ajax(settings).done(function (response) {
        console.log(response);
      });
    }