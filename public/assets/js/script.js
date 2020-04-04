if (window.location.pathname === "/") {
    const LIMIT = 100;
    let pageIndex = 0;
    let TABLE_DATA = [];
    let header = {}



    /*Scroll to top when arrow up clicked BEGIN*/
    $(window).scroll(function() {
        var height = $(window).scrollTop();
        if (height > 100) {
            $("#back2Top").fadeIn();
        } else {
            $("#back2Top").fadeOut();
        }
    });

    $(document).ready(function() {
        const today = moment();
        const dayZero = moment("01/22/2020", "MM/DD/YYYY");
        const daysSinceOutbreak = today.diff(dayZero, "days");
        const yesterday = moment()
            .add(-1, "days")
            .format("YYYY-MM-DD");

        datePicker(today);
        displayTable(yesterday);

        $("#dataDays").html(daysSinceOutbreak);
        $(".todayDate").html(today.format("M-D-YYYY"));

        $("#submitBtn").on("click", function(event) {
            event.preventDefault();

            $("#today").empty();
            displayTable($("#datePicker1").val());
        });

        $("#back2Top").click(function(event) {
            event.preventDefault();
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        });
    });

    function datePicker(today) {
        $("#datePicker1").attr("max", today.format("YYYY-MM-DD"));
    }

    function displayTable(date) {
        const searchDate = convertDate(date);
        const searchUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${searchDate}.csv`;
        console.log(date);
        $.get(searchUrl).then(function(results) {
            const demo = results.split("\n").map(row => row.split(",")).map((cols, i) => ({
                City: cols[1],
                State: cols[2],
                Country: cols[3],
                updated: i === 0 ? cols[4] : moment(cols[4]).format("M.D.YY"),
                confirmed: cols[7],
                deaths: cols[8],
                recovered: cols[9],
                active: cols[10]
            }))
            header = demo.shift()
            TABLE_DATA = demo;

            console.log(header)
            console.log(demo)
            arrayToTable()
        });

        //end scrolling to the results for mobile
    }

    $("#moreTable").on("click", function() {
        pageIndex += LIMIT;
        arrayToTable()
        console.log("click")
    })

    //adding data to the table
    function arrayToTable() {
        $("#today").html('');
        var table = $('<table id="tableFixHead"></table>');
        var row = $("<tr></tr>");
        Object.keys(header).forEach(function(key) {
            row.append($("<td>" + header[key] + "</td>"));
        })
        table.append(row);
        for (var i = pageIndex; i < pageIndex + LIMIT; i++) {
            var row = $("<tr></tr>");
            var rowData = TABLE_DATA[i];
            Object.keys(rowData).forEach(function(key) {
                row.append($("<td>" + rowData[key] + "</td>"));
            });
            table.append(row);
        }
        //   $(tableData).each(function(i, rowData) {
        //     var row = $("<tr></tr>");
        //     $(rowData).each(function(j, cellData) {
        //       row.append($("<td>" + cellData + "</td>"));
        //     });
        //     table.append(row);
        //   });
        $("#today").append(table);
        //scrollToTable()
    }
    //scrolling to the results for mobile
    function scrollToTable() {
        $("html, body").animate({
                scrollTop: $("#tableFixHead").offset()
            },
            1000
        );
    }
    // end capture user date choice

    //converting user input to use for the search
    function convertDate(dateString) {
        var p = dateString.split(/\D/g);
        return [p[1], p[2], p[0]].join("-");
    }

    function zoomin() {
        var myImg = document.getElementById("sky");
        var currWidth = myImg.clientWidth;
        if (currWidth == 500) {
            alert("Maximum zoom-in level reached.");
        } else {
            myImg.style.width = currWidth + 50 + "px";
        }
    }

    function zoomout() {
        var myImg = document.getElementById("sky");
        var currWidth = myImg.clientWidth;
        if (currWidth == 50) {
            alert("Maximum zoom-out level reached.");
        } else {
            myImg.style.width = currWidth - 50 + "px";
        }
    }
}