<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <script src="bowlingScript.js"></script>
        <style>
            .hide{
                display: none;
            }
        </style>
    </head>
    <body>
        <button id="playerButton">Player</button>
        <div id="playerPanel">
        <span>player id</span><input type="text" id="addPlayerID"><br>
        <span>team id</span><input type="text" id="addPlayerTeamID"><br>
        <span>first name</span><input type="text" id="addPlayerFirstName"><br>
        <span>last name</span><input type="text" id="addPlayerLastName"><br>
        <span>hometown</span><input type="text" id="addPlayerHometown"><br>
        <span>province</span><input type="text" id="addPlayerProvince"><br>
        <button id="addPlayer">Add Player</button><br>
        <span>player id</span><input type="text" id="updatePlayerID"><br>
        <span>team id</span><input type="text" id="updatePlayerTeamID"><br>
        <span>first name</span><input type="text" id="updatePlayerFirstName"><br>
        <span>last name</span><input type="text" id="updatePlayerLastName"><br>
        <span>hometown</span><input type="text" id="updatePlayerHometown"><br>
        <span>province</span><input type="text" id="updatePlayerProvince"><br>
        <button id="updatePlayer">Update Player</button><br>
        <span>player id</span><input type="text" id="deletePlayerID"><br>
        <button id="deletePlayer">Delete Player</button>
        </div>
        <button id ="teamButton">Team</button>
        <div id ="teamPanel">
        <span>team id</span><input type="text" id="addTeamID"><br>
        <span>team name</span><input type="text" id="addTeamName"><br>
        <button id="addTeam">Add Team</button><br>
        <span>team id</span><input type="text" id="updateTeamID"><br>
        <span>team name</span><input type="text" id="updateTeamName"><br>
        <span>earnings</span><input type="text" id="updateEarnings"><br>
        <button id="updateTeam">Update Team</button><br>
        <span>team id</span><input type="text" id="deleteTeamID"><br>
        <button id="deleteTeam">Delete Team</button>
        </div>
    </body>
</html>