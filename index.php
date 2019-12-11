<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Bowling Tournament</title>
        <link rel="stylesheet" href="styles.css">
        <script src="main.js"></script>
    </head>
    <body>
        <div id="container">
            <div id="roleButtons" class="flex-container">
                <!-- Guest buttons -->
                <div id="public" class="flex-item">
                    <h1>Guest/Public</h1>
                    <button id="getTeams">View Teams</button><br>
                    <button id="getStandings">View Standings</button><br>
                </div>

                <!-- Scorekeeper buttons -->
                <div id="public" class="flex-item">
                    <h1>Scorekeeper</h1>
                    <button id="viewMatchups">View Matchups</button><br>
                </div>

                <!-- Admin buttons -->
                <div id="admin" class="flex-item">
                    <h1>Admin</h1>
                    <button id="adminGetTeams">View Teams</button><br>
                    <button id="adminGetPlayers">View Players</button><br>
                    <button id="adminGenerateMatchups">Generate RAND Matchups</button><br>
                    <button id="adminGenerateQualRounds">Generate QUAL Rounds</button><br>
                </div>
            </div>

            <!-- CRUD team panel -->
            <div id="AddUpdateTeamPanel">
                <h4 class="panelTitle"></h4>
                <div id="teamID">
                    <div class="formLabel">Team ID:</div><input id="addUpdateTeamID" type="text">
                </div>
                <div>
                    <div class="formLabel">Team Name:</div><input id="addUpdateTeamName" type="text">
                </div>

                <br><div class="divButtons">
                    <button class="TeamDoneButton">Done</button>
                    <button class="TeamCancelButton">Cancel</button>

                </div>
            </div>

            <!-- CRUD player panel -->
            <div id="AddUpdatePlayerPanel">
                <h4>Add a Player</h4>
                <div id="playerID">
                    <div class="formLabel">Player ID:</div><input id="playerIDInput" type="text">
                </div>
                <div>
                    <div class="formLabel">Team ID:</div><input id="teamIDInput" type="text">
                </div>
                <div>
                    <div class="formLabel">First Name:</div><input id="firstNameInput" type="text">
                </div>
                <div>
                    <div class="formLabel">Last Name:</div><input id="lastNameInput" type="text">
                </div>
                <div>
                    <div class="formLabel">Hometown:</div><input id="hometownInput" type="text">
                </div>
                <div>
                    <div class="formLabel">Province:</div><input id="provinceInput" type="text">
                </div>

                <br><div class="divButtons">
                    <button class="PlayerDoneButton">Done</button>
                    <button class="PlayerCancelButton">Cancel</button>

                </div>
            </div>

            <!-- Tables -->
            <button id="btnAddTeam">Add a Team</button>
            <button id="btnAddPlayer">Add a Player</button>

            <div id="tableDiv" class="flex-container">
                <div id="teamTable">
                    <!-- Admin Team table -->
                    <table id="adminTeamTable">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Earnings</th>
                            <th>View</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </table>

                    <!-- Guest Team table -->
                    <table id="guestTeamTable">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Earnings</th>
                            <th>View</th>
                        </tr>
                    </table>
                </div>

                <!-- Player table -->
                <table id="playerTable">
                    <tr>
                        <th>ID</th>
                        <th>Team ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Hometown</th>
                        <th>Province</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </table>                          

                <!-- Standings table -->
                <table id="standingsTable">
                    <tr>
                        <th>Ranking</th>
                        <th>Team ID</th>
                        <th>Team Name</th>
                        <th>View</th>
                    </tr>
                </table>                          
            </div> <!-- End of tables -->

            <!-- MatchUp Divs -->
            <div id="matchups">
                <!-- Insert matchup divs here -->
            </div>
        </div>

    </body>
</html>