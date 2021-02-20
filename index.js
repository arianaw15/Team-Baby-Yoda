//sidenav
const sideNav = document.querySelector(".sidenav");
M.Sidenav.init(sideNav, {});


//Submit Button + Location
$(".submitBtn").on("click", function (event) {
  event.preventDefault();
  var cityName = $("#search").val().trim();
  console.log(cityName);
});

//Weather Button + Function

function omNomNom() {
  var APIKey = "78c8bb055391228975fd9d7974ac9137";
  var cityName = $("#search").val().trim();
  var queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    APIKey+"&units=imperial";

  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var weather = $("<h4>").text("Current weather in "+cityName+":");
    var temp = $("<div>").text("Temperature: " + (response.main.temp)+ " degrees fahrenheit");
    var description = $("<div>").text("Weather Description: " + (response.weather[0].main));
    var humidity = $("<div>").text("Humidity: " + (response.main.humidity));
    $(".Ofields").append(weather,description,temp,humidity);

    if (response.weather[0].main === "Clouds"){
      var weatherImg = $("<div>").html("<span class=material-icons weather style=font-size:50px>wb_cloudy</span>");
      $(".Ofields").append(weatherImg);
    }
    else if(response.weather[0].main==="Clear"){
      var weatherImg = $("<div>").html("<span class=material-icons style=font-size:50px>wb_sunny</span>");
      $(".Ofields").append(weatherImg);
    }
    else if(response.weather[0].main === "Snow"){
      var weatherImg = $("<div>").html("<span class=material-icons style=font-size:50px>ac_unit</span>");
      $(".Ofields").append(weatherImg);
    }
    else if(response.weather[0].main === "Rain"){
      var weatherImg = $("<div>").html("<span class=material-icons style=font-size:50px>opacity</span>");
      $(".Ofields").append(weatherImg);
    }
  });
}

$(".weatherBtn").on("click", function () {
  $(".Ofields").text("");
  $(".days").addClass("hide");
  omNomNom();
});

//Hotel Button + Function
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
      "x-rapidapi-key": "a0eab1f340msh610e3e1a39ef173p1fb060jsnfe640e80378c",
      "x-rapidapi-host": "hotels4.p.rapidapi.com",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    console.log(response.suggestions[1].entities[0].name);
    var hotel1 = $("<li>").text(response.suggestions[1].entities[0].name);
    var hotel2 = $("<li>").text(response.suggestions[1].entities[1].name);
    var hotel3 = $("<li>").text(response.suggestions[1].entities[2].name);
    var hotels = $("<h4>").text("Hotels in "+cityName+":");
$(".Ofields").append(hotels,hotel1,hotel2,hotel3);
var hotelLink= $("<button>");
hotelLink.html("<a href=https://www.google.com/search?q=hotels+in+"+cityName+">Other Hotels</a>")
$(".Ofields").append(hotelLink);

  });
}

$(".hotelBtn").on("click", function () {
  $(".Ofields").text("");
  $(".days").addClass("hide");
  hotels();
});

//Storing + Retrieving City Name

function storeBtn() {
  var cityName = $("#search").val().trim();
  localStorage.setItem("City Name", cityName);
}

function getBtn() {
  var storageName = localStorage.getItem("City Name");
  $(".form-control").attr("value", storageName);
  console.log(storageName);
}
getBtn();

//Sites Button + Function

function sites() {
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
      "x-rapidapi-key": "a0eab1f340msh610e3e1a39ef173p1fb060jsnfe640e80378c",
      "x-rapidapi-host": "hotels4.p.rapidapi.com",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    console.log(response.suggestions[2].entities[0].name);
    var site1 = $("<li>").text(response.suggestions[2].entities[0].name);
    var site2 = $("<li>").text(response.suggestions[2].entities[1].name);
    var site3 = $("<li>").text(response.suggestions[2].entities[2].name);
    var sites = $("<h4>").text("Sites in "+cityName+":")
    $(".Ofields").append(sites,site1,site2,site3);
    var sitesLink= $("<button>");
    sitesLink.html("<a href=https://www.google.com/search?q=sites+in+"+cityName+">Other Sites</a>");
$(".Ofields").append(sitesLink);
    
  });
}

$(".wanderBtn").on("click", function () {
  $(".Ofields").text("");
  $(".days").addClass("hide");
  sites();
});

$(".default").on("click", function () {
  $("#inputBox").addClass("hide");
  $(".itinerary").removeClass("hide");
  $(".cube").removeClass("hide");
  storeBtn();
});

