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
                    <button id="getStandings" disabled>View Standings</button><br>
                </div>

                <!-- Admin buttons -->
                <div id="admin" class="flex-item">
                    <h1>Admin</h1>
                    <button id="adminGetTeams">View Teams</button><br>
                    <button id="adminGetPlayers">View Players</button><br>
                </div>
            </div>

            <!-- CRUD team panel -->
            <div id="AddUpdateTeamPanel" class="hidden">
                <h4>Add a Team</h4>
                <div id="teamID">
                    <div class="formLabel">Team ID:</div><input id="teamIDInput" type="text">
                </div>
                <div>
                    <div class="formLabel">Team Name:</div><input id="teamNameInput" type="text">
                </div>
                <br><div class="divButtons">
                    <button class="DoneButton">Done</button>
                    <button class="CancelButton">Cancel</button>
                </div>
            </div>

            <!-- CRUD player panel -->
            <div id="AddUpdatePlayerPanel" class="hidden">
                <h4>Add a Player</h4>
                <!--<div id="playerID">
                    <div class="formLabel">Player ID:</div><input id="playerIDInput" type="text">
                </div>-->
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
                    <button class="DoneButton">Done</button>
                    <button class="CancelButton">Cancel</button>
                </div>
            </div>

            <!-- Tables -->
            <button id="btnAddTeam" class="hidden">Add a Team</button>
            <button id="btnAddPlayer" class="hidden">Add a Player</button>

            <div id="tableDiv" class="flex-container">
                <!-- Team table -->
                <table id="teamTable" class="hidden">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Earnings</th>
                        <th></th>
                    </tr>
                </table>

                <!-- Player table -->
                <table id="playerTable" class="hidden">
                    <tr>
                        <th>ID</th>
                        <th>Team ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Hometown</th>
                        <th>Province</th>
                    </tr>
                </table>
            </div> <!-- End of tables -->

        </div> <!-- End of main container -->

        <!--        <div id="AddUpdatePanel">
                    <div id="weapID" class="hidden">
                        <div class="formLabel">ID:</div><input id="weaponIDInput" type="text">
                    </div>
                    <div>
                        <div class="formLabel">Name:</div><input id="weaponNameInput" type="text">
                    </div>
                    <div>
                        <div class="formLabel">Level:</div><input id="weaponLevelInput" type="number"> 
                    </div>
                    <div>
                        <div class="formLabel">Description:</div><input id="weaponDescriptionInput" type="text">
                    </div>
                    <div>
                        <div class="formLabel">Damage:</div><input id="weaponDamageInput" type="text">
                    </div>
                    <div>
                        <div class="formLabel">Location:</div><input id="weaponLocationInput" type="text">
                    </div>
                    <div>
                        <button id="DoneButton">Done</button>
                        <button id="CancelButton">Cancel</button>
                    </div>
                </div>-->



    </body>
</html>