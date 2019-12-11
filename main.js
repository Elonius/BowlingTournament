let user = "";
let addOrUpdate = "";
let teamOrPlayer = "";
let teamArray;
let tick = 0;
let matchupsArr;
let globalTeams;
let globalPlayers;

const SPARE_CHAR = "/";
const STRIKE_CHAR = "X";
const BALL_SEPARATOR_CHAR = " ";

window.onload = function () {
    getAllTeams();
    loadPlayers();

    // add event handlers for buttons
    document.querySelector("#getTeams").addEventListener("click", guestGetTeams);
    document.querySelector("#getStandings").addEventListener("click", guestViewStandings);
    document.querySelector("#adminGetTeams").addEventListener("click", adminGetTeams);
    document.querySelector("#adminGetPlayers").addEventListener("click", adminGetAllPlayers);
    document.querySelector("#adminGenerateMatchups").addEventListener("click", generateRandomMatchups);
    document.querySelector("#btnAddTeam").addEventListener("click", showAddUpdateTeamPanel);
    document.querySelector("#btnAddPlayer").addEventListener("click", showAddUpdatePlayerPanel);
//    document.querySelector("#viewMatchups").addEventListener("click", viewMatchups);
    document.querySelector("#viewMatchups").addEventListener("click", generateQualGames);
    document.querySelector("#adminAdvanceQual").addEventListener("click", autoGenerateQualRounds);
//    document.querySelector("#adminGenerateQualRounds").addEventListener("click", generateQualRounds);
//    document.querySelector("#adminViewQualGames").addEventListener("click", generateQualGames);

    resetPage();
};

function resetPage() {
    document.querySelector("#AddUpdateTeamPanel").classList.add("hidden");
    document.querySelector("#AddUpdatePlayerPanel").classList.add("hidden");
    document.querySelector("#btnAddTeam").classList.add("hidden");
    document.querySelector("#btnAddPlayer").classList.add("hidden");
    document.querySelector("#adminTeamTable").classList.add("hidden");
    document.querySelector("#guestTeamTable").classList.add("hidden");
    document.querySelector("#playerTable").classList.add("hidden");
    document.querySelector("#standingsTable").classList.add("hidden");
    document.querySelector("#availGamesTable").classList.add("hidden");
    document.querySelector("#score").classList.add("hidden");
    document.querySelector("#matchups").classList.add("hidden");
}

