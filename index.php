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
            <div class="flex-container">
                <div id="public" class="flex-item">
                    <h1>Guest/Public</h1>
                    <button id="getTeams">View Teams</button><br>
                    <button id="getStandings" disabled>View Standings</button><br>
                </div>
                <div id="admin" class="flex-item">
                    <h1>Admin</h1>
                    <button id="adminGetTeams">View Teams</button><br>
                    <button id="adminGetPlayers">View Players</button><br>
                </div>
            </div>
            <div id="tableDiv" class="flex-container">
                <table id="teamTable" class="hidden">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Earnings</th>
                        <th></th>
                    </tr>
                </table>
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
            </div>
        </div>

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