const express = require('express');
const cors = require('cors');

const app = express();

const PORT = 5001;

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "laligasantander"
});
 
connection.connect();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    connection.query('SELECT * FROM rankings', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
})

app.get("/top_scorers", (req, res) => {
    connection.query('SELECT * FROM top_scorers', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
})

app.get("/latest_matches", (req, res) => {
    connection.query("SELECT * FROM matches", function (error, results, fields) {
        if (error) throw err;
        res.send(results);
    })
})

app.get("/teams", (req, res) => {
    connection.query("SELECT * FROM teams", function (error, results, fields) {
        if (error) throw err;
        res.send(results);
    })
})

app.get("/teams/:id", (req, res) => {
    connection.query(`SELECT a.*, b.* FROM teams AS a LEFT JOIN rankings as b ON a.name = b.team_name WHERE id = ${req.params.id}`, function (error, results, fields) {
        if (error) throw error;
        var team = results[0];
        connection.query(`SELECT * FROM goalkeepers WHERE club_name = '${team.name}'`, function (error, goalkeepers, fields) {
            if (error) throw error;
            team.players = goalkeepers;
            connection.query(`SELECT * FROM players WHERE club_name = '${team.name}'`, function (error, players, fields) {
                if (error) throw error;
                team.players = team.players.concat(players);
                team.trophies = require("./trophies.json")[team.name].trophies;
                var d = require("./trophies.json");
                console.log(team.trophies);
                connection.query(`SELECT * FROM top_scorers WHERE club_name = '${team.name}'`, function (error, results, fields) {
                    if (error) throw error;
                    team.top_scorers = results;
                    connection.query(`SELECT * FROM matches WHERE home_team = '${team.name}' OR away_team = '${team.name}'`, function (error, results, fields) {
                        if (error) throw error;
                        team.matches = results;
                        res.send(team);
                    })
                })
            })
        })
    })
})

app.get("/players", (req, res) => {
    connection.query("SELECT * FROM players", function (error, players, fields) {
        if (error) throw err;
        connection.query("SELECT * FROM goalkeepers", function (error, goalkeepers, fields) {
            if (error) throw err;
            results = players.concat(goalkeepers);
            results.sort((a, b) => {
                return b.overall - a.overall;
            })
            res.send(results);
        })
    })
})

app.get("/players/:id", (req, res) => {
    connection.query(`SELECT * FROM players WHERE id = ${req.params.id}`, function (error, results, fields) {
        if (error) throw err;
        res.send(results[0]);
    })
})

app.get("/top_assists", (req, res) => {
    connection.query("SELECT * FROM top_assists", function (error, results, fields) {
        if (error) throw err;
        res.send(results);
    })
})

app.get("/additional_stats", (req, res) => {
    var d = {};
    connection.query("SELECT a.*, b.venue_capacity FROM matches AS a LEFT JOIN teams AS b ON a.home_team = b.name ORDER BY b.venue_capacity DESC LIMIT 19", function (error, results, fields) {
        if (error) throw err;
        results.sort((a, b) => a.away_team_ranking - b.away_team_ranking);
        d.highest_attendance = results[0];
    })
    connection.query("SELECT * FROM matches ORDER BY (home_team_goals + away_team_goals) DESC", function (error, results, fields) {
        if (error) throw error;
        d.most_goals = results[0];
        d.least_goals = results[results.length - 1];
        var arr = [];
        for (const result of results) {
            if (result.home_team_goals > result.away_team_goals && result.home_team_ranking > result.away_team_ranking) { result.diff = result.home_team_ranking - result.away_team_ranking; arr.push(result); }
            if (result.home_team_goals < result.away_team_goals && result.home_team_ranking < result.away_team_ranking) { result.diff = result.away_team_ranking - result.home_team_ranking; arr.push(result); }
        }
        arr.sort((a, b) => b.diff - a.diff);
        d.biggest_surprise = arr[0];
        res.send(d);
    })
})

app.get("/teams/:id/matches/", (req, res) => {
    var name;
    connection.query(`SELECT name FROM teams WHERE id = ${req.params.id}`, function (error, results, fields) {
        if (error) throw error;
        name = results[0].name;
        connection.query(`SELECT * FROM matches WHERE home_team = '${name}' OR away_team = '${name}'`, function (error, results, fields) {
            if (error) throw error;
            res.send(results);
        })
    })
})

app.get("/teams/:id/statistics/", (req, res) => {
    var d = {};
    connection.query(`SELECT name FROM teams WHERE id = ${req.params.id}`, function (error, results, fields) {
        if (error) throw error;
        d.name = results[0].name;
        connection.query(`SELECT * FROM top_scorers WHERE club_name = '${d.name}'`, function (error, results, fields) {
            if (error) throw error;
            d.top_scorers = results;
            res.send(d);
        })
    })
})

app.listen(PORT, () => {

    console.log("Server is running on port " + PORT);

})