function guestGetTeams() {
    user = "guest";
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
    resetPage();

    let url = "BowlingTeamService/team";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText;
            if (resp.search("ERROR") >= 0) {
                alert("oh no...Check console");
            } else {
                if (user === "admin") {
                    buildAdminTeamTable(resp);
                } else if (user === "guest") {
                    buildGuestTeamTable(resp);
                } else if (user === "matchups") {
                    teamArray = JSON.parse(resp);
                    // Reset the user
                    user = "";
                }
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

// Used for the buildTeams function
function getPlayers(e) {
    let id = (e.target.parentElement.parentElement.cells[0].innerHTML);
    let url = "BowlingPlayerService/players/" + id;
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
}

function loadPlayers() {
    let url = "BowlingPlayerService/players";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText;
            if (resp.search("ERROR") >= 0) {
                alert("oh no...Check console");
            } else {
                globalPlayers = resp;
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getAllPlayers() {
    let url = "BowlingPlayerService/players";
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
}

// text is a JSON string containing an array
function buildAdminTeamTable(text, user) {
    resetPage();

    // Show team table and add team button
    document.querySelector("#adminTeamTable").classList.remove("hidden");
    document.querySelector("#btnAddTeam").classList.remove("hidden");

    // The table
    let arr = JSON.parse(text);
    let theTable = document.querySelector("#adminTeamTable");
    let html = theTable.querySelector("tr").innerHTML;

    html += "<div>";

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
        html += "<td><button class=editTeam>Edit Team</button></td>";
        html += "<td><button class=deleteTeam>Delete Team</button></td>";
        html += "</tr>";
    }

    html += "</div>";
    theTable.innerHTML = html;
    // End of table

    // Adding event listeners for the 'View Players' buttons
    let players = document.querySelectorAll(".viewPlayers");
    let edit = document.querySelectorAll(".editTeam");
    let del = document.querySelectorAll(".deleteTeam");
    for (var i = 0; i < players.length; i++) {
        let temp = players[i];
        let tempEdit = edit[i];
        let tempDel = del[i];
        temp.addEventListener("click", getPlayers);
        tempEdit.addEventListener("click", editTeam);
        tempDel.addEventListener("click", deleteTeam);
    }

    // Reset user variable
    user = "";
}

function buildGuestTeamTable(text) {
    let arr = JSON.parse(text);
    let theTable = document.getElementById("guestTeamTable");
    let html = theTable.querySelector("tr").innerHTML;

    document.querySelector("#guestTeamTable").classList.remove("hidden");

    html += "<div>";

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

    // Adding event listeners for the 'View Players' buttons
    let players = document.querySelectorAll(".viewPlayers");
    for (var i = 0; i < players.length; i++) {
        let temp = players[i];
        temp.addEventListener("click", getPlayers);
    }

    // Reset user variable
//    user = "";
// get rid of two th's
}

function updateTeam(id) {
    //dont add if any field is empty
    if (document.querySelector("#addUpdateTeamID").value === "" || document.querySelector("#addUpdateTeamName").value === "") {
        alert("ERROR: Please fill out all fields");
    }
    //don't add if ID is not an integer
    else {
        //let id = parseInt(document.querySelector("#updateTeamID").value);
        if (!Number.isInteger(id)) {
            alert("ERRROR: ID must be a whole number");
        } else {
            addOrUpdateTeam("update");
        }
    }
}

function editTeam(e) {
    let teamID = e.path[2].children[0].innerHTML;
    let teamName = e.path[2].children[1].innerHTML;

    // Show edit panel
    showAddUpdateTeamPanel();
    document.querySelector(".panelTitle").innerHTML = "Edit Team";

    //must contain a tag #updateTeamID  #updateTeamName
    //populate edit panel with team specific information
    //#updateTeamID #updateTeamName  
    document.querySelector("#addUpdateTeamID").value = teamID;
    document.querySelector("#addUpdateTeamName").value = teamName;
    //user edits teamID or teamName
    //add event listener to done button to go to updateTeam
    let doneBtn = document.querySelector(".TeamDoneButton");
    doneBtn.removeEventListener("click", addTeamOrPlayer);
    doneBtn.addEventListener("click", function () {
        updateTeam(+teamID);
    });

    // Takes user to top of page
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// text is a JSON string containing an array
function buildPlayerTable(text) {
    resetPage();

    if (user === "admin") {
        document.querySelector("#btnAddPlayer").classList.remove("hidden");
    }

    // Shows player table - Hides team table
    document.querySelector("#playerTable").classList.remove("hidden");

    // The table
    let arr = JSON.parse(text);
    let theTable = document.querySelector("#playerTable");
    let html = theTable.querySelector("tr").innerHTML;

    // ******************** Need to stop adding these THs *************************
    if (user === "admin") {
        document.querySelector("#playerTable").deleteTHead();
        html = "<th>ID</th><th>Team ID</th><th>First Name</th><th>Last Name</th><th>Hometown</th><th>Province</th><th>Edit</th><th>Delete</th>";
//        tick++;
    } else if (user === "guest") {
        document.querySelector("#playerTable").deleteTHead();
        html = "<th>ID</th><th>Team ID</th><th>First Name</th><th>Last Name</th><th>Hometown</th><th>Province</th>";
    }
    html += "<div>";
    for (let i = 0; i < arr.length; i++) {
        let row = arr[i];
        html += "<tr>";
        html += "<td>" + row.playerID + "</td>";
        html += "<td>" + row.teamID + "</td>";
        html += "<td>" + row.firstName + "</td>";
        html += "<td>" + row.lastName + "</td>";
        html += "<td>" + row.hometown + "</td>";
        html += "<td>" + row.province + "</td>";
        if (user === "admin") {
            html += "<td><button class=editPlayer>Edit</button></td>";
            html += "<td><button class=deletePlayer>Delete</button></td>";
        }
        html += "</tr>";
    }

    theTable.innerHTML = html;
    // End of the table

    // Eventlisteners for cancel/done buttons
    let editBtns = document.querySelectorAll(".editPlayer");
    let deleteBtns = document.querySelectorAll(".deletePlayer");
    for (var i = 0; i < editBtns.length; i++) {
        editBtns[i].addEventListener("click", editPlayer);
//        let tempEdit = editBtns[i];
        let tempDelete = deleteBtns[i];
//        tempEdit.addEventListener("click", editPlayer);
        tempDelete.addEventListener("click", deletePlayer);
    }

    // Resetting user variable
    user = "";
}

function updatePlayer() {
//    debugger;
    //get data from text boxes
    playerID = document.querySelector("#playerIDInput").value;
    teamID = document.querySelector("#teamIDInput").value;
    firstName = document.querySelector("#firstNameInput").value;
    lastName = document.querySelector("#lastNameInput").value;
    hometown = document.querySelector("#hometownInput").value;
    province = document.querySelector("#provinceInput").value;
    //put ajax call with appropriate ID
    let url = "bowlingPlayerService/players/" + playerID;
    let obj = {
        playerID: playerID,
        teamID: teamID,
        firstName: firstName,
        lastName: lastName,
        hometown: hometown,
        province: province
    };

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var resp = xmlhttp.responseText;
            if (resp.search("ERROR") >= 0 || resp != 1) {
                alert("Player NOT added");
//                console.log(resp);
            } else {
                alert('Player added');
                adminGetTeams();
            }
        }
    };
    xmlhttp.open("PUT", url, true);
    xmlhttp.send(JSON.stringify(obj));
}

function editPlayer(e) {
    // Takes user to top of page
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    //remove event listenr from done button that adds a player
    document.querySelector(".PlayerDoneButton").removeEventListener("click", addTeamOrPlayer);
    //add the event listener to the done button that updates a player
    document.querySelector(".PlayerDoneButton").addEventListener("click", updatePlayer);
    showAddUpdatePlayerPanel();


    //////////////////////////

//     let teamID = e.path[2].children[0].innerHTML;
//    let teamName = e.path[2].children[1].innerHTML;
//    console.log(teamID);
//    console.log(teamName);
//    // show edit panel
//    showAddUpdateTeamPanel();
//    document.querySelector(".panelTitle").innerHTML = "Edit Team";
//
//    //must contain a tag #updateTeamID  #updateTeamName
//    //populate edit panel with team specific information
//    //#updateTeamID #updateTeamName  
//    document.querySelector("#addUpdateTeamID").value = teamID;
//    document.querySelector("#addUpdateTeamName").value = teamName;
//    //user edits teamID or teamName
//    //add event listener to done button to go to updateTea,1
//    let doneBtn = document.querySelector(".TeamDoneButton");
//    doneBtn.removeEventListener("click", addTeamOrPlayer);
//    doneBtn.addEventListener("click", function () {
//        updateTeam(+teamID);
//    });
//
//    // Takes user to top of page
//    document.body.scrollTop = 0;
//    document.documentElement.scrollTop = 0;

    /////////////////////////



    addOrUpdatePlayer("update", e);
}

function deletePlayer(e) {
    let id = (e.target.parentElement.parentElement.cells[0].innerHTML);
    // AJAX
    var url = "bowlingPlayerService/delPlayer/" + id;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText;

            if (resp != 1) {
                alert("Item NOT deleted. Check console.");
                console.log(resp);
            } else {
                adminGetTeams();
            }
        }
    };
    xmlhttp.open("DELETE", url, true);
    xmlhttp.send();
}

