if (localStorage.getItem("toDoArr") == null) {
  var toDoArr = [];
} else {
  var toDoArr = JSON.parse(localStorage.getItem("toDoArr"));
}
for (let index = 0; index < toDoArr.length; index++) {
  var toDo = toDoArr[index];
  var listItems = document.createElement("li");
  listItems.textContent = toDo;
  $(".listBtn").append(listItems);
}
$(".default").on("click", function () {
  $("#inputBox").addClass("hide");
  $(".itinerary").removeClass("hide");
  storeBtn();
  // console.log("works")
});

$(".listBtn").on("click", function () {
  var list = $(".thingsToDo").val().trim();
  var listItems = document.createElement("li");
  listItems.textContent = list;
  $(".listBtn").append(listItems);
  toDoArr.push(list);
  localStorage.setItem("toDoArr", JSON.stringify(toDoArr));
});

$(".submitBtn").on("click", function (event) {
  event.preventDefault();
  var cityName = $("#search").val().trim();
  console.log(cityName);
  // omNomNom();
  // hotels();
});
// $(".foodBtn").on("click", function () {
//   omNomNom();
// });
function omNomNom() {
  var APIKey =
    "g7B4WVMjT94MP1O6IxTnzv7us4MV7VSy223cYSOwu1GAbCXhkrA-zikEeduFrSK1p_gYLePrYLDdWUEYZlr2kaqFwmZMt4iDcrjIKZiK4FIlyIqEo7yXYuCR6UMTYHYx";
  var cityName = $("#search").val().trim();
  var queryUrl =
    "https://api.yelp.com/v3/businesses/search?location=" + cityName + "&";
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
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
    console.log(response.suggestions[1].entities[0].name);

    $(".hotelLst").append(response.suggestions[1].entities[0].name);
  });
}

$(".foodBtn").on("click", function () {
  $(".Ofields").text("Food");
  omNomNom();
});
$(".hotelBtn").on("click", function () {
  $(".Ofields").text("Hotels");
  hotels();
});

function storeBtn() {
  var cityName = $("#search").val().trim();
  localStorage.setItem("City Name", cityName);
}

function getBtn() {
  var storageName = localStorage.getItem("City Name");
  $(".submitBtn").append(storageName);
  console.log(storageName);
}
getBtn();
