$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8000/hue/config",
        method: "GET",
        dataType: "json"
    }).done(function(data){
        //console.log(data.groups);
        for(var group in data.groups) {
            console.log(data.groups[group].name);
            var g = document.createElement("div");
            g.innerHTML = data.groups[group].name;
            document.getElementById("content").appendChild(g);
        }
    });
});