function deleteTeam(e) {
    let id = (e.target.parentElement.parentElement.cells[0].innerHTML);
    // AJAX
    var url = "bowlingPlayerService/delTeam/" + id;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText;

            if (resp != 1) {
                alert("Item NOT deleted. Check console.");
                console.log(resp);
            } else {
                adminGetTeams();
            }
        }
    };
    xmlhttp.open("DELETE", url, true);
    xmlhttp.send();
}

function addTeamOrPlayer() {
//    debugger;
    // ADDING TEAM
    if (teamOrPlayer === "team") {
        //dont add if any field is empty
        if (document.querySelector("#addUpdateTeamID").value === "" || document.querySelector("#addUpdateTeamName").value === "") {
            alert("ERROR: Please fill out all fields");
        }
        //don't add if ID is not an integer
        else {
            let id = parseInt(document.querySelector("#addUpdateTeamID").value);
            if (!Number.isInteger(id)) {
                alert("ERROR: ID must be a whole number");
            } else {
                addOrUpdateTeam("add");
            }
        }
        // ADDING PLAYER
    } else if (teamOrPlayer === "player") {
        //dont add if any field is empty
        if (!isPlayerFormFilled) {
            alert("ERROR: Please fill out all fields(PLAYER)");
        }
        //don't add if ID is not an integer
        else {
            // Change to add/update player
            let id = parseInt(document.querySelector("#playerIDInput").value);
//            let id = parseInt(document.querySelector("#teamIDInput").value);
            if (!Number.isInteger(id)) {
                alert("ERROR: ID must be a whole number");
            } else {
                addOrUpdatePlayer("add");
            }
        }
    }

}

function addOrUpdatePlayer(addOrUpdate, e) {
    let playerID, teamID, firstName, lastName, hometown, province;
    let url;

    if (addOrUpdate === "add") {

        playerID = document.querySelector("#playerIDInput").value;
        teamID = document.querySelector("#teamIDInput").value;
        firstName = document.querySelector("#firstNameInput").value;
        lastName = document.querySelector("#lastNameInput").value;
        hometown = document.querySelector("#hometownInput").value;
        province = document.querySelector("#provinceInput").value;
        url = "bowlingPlayerService/players";
        let obj = {
            playerID: playerID,
            teamID: teamID,
            firstName: firstName,
            lastName: lastName,
            hometown: hometown,
            province: province
        };

        var method = (addOrUpdate === "add") ? "POST" : "PUT";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                var resp = xmlhttp.responseText;
                if (resp.search("ERROR") >= 0 || resp != 1) {
                    alert("Team NOT added");
                    console.log(resp);
                } else {
                    alert('Team added');
                    adminGetTeams();
                }
            }
        };
        xmlhttp.open(method, url, true);
        xmlhttp.send(JSON.stringify(obj));

    } else if (addOrUpdate === "update") {

        playerID = (e.target.parentElement.parentElement.cells[0].innerHTML);
        teamID = (e.target.parentElement.parentElement.cells[1].innerHTML);
        firstName = (e.target.parentElement.parentElement.cells[2].innerHTML);
        lastName = (e.target.parentElement.parentElement.cells[3].innerHTML);
        hometown = (e.target.parentElement.parentElement.cells[4].innerHTML);
        province = (e.target.parentElement.parentElement.cells[5].innerHTML);

        document.querySelector("#playerIDInput").value = playerID;
        document.querySelector("#teamIDInput").value = teamID;
        document.querySelector("#firstNameInput").value = firstName;
        document.querySelector("#lastNameInput").value = lastName;
        document.querySelector("#hometownInput").value = hometown;
        document.querySelector("#provinceInput").value = province;


        url = "bowlingPlayerService/players/" + playerID;

    }

