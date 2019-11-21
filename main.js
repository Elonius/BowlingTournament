window.onload = function () {
    window.user = "";
    // add event handlers for buttons
    document.querySelector("#getTeams").addEventListener("click", guestGetTeams);
    document.querySelector("#adminGetTeams").addEventListener("click", adminGetTeams);
    document.querySelector("#adminGetPlayers").addEventListener("click", adminGetAllPlayers);

//    document.querySelector("#getPlayers").addEventListener("click", getPlayers);

//    hideUpdatePanel();
};

function guestGetTeams() {
    user = "guest";
    getTeams();
}

function adminGetTeams() {
//    debugger;
    user = "admin";
    getTeams();
}

function adminGetAllPlayers() {
    user = "admin";
    getAllPlayers();
}

// make AJAX call to PHP to get JSON data
function getTeams() {
    let url = "BowlingTournament/teams";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText;
            if (resp.search("ERROR") >= 0) {
                alert("oh no...Check console");
            } else {
                buildTeamTable(resp);
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

//    document.querySelector("#GetButton").classList.add("hidden");
}

// Used for the buildTeams function
function getPlayers(e) {
    let id = (e.target.parentElement.parentElement.cells[0].innerHTML);
    let url = "BowlingTournament/players/" + id;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText;
            if (resp.search("ERROR") >= 0) {
                alert("oh no...Check console");
            } else {
                buildPlayerTable(resp);
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

//    document.querySelector("#GetButton").classList.add("hidden");
}

function getAllPlayers() {
//    let id = (e.target.parentElement.parentElement.cells[0].innerHTML);
    let url = "BowlingTournament/players";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText;
            if (resp.search("ERROR") >= 0) {
                alert("oh no...Check console");
            } else {
                buildPlayerTable(resp);
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

//    document.querySelector("#GetButton").classList.add("hidden");
}

// text is a JSON string containing an array
function buildTeamTable(text) {
    let arr = JSON.parse(text);
    let theTable = document.querySelector("#teamTable");
    let html = theTable.querySelector("tr").innerHTML;

//    document.querySelector("#AddButton").classList.remove("hidden");
    document.querySelector("#teamTable").classList.remove("hidden");
    document.querySelector("#playerTable").classList.add("hidden");
    html += "<div>";
    if (user === "admin") {
        html += "<button>Add a Team</button><br>";
    }

    html += "<h3>All teams in tournament</h3>";
    html += "<table>";
    for (let i = 0; i < arr.length; i++) {
        let row = arr[i];
        html += "<tr>";
        html += "<td>" + row.teamID + "</td>";
        html += "<td>" + row.teamName + "</td>";
        if (row.earnings === null) {
            html += "<td>$0.00</td>";
        } else {
            html += "<td>" + row.earnings + "</td>";
        }
        html += "<td><button class=viewPlayers>View Players</button></td>";
        html += "</tr>";
    }
    html += "</table></div>";
    console.log(html);
    theTable.innerHTML = html;

    let players = document.querySelectorAll(".viewPlayers");

    // Adding event listeners for the delete and update buttons
    for (var i = 0; i < players.length; i++) {
        let temp = players[i];
        temp.addEventListener("click", getPlayers);
    }
}

// text is a JSON string containing an array
function buildPlayerTable(text) {
    let arr = JSON.parse(text);
    let theTable = document.querySelector("#playerTable");
    let html = theTable.querySelector("tr").innerHTML;
    html += "<div>";
    if (user === "admin") {
        html += "<button type=submit>Add a Player</button>";
    }
//    document.querySelector("#AddButton").classList.remove("hidden");
    document.querySelector("#playerTable").classList.remove("hidden");
    document.querySelector("#teamTable").classList.add("hidden");
    html += "<table>";
    for (let i = 0; i < arr.length; i++) {
        let row = arr[i];
        html += "<tr>";
        html += "<td>" + row.playerID + "</td>";
        html += "<td>" + row.teamID + "</td>";
        html += "<td>" + row.firstName + "</td>";
        html += "<td>" + row.lastName + "</td>";
        html += "<td>" + row.hometown + "</td>";
        html += "<td>" + row.province + "</td>";
        html += "</tr>";
    }
    html += "</table>";
    theTable.innerHTML = html;
}