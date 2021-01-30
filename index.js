$(".submitBtn").on("click", function(){
$("#inputBox").addClass("hide")
console.log("works")
})


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

  