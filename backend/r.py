import json
from FootballDataAPI import *
from subsidiary_functions import find_fifa_team_from_api
from Database import *

def get_teams():
    teams = FootballData.get_competitions()
    for team in teams:
        team.name = find_fifa_team_from_api(team.name)
    with open("teams.json", encoding = "utf8") as file:
        data = json.load(file)
        #print(data)
    for team in teams:
        #team.set_staff(data[team.name]["staff"], data[team.name]["dob"], data[team.name]["staff_img"])
        #print(data[data.index(team.name)])
        d = [item for item in data if list(item.keys())[0] == team.name][0]
        #team.set_staff(d)
        team.set_venue((list(d.values())[0]))
        team.set_staff(list(d.values())[0])
        print(list(vars(team).values()))
        print(db.show("teams"))
        db.insert_into("teams", db.show("teams"), list(vars(team).values()))
        db.con.commit()

#get_teams()
