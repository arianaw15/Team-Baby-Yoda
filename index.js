$(".default").on("click", function () {
  $("#inputBox").addClass("hide");
  $(".itinerary").removeClass("hide");
  // console.log("works")
});

$(".listBtn").on("click", function () {
  var list = $(".thingsToDo").val().trim();
  var listItems = document.createElement("li");
  listItems.textContent = list;
  $(".listBtn").append(listItems);
});

$(".submitBtn").on("click", function (event) {
  event.preventDefault();
  var cityName = $("#search").val().trim();
  console.log(cityName);
  omNomNom();
  hotels();
});
// $(".foodBtn").on("click", function () {
//   omNomNom();
// });
function omNomNom() {
  var APIKey = "ccfafb472d62ea2ef5624c2697d65c8c";
  var cityName = $("#search").val().trim();
  var settings = {
    url: "https://developers.zomato.com/api/v2.1/search?q=" + cityName,
    method: "GET",
    timeout: 0,
    headers: {
      "user-key": APIKey,
    },
  };
  console.log(settings.url);
  console.log(settings.headers);
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}

function hotels() {
  var cityName = $("#search").val().trim();
  const settings = {
    async: true,
    crossDomain: true,
    url:
      "https://hotels4.p.rapidapi.com/locations/search?query=" +
      cityName +
      "&locale=en_US",
    method: "GET",
    headers: {
      "x-rapidapi-key": "86b46a0ef5msh80d1a1ac851ef12p1478bfjsna7deacd463ee",
      "x-rapidapi-host": "hotels4.p.rapidapi.com",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}
