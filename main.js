window.onload = function () {

    // add event handlers for buttons
    document.querySelector("#getTeams").addEventListener("click", getAllTeams);

//    hideUpdatePanel();
};

// make AJAX call to PHP to get JSON data
function getAllTeams() {
    let url = "BowlingTournament/teams";
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            let resp = xmlhttp.responseText;
            if (resp.search("ERROR") >= 0) {
                alert("oh no...Check console");
            } else {
                
                buildTable(xmlhttp.responseText);
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

//    document.querySelector("#GetButton").classList.add("hidden");
}

// text is a JSON string containing an array
function buildTable(text) {
    let arr = JSON.parse(text);
    let theTable = document.querySelector("table");
    let html = theTable.querySelector("tr").innerHTML;

//    document.querySelector("#AddButton").classList.remove("hidden");
    document.querySelector("#teamTable").classList.remove("hidden");

    for (let i = 0; i < arr.length; i++) {
        let row = arr[i];
        html += "<tr>";
        html += "<td>" + row.teamID + "</td>";
        html += "<td>" + row.teamName + "</td>";
        html += "<td>" + row.earnings + "</td>";
        html += "</tr>";
    }

    theTable.innerHTML = html;
}