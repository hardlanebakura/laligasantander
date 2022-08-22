class Match (object):

    def __init__(self, data) -> None:
        self.match_id = data["id"]
        self.matchday = data["matchday"]
        self.home_team = data["homeTeam"]["name"]
        self.home_team_crest = data["homeTeam"]["crest"]
        self.away_team = data["awayTeam"]["name"]
        self.away_team_crest = data["awayTeam"]["crest"]
        self.home_team_goals = data["score"]["fullTime"]["home"]
        self.away_team_goals = data["score"]["fullTime"]["away"]

    def __repr__(self) -> str:
        return "Match " + str(self.match_id)