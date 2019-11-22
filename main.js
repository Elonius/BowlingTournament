window.onload = function () {
    window.user = "";
    // add event handlers for buttons
    document.querySelector("#getTeams").addEventListener("click", guestGetTeams);
    document.querySelector("#adminGetTeams").addEventListener("click", adminGetTeams);
    document.querySelector("#adminGetPlayers").addEventListener("click", adminGetAllPlayers);
    document.querySelector("#btnAddTeam").addEventListener("click", showAddUpdateTeamPanel);
    document.querySelector("#btnAddPlayer").addEventListener("click", showAddUpdatePlayerPanel);
};

function guestGetTeams() {
//    user = "guest";
    getTeams();
}

function adminGetTeams() {
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
                console.log(resp);
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

    resetButtons();

//    document.querySelector("#AddButton").classList.remove("hidden");
    document.querySelector("#playerTable").classList.add("hidden");
    document.querySelector("#teamTable").classList.remove("hidden");

    html += "<div>";
    if (user === "admin") {
        document.querySelector("#btnAddTeam").classList.remove("hidden");
    }

    // The table
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
    html += "</div>";
    theTable.innerHTML = html;
    // End of table

    // Adding event listeners for the 'View Players' buttons
    let players = document.querySelectorAll(".viewPlayers");
    for (var i = 0; i < players.length; i++) {
        let temp = players[i];
        temp.addEventListener("click", getPlayers);
    }

    // Resetting user variable
    user = "";
}

// text is a JSON string containing an array
function buildPlayerTable(text) {
    let arr = JSON.parse(text);
    let theTable = document.querySelector("#playerTable");
    let html = theTable.querySelector("tr").innerHTML;

    resetButtons();

    html += "<div>";
    if (user === "admin") {
        document.querySelector("#btnAddPlayer").classList.remove("hidden");
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

    // Resetting user variable
    user = "";
}

function resetButtons() {
    document.querySelector("#btnAddTeam").classList.add("hidden");
    document.querySelector("#btnAddPlayer").classList.add("hidden");
    document.querySelector("#AddUpdateTeamPanel").classList.add("hidden");
    document.querySelector("#AddUpdatePlayerPanel").classList.add("hidden");
}

function showAddUpdateTeamPanel() {
    document.querySelector("#AddUpdateTeamPanel").classList.remove("hidden");
    document.querySelector("#btnAddTeam").classList.add("hidden");
}

function showAddUpdatePlayerPanel() {
    document.querySelector("#AddUpdatePlayerPanel").classList.remove("hidden");
    document.querySelector("#btnAddPlayer").classList.add("hidden");
}