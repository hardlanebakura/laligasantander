from operator import itemgetter
import pandas as pd
import os
from FootballDataAPI import *
from classes.Player import Player
from classes.Goalkeeper import Goalkeeper
from classes.Team import Team
from Database import *
from log_config import *
from difflib import get_close_matches
from subsidiary_functions import *
import json

os.chdir("../fifa21-complete-dataset")
df = pd.read_csv("players_22.csv")

player_categories = ['club_jersey_number', 'nation_jersey_number', 'club_contract_valid_until', 'release_clause_eur', 'pace', 'shooting', 'passing', 'dribbling', 'physic', 'attacking_crossing', 'attacking_heading_accuracy', 'skill_dribbling',
                     'skill_fk_accuracy', 'movement_acceleration', 'movement_sprint_speed', 'movement_agility', 'power_shot_power', 'power_jumping', 'power_stamina', 'power_strength',
                     'power_long_shots', 'defending_sliding_tackle', 'value_eur', 'wage_eur']

def get_updated_categories(categories):
    for category in categories:
        df[category] = df[category].fillna(0)
        df[category] = df[category].astype(int)

get_updated_categories(player_categories)

def get_player_statistics(player):
    stats_fields = list(player)[37:]
    for stats_field in stats_fields:
        if isinstance(player[stats_field], str) and stats_field != "player_traits":
            if "+" in player[stats_field]:
                if (len(player[stats_field].split("+")[0]) == 2):
                    if player[stats_field].split("+")[1] == "": player[stats_field].split("+")[1] = 0
                    player[stats_field] = int(player[stats_field].split("+")[0]) + int(player[stats_field].split("+")[1])
                else:
                    player[stats_field] = int(player[stats_field].split("+")[0])
            elif "-" in player[stats_field]:
                if (len(player[stats_field].split("-")[0]) == 2):
                    player[stats_field] = int(player[stats_field].split("-")[0]) - int(player[stats_field].split("-")[1])
                else:
                    try:
                        player[stats_field] = int(player[stats_field].split("-")[0])
                    except:
                        pass
    if "GK" not in player["player_positions"]:
        return Player(player)
    return Goalkeeper(player)

d = df.to_dict("index")

players = [item[1] for item in d.items()]

fifa_team_names = [player["club_name"] for player in players if player["nationality_name"] == "Spain"]
fifa_team_names = list(set(fifa_team_names))
fifa_team_names.pop(fifa_team_names.index("Real Sociedad B"))

fifa_teams_to_api_teams = {}
fifa_teams = []
football_data_teams = [team for team in FootballData.get_competitions()]
for team in football_data_teams:
    fifa_teams.append(get_close_matches(team.name, fifa_team_names)[0])
    fifa_teams_to_api_teams[get_close_matches(team.name, fifa_team_names)[0]] = team.name

players = [get_player_statistics(player) for player in players if player["club_name"] in fifa_teams]

def insert_players_into_db():
    for player in players:
        if not isinstance(player, Player): 
            db.insert_into("goalkeepers", db.show("goalkeepers"), list(vars(player).values()))
        else:
            db.insert_into("players", db.show("players"), list(vars(player).values())) 

#nsert_players_into_db()

def get_top_scorers():
    for item in FootballData.get_top_scorers():
        club_name = find_fifa_team_from_api(item["team"]["name"])
        db.cursor.execute("SELECT * FROM players WHERE dob = '{}' AND club_name = '{}'".format(item["player"]["dateOfBirth"], club_name))
        dob = db.cursor.fetchall()[0][10]
        #db.insert_into("top_scorers", db.show("top_scorers"), [item["player"]["name"], dob, club_name, item["goals"]])

#get_top_scorers()

def get_standings():
    for item in FootballData.get_standings():
        db.insert_into("rankings", db.show("rankings"), list(vars(item).values()))

#get_standings()

def get_latest_matches():
    for item in FootballData.get_latest_matches():
        db.insert_into("matches", db.show("matches"), list(item.values()))

#get_latest_matches()

def get_managers():
    db.cursor.execute("SELECT a.*, b.rank FROM teams AS a LEFT JOIN rankings AS b ON a.name = b.team_name")
    list1 = [item[1:] for item in db.cursor.fetchall()]
    columns = db.show("teams")
    columns.append("rank")
    for item in list1:
        list1[list1.index(item)] = dict(zip(columns, item))
    values = sorted(list1, key = itemgetter("value"), reverse = True)
    manager_impacts = []
    for list_item in list1:
        manager_impact = values.index([item for item in values if list_item["name"] == item["name"]][0]) - list1.index(list_item)
        manager_impacts.append({"staff": list_item["staff"], "staff_img": list_item["staff_img"], "impact": values.index([item for item in values if list_item["name"] == item["name"]][0]) - list1.index(list_item)})
    manager_impacts = sorted(manager_impacts, key = itemgetter("impact"), reverse = True)
    for item in manager_impacts:
        db.cursor.execute("UPDATE teams SET staff_impact = {} WHERE staff = '{}'".format(item["impact"], item["staff"]))
        db.con.commit()
    #db.cursor.execute("UPDATE teams SET staff_impact = {}")

def get_players_for_teams():
    team_players = {}
    team_values = {}
    for team in fifa_teams:
        team_players[team] = []
        team_values[team] = 0
    for player in players:
        team_players[player.club_name].append(player)
        team_values[player.club_name] += player.value_eur
    return {"players": team_players, "values": team_values}

#get_managers()