//    let obj = {
//        playerID: playerID,
//        teamID: teamID,
//        firstName: firstName,
//        lastName: lastName,
//        hometown: hometown,
//        province: province
//    };
//
//    var method = (addOrUpdate === "add") ? "POST" : "PUT";
//    console.log("JS: " + url);
//    console.log("JS: " + method);
//    var xmlhttp = new XMLHttpRequest();
//    xmlhttp.onreadystatechange = function () {
//        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
//            var resp = xmlhttp.responseText;
//            if (resp.search("ERROR") >= 0 || resp != 1) {
//                alert("Team NOT added");
//                console.log(resp);
//            } else {
//                alert('Team added');
//                resetButtons();
//                adminGetTeams();
//            }
//        }
//    };
//    xmlhttp.open(method, url, true);
//    xmlhttp.send(JSON.stringify(obj));
}

function addOrUpdateTeam(addOrUpdate) {
    let teamID;
    let teamName;
    let earnings;


    if (addOrUpdate === "add") {
        teamID = document.querySelector("#addUpdateTeamID").value;
        teamName = document.querySelector("#addUpdateTeamName").value;
        earnings = null;
    } else {
        teamID = document.querySelector("#addUpdateTeamID").value;
        teamName = document.querySelector("#addUpdateTeamName").value;
        earnings = null;
    }

    let obj = {
        teamID: teamID,
        teamName: teamName,
        earnings: earnings
    };

    var url = "bowlingTeamService/team/" + obj.teamID;
    var method = (addOrUpdate === "add") ? "POST" : "PUT";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var resp = xmlhttp.responseText;
            if (resp.search("ERROR") >= 0 || resp != 1) {
                alert("Team NOT added");
                console.log(resp);
            } else {
                alert('Team added');
                adminGetTeams();
            }
        }
    };
    xmlhttp.open(method, url, true);
    xmlhttp.send(JSON.stringify(obj));
}

function isPlayerFormFilled() {
    let bool = true;

    if (document.querySelector("#teamIDInput").value === "" || document.querySelector("#firstNameInput").value === "" || document.querySelector("#lastNameInput").value === "" || document.querySelector("#hometownInput").value === "" || document.querySelector("#provinceInput").value === "") {
        bool = false;
    }

    return bool;
}

function showAddUpdateTeamPanel() {
    document.querySelector(".panelTitle").innerHTML = "Add a Team";

    document.querySelector("#AddUpdateTeamPanel").classList.remove("hidden");
    document.querySelector("#btnAddTeam").classList.add("hidden");
    document.querySelector("#addUpdateTeamID").value = "";
    document.querySelector("#addUpdateTeamName").value = "";
    teamOrPlayer = "team";

    let doneBtn = document.querySelector(".TeamDoneButton");
    doneBtn.addEventListener("click", addTeamOrPlayer);
    doneBtn.removeEventListener("click", updateTeam);

    let cancelBtn = document.querySelector(".TeamCancelButton");
    cancelBtn.addEventListener("click", cancel);
}

function cancel() {
    document.querySelector("#AddUpdateTeamPanel").classList.add("hidden")
    document.querySelector("#AddUpdatePlayerPanel").classList.add("hidden")
}

function showAddUpdatePlayerPanel() {
    document.querySelector("#AddUpdatePlayerPanel").classList.remove("hidden");
    document.querySelector("#btnAddPlayer").classList.add("hidden");

    let cancelBtn = document.querySelector(".PlayerCancelButton");
    cancelBtn.addEventListener("click", cancel);

    teamOrPlayer = "player";
}

