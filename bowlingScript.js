/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.onload = function () {
    document.querySelector("#playerPanel").classList.add("hide");
    document.querySelector("#teamPanel").classList.add("hide");
    document.querySelector("#playerButton").addEventListener("click", function () {
        showPlayerPanel();
    }, false);
    document.querySelector("#teamButton").addEventListener("click", function () {
        showTeamPanel();
    }, false);
    document.querySelector("#addTeam").addEventListener("click", function () {
        addTeam();
    }, false);
    document.querySelector("#updateTeam").addEventListener("click", function () {
        updateTeam();
    }, false);
    document.querySelector("#deleteTeam").addEventListener("click", function () {
        deleteTeam();
    }, false);
    document.querySelector("#addPlayer").addEventListener("click", function () {
        addPlayer();
    }, false);
    document.querySelector("#updatePlayer").addEventListener("click", function () {
        updatePlayer();
    }, false);
    document.querySelector("#deletePlayer").addEventListener("click", function () {
        deletePlayer();
    }, false);
};

function showPlayerPanel() {
    let panel = document.querySelector("#playerPanel");
    if (panel.classList.contains("hide")) {
        panel.classList.remove("hide");
    } else {
        panel.classList.add("hide");
    }

}

function showTeamPanel() {
    let panel = document.querySelector("#teamPanel");
    if (panel.classList.contains("hide")) {
        panel.classList.remove("hide");
    } else {
        panel.classList.add("hide");
    }

}

function addTeam() {
    //dont add if any field is empty
    if (document.querySelector("#addTeamID").value === "" || document.querySelector("#addTeamName").value === "") {
        alert("ERROR: Please fill out all fields");
    }
    //don't add if ID is not an integer
    else {
        let id = parseInt(document.querySelector("#addTeamID").value);
        if (!Number.isInteger(id)) {
            alert("ERRROR: ID must be a whole number");
        } else {
            addOrUpdateTeam("add");
        }
    }

}

function updateTeam() {
    //dont add if any field is empty
    if (document.querySelector("#updateEarnings").value === "" || document.querySelector("#updateTeamID").value === "" || document.querySelector("#updateTeamName").value === "") {
        alert("ERROR: Please fill out all fields");
    }
    //don't add if ID is not an integer
    else {
        let id = parseInt(document.querySelector("#updateTeamID").value);
        if (!Number.isInteger(id)) {
            alert("ERRROR: ID must be a whole number");
        } else {
            addOrUpdateTeam("update");
        }
    }
}

function addOrUpdateTeam(addOrUpdate) {
    let teamID;
    let teamName;
    let earnings;

    if (addOrUpdate === "add") {
        teamID = document.querySelector("#addTeamID").value;
        teamName = document.querySelector("#addTeamName").value;
        earnings = null;
    } else {
        teamID = document.querySelector("#updateTeamID").value;
        teamName = document.querySelector("#updateTeamName").value;
        earnings = document.querySelector("#updateEarnings").value;
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
            }
        }
    };
    xmlhttp.open(method, url, true);
    xmlhttp.send(JSON.stringify(obj));
}

function deleteTeam() {
    let teamID = document.querySelector("#deleteTeamID").value;
    let obj = {
        teamID: teamID
    };

    let url = "bowlingTeamService/team/" + obj.teamID;

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            //show error message if delete unsuccessful
            let resp = xmlhttp.responseText;
            if (resp.search("ERROR") >= 0 || resp != 1) {
                alert("ERROR: Team NOT deleted");
            } else {
                alert("Team deleted");
            }
        }
    };
    xmlhttp.open("DELETE", url, true);
    xmlhttp.send(JSON.stringify(obj));
}

function addPlayer() {
    let pid = document.querySelector("#addPlayerID").value;
    let tid = document.querySelector("#addPlayerTeamID").value;
    let fn = document.querySelector("#addPlayerFirstName").value;
    let ln = document.querySelector("#addPlayerLastName").value;
    let ht = document.querySelector("#addPlayerHometown").value;
    let prov = document.querySelector("#addPlayerProvince").value;
    //dont add if any field is empty
    if (pid === ""|| tid ==="" || fn===""||ln===""||ht===""||prov==="") {
        alert("ERROR: Please fill out all fields");
    }
    //don't add if ID is not an integer
    else {
        let p = parseInt(pid);
        let t = parseInt(tid);
        if (!Number.isInteger(p) || !Number.isInteger(t)) {
            alert("ERRROR: ID must be a whole number");
        } else {
            addOrUpdatePlayer("add");
        }
    }

}

function updatePlayer() {
    let pid = document.querySelector("#updatePlayerID").value;
    let tid = document.querySelector("#updatePlayerTeamID").value;
    let fn = document.querySelector("#updatePlayerFirstName").value;
    let ln = document.querySelector("#updatePlayerLastName").value;
    let ht = document.querySelector("#updatePlayerHometown").value;
    let prov = document.querySelector("#updatePlayerProvince").value;
    //dont add if any field is empty
    if (pid === ""|| tid ==="" || fn===""||ln===""||ht===""||prov==="") {
        alert("ERROR: Please fill out all fields");
    }
    //don't add if ID is not an integer
    else {
        let p = parseInt(pid);
        let t = parseInt(tid);
        if (!Number.isInteger(p) || !Number.isInteger(t)) {
            alert("ERRROR: ID must be a whole number");
        } else {
            addOrUpdatePlayer("update");
        }
    }
}

function addOrUpdatePlayer(addOrUpdate) {
    let playerID;
    let teamID;
    let firstName;
    let lastName;
    let hometown;
    let province;

    if (addOrUpdate === "add") {
        playerID = document.querySelector("#addPlayerID").value;
        teamID = document.querySelector("#addPlayerTeamID").value;
        firstName = document.querySelector("#addPlayerFirstName").value;
        lastName = document.querySelector("#addPlayerLastName").value;
        hometown = document.querySelector("#addPlayerHometown").value;
        province = document.querySelector("#addPlayerProvince").value;
    } else {
        playerID = document.querySelector("#updatePlayerID").value;
        teamID = document.querySelector("#updatePlayerTeamID").value;
        firstName = document.querySelector("#updatePlayerFirstName").value;
        lastName = document.querySelector("#updatePlayerLastName").value;
        hometown = document.querySelector("#updatePlayerHometown").value;
        province = document.querySelector("#updatePlayerProvince").value;
    }

    let obj = {
        playerID: playerID,
        teamID: teamID,
        firstName: firstName,
        lastName: lastName,
        hometown: hometown,
        province: province
    };

    var url = "bowlingPlayerService/player/" + obj.playerID;
    var method = (addOrUpdate === "add") ? "POST" : "PUT";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var resp = xmlhttp.responseText;
            if (resp.search("ERROR") >= 0 || resp != 1) {
                alert("Failed");
            } else {
                alert('Success');
            }
        }
    };
    xmlhttp.open(method, url, true);
    xmlhttp.send(JSON.stringify(obj));
}

function deletePlayer() {
    let playerID = document.querySelector("#deletePlayerID").value;
    let obj = {
        playerID: playerID
    };

    let url = "bowlingPlayerService/player/" + obj.playerID;

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            //show error message if delete unsuccessful
            let resp = xmlhttp.responseText;
            if (resp.search("ERROR") >= 0 || resp != 1) {
                alert("Failure");
                console.log(resp);
            } else {
                alert("Success");
            }
        }
    };
    xmlhttp.open("DELETE", url, true);
    xmlhttp.send(JSON.stringify(obj));
}
;