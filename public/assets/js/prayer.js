if (window.location.pathname === "/prayers") {
    const LIMIT = 5;
    let offset = 0;

    //Add button
    $("#prayerForm").on("submit", function(event) {
        event.preventDefault();

        //new prayer
        var newPrayer = {
            Name: $("#name")
                .val()
                .trim(),
            Location: $("#location")
                .val()
                .trim(),
            Thoughts: $("#prayerBox")
                .val()
                .trim()
        };
        // var keys = Object.keys(newPrayer)
        // console.log(keys)
        // for (var i = 0; i < keys.length; i++) {
        //     var key = keys[i];
        //     if (newPrayer[key] === "") {
        //         alert("Didn't enter", key)
        //         return false
        //     }
        // }

        //   console.log(newPrayer);

        $.post("/api/prayers", newPrayer).then(function() {
            var row = $("<div>");
            row.addClass("prayer list-group-item");

            row.append("<p>" + newPrayer.Thoughts + "</p>");
            row.append("<br>");
            row.append("<p>" + "- " + newPrayer.Name + " from " + newPrayer.Location + "</p>");
            $("#prayerArea").prepend(row);
        });

        //clear fields
        $("#name").val("");
        $("#location").val("");
        $("#prayerBox").val("");
    });

    getPrayers(LIMIT, offset);

    function getPrayers(limit, offset) {
        $.get("/api/prayers?offset=" + offset + "&limit=" + limit, function(data) {
            $("#prayerArea").empty();
            if (data.length !== 0) {
                for (var i = 0; i < data.length; i++) {
                    var row = $("<div>");
                    row.addClass("prayer list-group-item");
                    row.append("<p>" + data[i].Thoughts + "</p>");
                    row.append("<br>");
                    row.append("<p>" + "- " + data[i].Name + " from " + data[i].Location + "</p>");
                    // row.append("<p>" + data[i].Name + "</p>");
                    // row.append("<p>" + data[i].Location + "</p>");
                    $("#prayerArea").append(row);
                }
            }
        });
    }

    $("#before").on("click", () => {
        offset -= LIMIT;
        getPrayers(LIMIT, offset);
    });

    $("#next").on("click", function() {
        offset += LIMIT;
        getPrayers(LIMIT, offset);
    });
}