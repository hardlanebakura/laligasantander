from Database import *

FIFA_TEAMS_TO_API_TEAMS = {'Athletic Club de Bilbao': 'Athletic Club', 'Atlético de Madrid': 'Club Atlético de Madrid', 'CA Osasuna': 'CA Osasuna', 'RCD Espanyol de Barcelona': 'RCD Espanyol de Barcelona', 'FC Barcelona': 'FC Barcelona', 'Getafe CF': 'Getafe CF', 'Granada CF': 'Granada CF', 'Real Madrid CF': 'Real Madrid CF', 'Rayo Vallecano': 'Rayo Vallecano de Madrid', 'Levante Unión Deportiva': 'Levante UD', 'RCD Mallorca': 'RCD Mallorca', 'Real Betis Balompié': 'Real Betis Balompié', 'Real Sociedad': 'Real Sociedad de Fútbol', 'Villarreal CF': 'Villarreal CF', 'Valencia CF': 'Valencia CF', 'Deportivo Alavés': 'Deportivo Alavés', 'Cádiz CF': 'Cádiz CF', 'Elche CF': 'Elche CF', 'RC Celta de Vigo': 'RC Celta de Vigo', 'Sevilla FC': 'Sevilla FC'}

def find_fifa_player_from_api(player):
    return "1"

def find_fifa_team_from_api(team):
    return list(FIFA_TEAMS_TO_API_TEAMS.keys())[list(FIFA_TEAMS_TO_API_TEAMS.values()).index(team)]

#each item in list should be into k, v from columns
def add_columns_to_list(list, columns):
    list1 = []
    for item in list:
        d = {}
        for key in item:
            d[columns[item.index(key)]] = key
        list1.append(d)
    return list1

