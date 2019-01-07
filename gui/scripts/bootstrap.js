$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8000/hue/config",
        method: "GET",
        dataType: "json"
    }).done(function(data){
        //console.log(data.groups);
        //console.log(data);
        lights = data.lights;
        for(var group in data.groups) {
            //Top Level LI for each Group
            var g = document.createElement("li");
            g.innerHTML = data.groups[group].name;

            //Create a nested UL for the Group to Display all of the Lights in that Group
            var ul = document.createElement("ul");
            for(i = 0; i < data.groups[group].lights.length; i++) {
                var li = document.createElement("li");
                var input = document.createElement("input");
                var label = document.createElement("label");
                
                input.type = "checkbox";
                input.value = data.groups[group].lights[i];
                label.innerHTML = lights[data.groups[group].lights[i]].name;
                li.appendChild(input);
                li.appendChild(label);
                ul.appendChild(li);
            }

            //Append the nested UL with all the lights and the LI for the whole group
            g.appendChild(ul);
            document.getElementById("lights").appendChild(g);
        }
    });

    $.ajax({
        url: 'http://localhost:8000/streamlabs/token',
        method: 'GET',
        dataType: 'json'
    }).done(function(data) {
        setupSocket(data.wstoken);
    });
});

function getCheckedLights() {
    checkboxes = document.getElementsByTagName("input");
    var checked = [];
    
    for(i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked == true) {
            checked.push(checkboxes[i].value);
        }
    }

    var checkedLights = {};
    checkedLights.lights = checked;

    return checkedLights;
}

function setupSocket(socketToken) {
    //Connect to socket
    const streamlabs = io(`https://sockets.streamlabs.com?token=` + socketToken);
    
    //Perform Action on event
    streamlabs.on('event', (eventData) => {
        if (!eventData.for || eventData.for === 'streamlabs' && eventData.type === 'donation') {
            //code to handle donation events
            console.log(eventData.message);
        }
        if (eventData.for === 'twitch_account') {
            switch(eventData.type) {
                case 'follow':
                    //code to handle follow events
                    console.log(eventData.message);
                    $.ajax({
                        type: "POST",
                        url: "http://localhost:8000/events/follow/",
                        data: JSON.stringify(getCheckedLights()),
                        contentType: "application/json"
                    }).done(function(data) {
                        //console.log(data);
                    });
                break;
                case 'subscription':
                    //code to handle subscription events
                    console.log(eventData.message);
                    $.ajax({
                        type: "POST",
                        url: "http://localhost:8000/events/subscribe/",
                        data: JSON.stringify(getCheckedLights()),
                        contentType: "application/json"
                    }).done(function(data) {
                        //console.log(data);
                    });

                break;
                case 'bits':
                    //code to handle subscription events
                    console.log(eventData.message);
                    $.ajax({
                        type: "POST",
                        url: "http://localhost:8000/events/bits/",
                        data: JSON.stringify(getCheckedLights()),
                        contentType: "application/json"
                    }).done(function(data) {
                        //console.log(data);
                    });

                break;
                default:
                    //default case
                    console.log(eventData.message);
            }
        }
    });
}