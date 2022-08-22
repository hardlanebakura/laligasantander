from tkinter.tix import COLUMN
from flask import Flask, render_template, request, redirect, url_for, jsonify, session
from flask_cors import CORS, cross_origin
from Database import *
from FootballDataAPI import *
from subsidiary_functions import *
from operator import itemgetter

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
#UTF-8 support
app.config['JSON_AS_ASCII'] = False

@app.route("/")
@cross_origin()
def index():
    return { "rankings": sorted([dict(zip(db.show("rankings"), item)) for item in db.select_all("rankings")], key = lambda x: x["points"], reverse = True) }

@app.route("/matches")
@cross_origin()
def matches():
    return "1"

@app.route("/latest_matches")
@cross_origin()
def latest_matches():
    return { "latest_matches": FootballData.get_latest_matches()}

@app.route("/top_scorers")
@cross_origin()
def top_scorers():
    db.cursor.execute("SELECT * FROM top_scorers")
    top_scorers = db.select_all("top_scorers")
    return {"top_scorers": [dict(zip(db.show("top_scorers"), top_scorer)) for top_scorer in top_scorers]}

@app.route("/players")
@cross_origin()
def players():
    COLUMNS = ["player_url", "long_name", "player_positions", "overall", "club_name", "club_logo"]
    GOALKEEPER_COLUMNS = ["goalkeeper_url", "long_name", "club_position", "overall", "club_name", "club_logo"]
    players = add_columns_to_list(db.select("players", COLUMNS), COLUMNS)
    goalkeepers = add_columns_to_list(db.select("goalkeepers", GOALKEEPER_COLUMNS), GOALKEEPER_COLUMNS)
    players.extend(goalkeepers)
    players = sorted(players, key = itemgetter("overall"), reverse = True)
    return { "players": players }

if (__name__ == "__main__"):
    app.run(port = 5001, debug = True)