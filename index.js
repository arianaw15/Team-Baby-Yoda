

//sidenav
const sideNav = document.querySelector('.sidenav');
M.Sidenav.init(sideNav, {});


// if (localStorage.getItem("toDoArr") == null) {
//   var toDoArr = [];
//   var listItems = document.createElement("li");
//   listItems.textContent = toDoArr;
//   $(".listBtn").append(listItems);
//   }
//  else {
//   var toDoArr = JSON.parse(localStorage.getItem("toDoArr"))
// }
// for (let index = 0; index < toDoArr.length; index++) {
//   var toDo = toDoArr[index];
//   var listItems = document.createElement("li");
//   listItems.textContent = toDo;
//   $(".listBtn").append(listItems);
// }

var months = ["Jan","Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
$('.dropdown-trigger').dropdown()


function drawCalendarMonths() {
    for(var i = 0; i < months.length; i++) {
        // console.log("data", months[i])
        var doc = $('<li>');
        doc.addClass("month", [i]);
        // console.log(doc)
        doc.text(months[i]);
        
        $(document).on("click", ".month", function () {
            // console.log("clicked")
            selectedMonth = $(this).text();
            console.log("Selected: ",selectedMonth);
                $("#curMonth").text(selectedMonth);
                $("#curMonth").attr("data-name", selectedMonth);
                loadCalendarDays();
        });
       $("#dropdown1").append(doc);
    }
};
drawCalendarMonths()

function loadYears()
{
    // whichever date range makes the most sense
    var startYear = 2021;
    var endYear = 2030;

    for(var i = startYear; i <= endYear; i++)
    {
        var years = $("<li>");
        years.addClass("year");
        years.text(i)

        $(document).on("click", ".year", function(){
            selectedYear = $(this).html();
            console.log("Selected: ",selectedYear);
               $("#curYear").text(selectedYear)
               $("#curYear").attr("data-name", selectedYear);
                loadCalendarDays();
            }
        );

        $("#dropdown2").append(years);
    }
};
loadYears();



// function daysInMonth(selectedMonth, selectedYear)

function daysInMonth() {
    var year = $("#curYear").text();
    var month = $("#curMonth").text().trim();
    var mon = months.indexOf(month);
    console.log(mon)
    console.log(year)
    
    let d = new Date(year, mon+1, 0);
    return d.getDate();
    // let d = new Date(year, mon, 0).getDate();
 
   };


function loadCalendarDays(){

    $("#theDays").html("")

    var year = $("#curYear").text();
    var month = $("#curMonth").text().trim();
    var mon = months.indexOf(month);

    var tmpDate = new Date(year, mon, 0);
    var num = daysInMonth(mon, year);
    var dayofweek = tmpDate.getDay();

    console.log("a", tmpDate)
    console.log("b", num)
    console.log("c", dayofweek)


    for(var i = 0; i <= dayofweek; i++)
    {
        var dY = $("<div>");
        dY.addClass("day clear");
       $("#theDays").append(dY);
    }

    for(var i = 0; i < num; i++)
    {
        var tmp = i + 1;
        var d = $("<div class = day>");
        d.attr("id", "calendarday_" + i);
        d.attr("ondrop", "drop(event)")
        d.attr("ondragover", "allowDrop(event)")
        d.text(tmp);
        $("#theDays").append(d);
    }

    // var clear = $("<tr class = clear>");
    // $("#theDays").append(clear);

}

   daysInMonth()

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

  
$(".default").on("click", function () {
  $("#inputBox").addClass("hide");
  $(".itinerary").removeClass("hide");
  storeBtn();
  // console.log("works")
});

$("#list").on("click", function (event) {
  event.preventDefault();
  var list = $(".thingsToDo").val().trim();
  var listItems = $("<li>");
  listItems.text(list);
  listItems.attr("id", "drag1")
  listItems.attr("ondragstart", "drag(event)")
  listItems.attr("draggable", "true")
  $(".listBtn").append(listItems);
  toDoArr.push(list);
  localStorage.setItem("toDoArr", JSON.stringify(toDoArr));

  $(".thingsToDo").empty();

});

$("#clear").on("click", function(){
    setLocalStorage("toDoArr",empty);

});

$(".submitBtn").on("click", function (event) {
  event.preventDefault();
  var cityName = $("#search").val().trim();
  console.log(cityName);
  localStorage.setItem("toDoArr", cityName);
});

function omNomNom() {
  var APIKey = "78c8bb055391228975fd9d7974ac9137";
  var cityName = $("#search").val().trim();
  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+APIKey;
  
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
    var hotel1 = $("<div>").text(response.suggestions[1].entities[0].name)
    var hotel2 = $("<div>").text(response.suggestions[1].entities[1].name)
    var hotel3 = $("<div>").text(response.suggestions[1].entities[2].name)
    
  $(".Ofields").append(hotel1,hotel2,hotel3);
  
   });

}

$(".weatherBtn").on("click", function () {
  $(".Ofields").text("Weather");
  omNomNom();

});
$(".hotelBtn").on("click", function () {
  $(".Ofields").text("Hotels");
  hotels();
});

$(".eventBtn").on("click",function(){
  $(".Ofields").text("Calendar");
  calendarBtn();
})

function storeBtn() {
  var cityName = $("#search").val().trim();
  localStorage.setItem("City Name", cityName);
}


function getBtn(){
  var storageName=localStorage.getItem("City Name")
  $(".form-control").attr("value", storageName);
  console.log(storageName);
}
getBtn();

function calendarBtn(){
  $(".days").removeClass("hide");
}

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
      "x-rapidapi-key": "86b46a0ef5msh80d1a1ac851ef12p1478bfjsna7deacd463ee",
      "x-rapidapi-host": "hotels4.p.rapidapi.com",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    console.log(response.suggestions[2].entities[0].name);
  var site1 = $("<div>").text(response.suggestions[2].entities[0].name)
  var site2 = $("<div>").text(response.suggestions[2].entities[1].name)
  var site3 = $("<div>").text(response.suggestions[2].entities[2].name)
  
$(".Ofields").append(site1,site2,site3);
  
   });

}

$(".wanderBtn").on("click",function(){
  $(".Ofields").text("Sites");
  sites();
})
