FIFA_TEAMS_TO_API_TEAMS = {'Athletic Club de Bilbao': 'Athletic Club', 'Atlético de Madrid': 'Club Atlético de Madrid', 'CA Osasuna': 'CA Osasuna', 'RCD Espanyol de Barcelona': 'RCD Espanyol de Barcelona', 'FC Barcelona': 'FC Barcelona', 'Getafe CF': 'Getafe CF', 'Granada CF': 'Granada CF', 'Real Madrid CF': 'Real Madrid CF', 'Rayo Vallecano': 'Rayo Vallecano de Madrid', 'Levante Unión Deportiva': 'Levante UD', 'RCD Mallorca': 'RCD Mallorca', 'Real Betis Balompié': 'Real Betis Balompié', 'Real Sociedad': 'Real Sociedad de Fútbol', 'Villarreal CF': 'Villarreal CF', 'Valencia CF': 'Valencia CF', 'Deportivo Alavés': 'Deportivo Alavés', 'Cádiz CF': 'Cádiz CF', 'Elche CF': 'Elche CF', 'RC Celta de Vigo': 'RC Celta de Vigo', 'Sevilla FC': 'Sevilla FC'}

class Team (object):

    def __init__(self, data):
        if "team" not in data:
            #self.name = list(FIFA_TEAMS_TO_API_TEAMS.keys())[list(FIFA_TEAMS_TO_API_TEAMS.values()).index(data["name"])]
            self.name = data["name"]
            self.tla = data["tla"]
            self.crest = data["crest"]
            self.venue = data["venue"]
            self.address = data["address"]
            self.founded = data["founded"]
            self.colors = data["clubColors"]
        else:
            #self.name = list(FIFA_TEAMS_TO_API_TEAMS.keys())[list(FIFA_TEAMS_TO_API_TEAMS.values()).index(data["team"]["name"])]
            self.name = data["team"]["name"]
            self.tla = data["team"]["tla"]
            self.crest = data["team"]["crest"]
            self.games = data["playedGames"]
            self.wins = data["won"]
            self.draws = data["draw"]
            self.loses = data["lost"]
            self.points = data["points"]
            self.goals_scored = data["goalsFor"]
            self.goals_conceeded = data["goalsAgainst"]
            self.goal_difference = data["goalDifference"]

    def get_players(self, data):
        for player in data:
            print(player["dateOfBirth"])
            print(player["nationality"])


    def set_staff(self, data):
        self.staff = data["staff"]
        self.staff_dob = data["staff_dob"]
        self.staff_img = data["staff_img"]

    def set_venue(self, data):
        self.venue_capacity = data["venue_capacity"]
        self.venue_img = data["venue_img"]

    def __repr__(self):
        return self.name