//Things to Do List + Drag and Drop  Function
var theList = JSON.parse(localStorage.getItem("toDoArr")) || [];

$("#list").on("click", function (event) {
  event.preventDefault();
  var list = $(".thingsToDo").val().trim();
  theList.push(list)
  localStorage.setItem("toDoArr", JSON.stringify(theList));
  renderToDoList();
  
});

function renderToDoList(){
  $("#daList").text("");
  for (let i=0; i<theList.length; i++){
    var listItems = $("<li>");
    listItems.text(theList[i]);
    listItems.attr("id", list)
    listItems.attr("ondragstart", "drag(event)")
    listItems.attr("draggable", "true")
    $("#daList").append(listItems);
  }
}

$("#clear-history").on("click",function() {
  theList = [];
  renderToDoList();
})

// if (localStorage.getItem("toDoArr") == null) {
//   var toDoArr = [];
// } else {
//   var toDoArr = JSON.parse(localStorage.getItem("toDoArr"));
// }
// for (let index = 0; index < toDoArr.length; index++) {
//   var toDo = toDoArr[index];
//   var listItems = document.createElement("li");
//   listItems.textContent = toDo;
//   $(".listBtn").append(listItems);
// }

//Calendar

var months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
$(".dropdown-trigger").dropdown();

function drawCalendarMonths() {
  for (var i = 0; i < months.length; i++) {
    // console.log("data", months[i])
    var doc = $("<li>");
    doc.addClass("month", [i]);
    // console.log(doc)
    doc.text(months[i]);

    $(document).on("click", ".month", function () {
      // console.log("clicked")
      selectedMonth = $(this).text();
      console.log("Selected: ", selectedMonth);
      $("#curMonth").text(selectedMonth);
      $("#curMonth").attr("data-name", selectedMonth);
      loadCalendarDays();
    });
    $("#dropdown1").append(doc);
  }
}
drawCalendarMonths();

function loadYears() {
  // whichever date range makes the most sense
  var startYear = 2021;
  var endYear = 2030;

  for (var i = startYear; i <= endYear; i++) {
    var years = $("<li>");
    years.addClass("year");
    years.text(i);

    $(document).on("click", ".year", function () {
      selectedYear = $(this).html();
      console.log("Selected: ", selectedYear);
      $("#curYear").text(selectedYear);
      $("#curYear").attr("data-name", selectedYear);
      loadCalendarDays();
    });

    $("#dropdown2").append(years);
  }
}
loadYears();

// function daysInMonth(selectedMonth, selectedYear)

function daysInMonth() {
  var year = $("#curYear").text();
  var month = $("#curMonth").text().trim();
  var mon = months.indexOf(month);
  console.log(mon);
  console.log(year);

  let d = new Date(year, mon + 1, 0);
  return d.getDate();
  // let d = new Date(year, mon, 0).getDate();
}

function loadCalendarDays() {
  $("#theDays").html("");

  var year = $("#curYear").text();
  var month = $("#curMonth").text().trim();
  var mon = months.indexOf(month);

  var tmpDate = new Date(year, mon, 0);
  var num = daysInMonth(mon, year);
  var dayofweek = tmpDate.getDay();

  console.log("a", tmpDate);
  console.log("b", num);
  console.log("c", dayofweek);

  for (var i = 0; i <= dayofweek; i++) {
    var dY = $("<div>");
    dY.addClass("day clear");
    $("#theDays").append(dY);
  }

  for (var i = 0; i < num; i++) {
    var tmp = i + 1;
    var d = $("<div class = day>");
    d.attr("id", "calendarday_" + i);
    d.attr("ondrop", "drop(event)");
    d.attr("ondragover", "allowDrop(event)");
    d.text(tmp);
    d.addClass("savePls")
    $("#theDays").append(d);
  }

  

  // var clear = $("<tr class = clear>");
  // $("#theDays").append(clear);
}

daysInMonth();

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

$(".eventBtn").on("click", function () {
  $(".Ofields").text("");
  calendarBtn();
});

function calendarBtn() {
  $(".days").removeClass("hide");
}




//cube
var box = document.querySelector('.box');
      
      var radioGroup = document.querySelector('.radio-group');
      
      var currentClass = '';

      function changeSide() {
        var checkedRadio = radioGroup.querySelector(':checked');
        var showClass = 'show-' + checkedRadio.value;
        if ( currentClass ) {
          box.classList.remove( currentClass );
        }
        box.classList.add( showClass );
        currentClass = showClass;
      }
      // set initial side
      changeSide();

      radioGroup.addEventListener( 'change', changeSide );