function generateRandomMatchups() {
    user = "matchups";
    getTeams();

    let returnArr = [];

//    let matchup;
    //shuffle team array
//    let shuffledArr = shuffleMe(teamArray);

    // Get all matchups - ajax call to getallmatchups

//    let teamsArr = getAllTeams();
    let url = "BowlingMatchService/matches";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let respon = xmlhttp.responseText;
            if (respon.search("ERROR") >= 0) {
                alert("oh no...Check console");
            } else {
                returnArr = respon;
                insertMatchupData(returnArr);
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();



//
//    //loop through the shuffled array 2 at a time
//    for (let i = 0; i < shuffledArr.length; i += 2) {
//        matchup = [shuffledArr[i], shuffledArr[i + 1]];
//        returnArr.push(matchup);
//    }
////    public function __construct($matchID, $roundID, $matchGroup, $teamID, $score, $ranking) {
////debugger;
//    let matchID = 91;
//    let roundID = "RAND";
//    let roundCounter = 1;
//    let matchGroup = 1;
//
//
//
//    for (let i = 0; i < returnArr.length; i++) {
//        if (i !== 0 && i % 4 === 0) {
//            roundCounter++;
//        }
//
//        if (i !== 0 && i % 2 === 0) {
//            matchGroup++;
//        }
//        let temp = returnArr[i];
////        let temp2 = returnArr[1];
//        for (let i = 0; i < temp.length; i++) {
//            let team = temp[i];
//
//            let obj = {
//                matchID: matchID,
//                roundID: roundID + roundCounter,
//                matchGroup: matchGroup,
//                teamID: team.teamID,
//                score: 0,
//                ranking: 0
//            };
//
//            var url = "bowlingMatchService/matches/" + obj.matchID;
//            var method = "PUT";
//            var xmlhttp = new XMLHttpRequest();
//            xmlhttp.onreadystatechange = function () {
//                matchID++;
//
//                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
//                    var resp = xmlhttp.responseText;
//
//                    if (resp.search("ERROR") >= 0 || resp != 1) {
//                        console.log("Match NOT added");
//                        console.log(resp);
//                    } else {
//                        console.log('Match added');
////                    resetButtons();
////                    adminGetTeams();
//                    }
//                }
//            };
//            xmlhttp.open(method, url, true);
//            xmlhttp.send(JSON.stringify(obj));
//        }

//        matchID++;
//    }

    //UPDATE THE DATABASE HERE
    // matchID - int (91-120)
    // roundID - string5 (RAND1-4)
    // matchGroup - int (1-8)
    // teamID -int
    // score - int
    // ranking - int
    // insert into matchup, matchidOne, roundid, matchgroupOne, teamOneid
    // insert into matchup, matchidTwo, roundid, matchgroupOne, teamTwoid

//
//    //
//    insertMatchups(currTeam.teamID, "RAND1", 91, 1);
//    insertMatchups(currTeam.teamName, "RAND1", 92, 1);
//    
//    
//    
//    
//    
//    
//    for(i = 0; i<returnArr.length; i++){
//        currTeam = returnArr[i];
//        insertMatchups(currTeam.teamName, "RAND1", 91, 1);
//    }
//    
//    

    //return the array
//    buildMatchupTable(returnArr); // Displays matchups

// Reset the user
    user = "";
}

function insertMatchupData(array) {

    // 91 - 106
    let arr = JSON.parse(array);
    for (let i = 90, length = 106; i < length; i++) {
        let temp = arr[i];
        console.log(temp);
    }
}

function viewMatchups() {
//    debugger;
    user = "matchups";
    getTeams();
    let returnArr = [];
    let matchup;

    if (teamArray != undefined) {
        //shuffle team array
        let shuffledArr = shuffleMe(teamArray);

        //loop through the shuffled array 2 at a time
        for (var i = 0; i < shuffledArr.length; i += 2) {
            matchup = [shuffledArr[i], shuffledArr[i + 1]];
            returnArr.push(matchup);
        }

        //return the array
        buildMatchupTable(returnArr); // Displays matchups
    }

    // Reset the user
    user = "";
}


function buildMatchupTable(array) {
    //array = [  [teamone, teamtwo], [teamone, teamtwo], [teamone, teamtwo]  ]

//    document.querySelector("#tableDiv").classList.add("hidden");

    let matchupsDiv = document.querySelector("#matchups");
//    resetButtons();

    let res = "";
    for (let i = 0; i < array.length; i++) {

        let matchupArr = array[i];
        let teamOne = matchupArr[0];
        let teamTwo = matchupArr[1];

        let html = "<div class=matchupBox><h2 class=center>";
        html += "Random Matchup " + (i + 1) + "</h2>";
        html += "<hr>";
        html += "<p class=center><strong>" + teamOne.teamName + "</strong><br> vs <br><strong>" + teamTwo.teamName + "</strong></p>";
        html += "<button class=btnScoreMatch>Score Matchup</button>";
        html += "</div>";

        res += html;
    }

    matchupsDiv.innerHTML = res;


    // Eventlisteners for Score Match buttons
    let scoreBtns = document.querySelectorAll(".btnScoreMatch");
    for (var i = 0; i < scoreBtns.length; i++) {
        let tempScore = scoreBtns[i];
        tempScore.addEventListener("click", scoreMatch);
    }

    document.querySelector("#teamTable").classList.add("hidden");
    document.querySelector("#playerTable").classList.add("hidden");
}

function scoreMatch(e) {
    console.log(e);
}

function generateQualRounds() {
    //call my randomize qualifiers function
    //scoreQualRandomly
    let scoresObjectsArr = scoreQualRandomly();
//    let newArr = [];

    scoresObjectsArr.sort((a, b) => (a.score > b.score) ? -1 : 1);

    for (let i = 0; i < scoresObjectsArr.length; i++) {
        let temp = scoresObjectsArr[i];
        temp.ranking = i + 1;



        //////////////////////ajax sending temp
        var url = "bowlingMatchService/matches/" + temp.matchID;
        var method = "PUT";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {

            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                var resp = xmlhttp.responseText;

                if (resp.search("ERROR") >= 0 || resp != 1) {
                    console.log("Match NOT added");
                    console.log(resp);
                } else {
//                    resetButtons();
//                    adminGetTeams();
                    console.log(resp);
                }
            }
        };
        xmlhttp.open(method, url, true);
        xmlhttp.send(JSON.stringify(temp));
    }
}

