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
                    <button id="displayBracket">Tournament Bracket</button><br>
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
                    <!--<button id="adminGenerateMatchups">Generate RAND Matchups</button><br>-->
                    <button id="adminAdvanceQual">Generate Top 16</button><br>
                    <button id="adminSEED1" disabled>Generate SEED1</button><br>
                    <!--<button id="adminGenerateQualRounds">Generate QUAL Rounds</button><br>-->
                    <!--<button id="adminViewQualGames">View Qual Games</button><br>-->
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
<!--                        <th>ID</th>
                        <th>Team ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Hometown</th>
                        <th>Province</th>-->
<!--                        <th>Edit</th>
                        <th>Delete</th>-->
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
            <div>
                <table id="matchups">
                    <tr>
                        <th>Ranking</th>
                        <th>Match ID</th>
                        <th>Round ID</th>
                        <th>Match Group</th>
                        <th>Team Name</th>
                        <th>Score</th>
                    </tr>
                </table> 
            </div>

            <div>
                <table id="availGamesTable">
                    <tr>
                        <th>Game ID</th>
                        <th>Player ID</th>
                        <th>Team Name</th>
                        <th>Player Name</th>
                        <th>Game Status</th>
                        <th>Score</th>
                    </tr>
                </table> 
            </div>

            <div id="score">

                <div id="scoreForm">
                    <h2>Score a Game</h2>
                    <div id="scoreButtons">
                        <button id=score0 value="0">0</button>
                        <button id=score1 value="1">1</button>
                        <button id=score2 value="2">2</button>
                        <button id=score3 value="3">3</button>
                        <button id=score4 value="4">4</button>
                        <button id=score5 value="5">5</button>
                        <button id=score6 value="6">6</button>
                        <button id=score7 value="7">7</button>
                        <button id=score8 value="8">8</button>
                        <button id=score9 value="9">9</button>
                        <button id=score10 value="10">X</button>
                        <button id="submitScores">Submit</button>
                    </div>

                    <table id="matchTable">
                        <tr>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>9</th>
                            <th>10</th>
                        </tr>

                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>


                    </table>
                </div>

            </div>

            <div id="tournamentBracket">
                <div class='flex-container' id='first'>
                    <ul class='firstRound'>
                        <li></li>
                        <li></li>
                    </ul>
                    <ul class='firstRound'>
                        <li></li>
                        <li></li>
                    </ul>
                    <ul class='firstRound'>
                        <li></li>
                        <li></li>
                    </ul>
                    <ul class='firstRound'>
                        <li></li>
                        <li></li>
                    </ul>
                    <ul class='firstRound'>
                        <li></li>
                        <li></li>
                    </ul>
                    <ul class='firstRound'>
                        <li></li>
                        <li></li>
                    </ul>
                    <ul class='firstRound'>
                        <li></li>
                        <li></li>
                    </ul>
                    <ul class='firstRound'>
                        <li></li>
                        <li></li>
                    </ul>
                </div>

                <div class='flex-container' id='second'>
                    <ul class='secondRound'>
                        <li></li>
                        <li></li>
                    </ul>
                    <ul class='secondRound'>
                        <li></li>
                        <li></li>
                    </ul>
                    <ul class='secondRound'>
                        <li></li>
                        <li></li>
                    </ul>
                    <ul class='secondRound'>
                        <li></li>
                        <li></li>
                    </ul>
                </div>

                <div class='flex-container' id="third">
                    <ul class='thirdRound'>
                        <li></li>
                        <li></li>
                    </ul>
                    <ul class='thirdRound'>
                        <li></li>
                        <li></li>
                    </ul>
                </div>

                <div class='flex-container' id="fourth">
                    <ul class='fourthRound'>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div class='flex-container' id="fifth">
                    <ul class='fifthRound'>
                        <li></li>
                    </ul>
                </div>
            </div>

        </div>

    </body>
</html>