function guestViewStandings() {
    let url = "BowlingMatchService/matches";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText;
            if (resp.search("ERROR") >= 0) {
                alert("oh no...Check console");
            } else {
                matchupsArr = resp;
                displayMatchupsAndTeams();
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getAllTeams() {
    let url = "BowlingTeamService/team";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText;
            if (resp.search("ERROR") >= 0) {
                alert("oh no...Check console");
            } else {
                globalTeams = resp;
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function displayMatchupsAndTeams() {
    resetPage();

    document.querySelector("#matchups").classList.remove("hidden");

    let matchups = JSON.parse(matchupsArr);
    let teams = JSON.parse(globalTeams);

    matchups = matchups.sort((a, b) => (a.score > b.score) ? -1 : 1);
    matchups.length = 16;

    // The table
    let theTable = document.querySelector("#matchups");
    let html = theTable.querySelector("tr").innerHTML;

    html += "<div>";

    for (let i = 0; i < matchups.length; i++) {
        let row = matchups[i];

        html += "<tr>";
        html += "<td>" + (i + 1) + "</td>";
        html += "<td>" + row.matchID + "</td>";
        html += "<td>" + row.roundID + "</td>";
        html += "<td>" + row.matchgroup + "</td>";
//        html += "<td>" + row.teamID + "</td>";
        for (var t = 0; t < teams.length; t++) {
            if (row.teamID === teams[t].teamID) {
                html += "<td>" + teams[t].teamName + "</td>";
            }
        }
        html += "<td>" + row.score + "</td>";
        html += "</tr>";
    }

    html += "</div>";
    theTable.innerHTML = html;
    // End of table

//    let output = [];
//
//    for (var i = 0; i < matchups.length; i++) {
//        let matchup = matchups[i];
//        let matchupTeam = matchup.teamID;
//
//        for (var j = 0; j < teams.length; j++) {
//            let team = teams[j];
//            let teamID = team.teamID;
//
//            if (matchupTeam === teamID) {
//                let ranking = matchup.ranking;
//                let teamName = team.teamName;
//
//                let rankingObject = {
//                    ranking: ranking,
//                    teamName: teamName,
//                    teamID: teamID
//                };
//
//                output.push(rankingObject);
//            }
//        }
//    }
//
//    buildStandingsTable(output);
}


function buildStandingsTable(array) {
    resetPage();

    array.sort((a, b) => (a.ranking > b.ranking) ? 1 : -1);
    array = array.slice(0, 16);
    globalTeams = array;

    // Showing standings table
    document.querySelector("#standingsTable").classList.remove("hidden");

    // The table
    let theTable = document.querySelector("#standingsTable");
    let html = theTable.querySelector("tr").innerHTML;

    html += "<div>";

    for (let i = 0, length = array.length; i < length; i++) {
        let row = array[i];

        html += "<tr>";
        html += "<td class=right>" + row.ranking + "</td>";
        html += "<td>" + row.teamID + "</td>";
        html += "<td>" + row.teamName + "</td>";
        html += "<td><button class=viewGames>View Games</button></td>";
        html += "</tr>";
    }
    html += "</div>";
    theTable.innerHTML = html;
    // End of the table

    // Adding event listener for View Games buttons
    let viewGamesBtns = document.querySelectorAll(".viewGames");
    for (let i = 0; i < viewGamesBtns.length; i++) {
        let tempViewGames = viewGamesBtns[i];
        tempViewGames.addEventListener("click", viewGames);
    }
}

function viewGames(e) {
    let id = +(e.target.parentElement.parentElement.cells[1].innerHTML);

    let parseMatchups = JSON.parse(matchupsArr);
    for (let i = 0, max = parseMatchups.length; i < max; i++) {
        let temp = parseMatchups[i];
        if (temp.teamID === id) {
            console.log(temp);
        }
    }
}

function generateQualGames() {
    let gamesArr;
    // call ajax
    let url = "BowlingGameService/games";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText;
            if (resp.search("ERROR") >= 0) {
                alert("oh no...Check console");
            } else {
                gamesArr = JSON.parse(resp);
                gamesArr.length = 480;

                buildQualGames(gamesArr);
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    // catch array from ajax
    // call function to build table showing all 480 available games - display team name and players
}

function buildQualGames(games) {
    let result = [];
    let t = 0, p = 0;
    let teams = JSON.parse(globalTeams);
    let players = JSON.parse(globalPlayers);
//    console.log(games);
//    console.log(teams);
//    console.log(players);

    for (let g = 0, max = games.length; g < max; g++) {
        if (g !== 0 && g % 8 === 0) {

            t++;
        }
        if (g !== 0 && g % 2 === 0) {

            p++;
        }
        let team = teams[t], game = games[g], player = players[p];

//        console.log(player);
//        console.log(match);
//        console.log(team);

        let obj = {
            gameID: game.gameID,
            teamName: team.teamName,
            playerName: player.firstName + " " + player.lastName,
            playerID: player.playerID,
            status: game.gameStatusID
        };

        result.push(obj);
    }

    displayAvailableGames(result);



}

function displayAvailableGames(arr) {
    resetPage();

    document.querySelector("#availGamesTable").classList.remove("hidden");

    // The table
    let theTable = document.querySelector("#availGamesTable");
    let html = theTable.querySelector("tr").innerHTML;

    html += "<div>";
    for (let i = 0; i < arr.length; i++) {
        let row = arr[i];
        html += "<tr>";
        html += "<td>" + row.gameID + "</td>";
        html += "<td>" + row.playerID + "</td>";
        html += "<td>" + row.teamName + "</td>";
        html += "<td>" + row.playerName + "</td>";
        html += "<td>" + row.status + "</td>";
        html += "<td><button class=scoreGame>Score Game</button></td>";
        html += "</tr>";
    }
    html += "</div>";
    theTable.innerHTML = html;
    // End of the table

    // get gameID when button clicked

    // Eventlisteners for cancel/done buttons
    let scoreBtns = document.querySelectorAll(".scoreGame");
    for (var i = 0; i < scoreBtns.length; i++) {
        scoreBtns[i].addEventListener("click", displayScorer);
    }

}

function displayScorer(e) {
//    resetPage();
    document.querySelector("#score").classList.remove("hidden");
    let id = (e.target.parentElement.parentElement.cells[0].innerHTML);
    let content = document.querySelector("#score");
    let html = "";
    html += "GameID: " + id;
    html += "<br><input id=scoreInput><br><button class=scoreSubmit>Submit</button>";
    content.innerHTML = html;

    // Eventlisteners for submit button
    let submitScoreBtn = document.querySelector(".scoreSubmit");
    submitScoreBtn.addEventListener("click", function () {
        scoreGame(id);
    });
}

function scoreGame(gameID, inScore) {

    let score = inScore;
    if (score === undefined) {
        score = document.querySelector("#scoreInput").value;
    }

    // ajax put
//    for (let i = 1; i <= 480; i++) {
//        let score = Math.floor(Math.random() * 300);

    url = "BowlingGameService/games/" + gameID;
    let obj = {
        gameID: gameID,
        matchID: 0,
        gameNumber: 0,
        gameStatusID: "",
        score: score,
        balls: ""
    };

    var method = "PUT";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var resp = xmlhttp.responseText;
            if (resp.search("ERROR") >= 0 || resp != 1) {
//                    alert("Game NOT updated");
                console.log(resp);
            } else {
//                    alert('Game updated');
                console.log(resp);
            }
        }
    };
    xmlhttp.open(method, url, true);
    xmlhttp.send(JSON.stringify(obj));
//    }

}

function autoGenerateQualRounds() {
    for (let i = 1; i <= 480; i++) {
        let score = Math.floor(Math.random() * 300);
        scoreGame(i, score);
    }
}

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
var shuffleMe = function (array) {

    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

};

// STEVES SCORE GENERATOR ***********************************************************************************************************************

function scoreQualRandomly() {
    let matchupArray = [];
    for (let i = 0; i <= 60; i++) {

        let currScore = generateRandomScore();
        //matchID = i
        //roundID = "QUAL"
        //matchGroup =1
        //teamID = i
        //score = parseFrames(generateRandomScore())
        let qualObj = {
            matchID: i,
            roundID: "QUAL", // "QUAL"
            matchGroup: 1,
            teamID: i,
            score: parseFrames(currScore).reduce((a, b) => a + b, 0),
            ranking: 0
        };

        matchupArray.push(qualObj);


    }

    return matchupArray;

}

function generateRandomScore() {
    //generate 3 random numbers
    let frames = 10;
    let randStrikes = 0;
    let randSpares = 0;
    let randOpenFrames = 0;
    randStrikes = getRandomInt(0, frames);
    frames -= randStrikes;
    if (frames > 0) {
        randSpares = getRandomInt(0, frames);
        frames -= randSpares;
    }

    randOpenFrames = frames;
//    console.log(frames);
//    console.log(randStrikes);
//    console.log(randSpares);
//    console.log(randOpenFrames);

    let scoreArr = generateFrames(randStrikes, randSpares, randOpenFrames);

    return scoreArr;

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateFrames(strikes, spares, openFrames) {

    if (strikes < 0 || spares < 0 || openFrames < 0 || (strikes + spares + openFrames) !== 10) {
        return ["0 0", "0 0", "0 0", "0 0", "0 0", "0 0", "0 0", "0 0", "0 0", "0 0"];
    }
    let frames = [];
    let ball1, ball2, bonus;
    let i;

    // generate the requested number of frames of each type
    for (i = 0; i < strikes; i++) {
        frames.push(STRIKE_CHAR);
    }
    for (i = 0; i < spares; i++) {
        ball1 = generateRandomBetween(0, 9);
        frames.push(ball1 + BALL_SEPARATOR_CHAR + SPARE_CHAR);
    }
    for (i = 0; i < openFrames; i++) {
        ball1 = generateRandomBetween(0, 9);
        ball2 = generateRandomBetween(0, 9 - ball1);
        frames.push(ball1 + BALL_SEPARATOR_CHAR + ball2);
    }

    // shuffle the frames
    shuffle(frames);

    // generate one bonus ball if the tenth frame is a spare
    if (frames[9].indexOf(SPARE_CHAR) !== -1) {
        bonus = generateRandomBall();
        frames.push(bonus);
    }

    // generate two bonus balls if the tenth frame is a strike
    if (frames[9] === STRIKE_CHAR) {
        ball1 = generateRandomBall();
        if (ball1 === STRIKE_CHAR) {
            bonus = ball1 + BALL_SEPARATOR_CHAR + generateRandomBall();
        } else {
            ball2 = generateRandomBetween(0, 10 - ball1); // might be a spare
            if (ball1 + ball2 === 10) {
                ball2 = SPARE_CHAR;
            }
            bonus = ball1 + BALL_SEPARATOR_CHAR + ball2;
        }
        frames.push(bonus);
    }

//    console.log(frames);
    return frames;
}

// generate a strike half the time 
function generateRandomBall() {
    let res = "";
    if (Math.random() < 0.5) {
        res = STRIKE_CHAR;
    } else {
        res = generateRandomBetween(0, 9);
    }
    return res;
}

function generateRandomBetween(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

// The Fisher-Yates Shuffle 
function shuffle(frames) {
    for (let i = frames.length - 1; i > 0; i -= 1) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = frames[i];
        frames[i] = frames[j];
        frames[j] = temp;
    }
}

function getBalls(frames) {
    let res = frames[0];

    for (let i = 1; i < frames.length; i++) {
        res += BALL_SEPARATOR_CHAR + frames[i];
    }

    return res;
}

function formatFramesAsTable(frames) {
    let i;
    let res = "<table>";
    res += "<tr>";
    for (let i = 0; i < frames.length; i++) {
        if (i < 10) {
            res += "<th>" + (i + 1) + "</th>";
        } else {
            res += "<th>Bonus</th>";
        }
    }
    res += "</tr>";

    res += "<tr>";
    for (i = 0; i < frames.length; i++) {
        res += "<td>" + frames[i] + "</td>";
    }
    res += "</tr>";

    res += "</table>";

    return res;
}

function scoreChecker(firstThrow, secondThrow) {

    //checking if the value of the current frame is 10
    if (firstThrow === "X" && secondThrow === "X") {
        return 20;
    }
    if (firstThrow === "X" && secondThrow !== undefined) {
        return 10 + parseInt(secondThrow);
    }
    if (firstThrow === "X" || secondThrow === "/") {
        return 10;
    }
    //if second throw doesn't exist
    if (secondThrow === undefined) {
        return parseInt(firstThrow)
    }
    return parseInt(firstThrow) + parseInt(secondThrow);
}

function lookAheadTwoBalls(framesArr, index) {

    let nextBall = framesArr[index + 1].split(" ")[0];
    let finalBall = framesArr[index + 1].split(" ")[1];
    if (nextBall === "X" && index < 9) { // ** Might need to be index < 8 or 9 ** So the index doesn't go beynd the array length
        finalBall = framesArr[index + 2].split(" ")[0];
    }
    if (finalBall === "/") {
        return 10;
    }
    return scoreChecker(nextBall, finalBall);
}

function lookAheadOneBall(framesArr, index) {
    //    debugger;
    let temp = framesArr[index + 1];
    if (temp !== undefined && typeof temp === "string") {
        let nextBall = temp.split(" ")[0];
        return scoreChecker(nextBall);
    } else {
        return scoreChecker(temp, 0);
    }
}

function parseFrames(frames) {
//    debugger;
    let scoreArr = [];
    //loop
    for (let i = 0; i < 10; i++) {
        //store frame score
        let frameScore = 0;
        //get current ball
        const currentFrame = frames[i];
        /* 
         if(currentFrame!== "X"){ */
        const firstThrowFirstFrame = currentFrame.split(" ")[0];
        const secondThrowFirstFrame = currentFrame.split(" ")[1];
        /*  } else{
         const firstThrowFirstFrame = "X";
         } */

        if (firstThrowFirstFrame === "X" && i < 10) {
            //get score for the next two frames
            frameScore += 10 + lookAheadTwoBalls(frames, i);
        } else if (secondThrowFirstFrame === "/") {
            frameScore += 10 + lookAheadOneBall(frames, i);
        } else {
            frameScore += scoreChecker(firstThrowFirstFrame, secondThrowFirstFrame);
        }
        scoreArr[i] = frameScore;
    }
//    console.log(scoreArr);
    return scoreArr.slice(0, 10);
}

function sumFrame(frames) {
    let total = 0;

    for (let i = 0; i < frames.length; i++) {
        let temp = frames[i];
        total += temp;
    }
//    console.log(total);
    return total;
}

function cumulativeSum(frames) {
//    debugger;
    //    let total = 0;
    let arr = [];
    arr[0] = frames[0];

    for (let i = 1, length = frames.length; i <= length - 1; i++) {
        let frame = frames[i],
                nextFrame = frames[i + 1];
        arr[i] = arr[i - 1] + nextFrame;
    }

//    console.log(arr);
}