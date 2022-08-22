import http.client
from urllib import response
from dotenv import dotenv_values
import requests
import json
from classes.Team import Team
from classes.Match import Match

URL = "https://api.football-data.org/v4/"
connection = http.client.HTTPConnection('api.football-data.org')
API_FOOTBALL_KEY = dotenv_values(".env")["API_FOOTBALL_KEY"]
headers = { 'X-Auth-Token': str(API_FOOTBALL_KEY) }

class FootballData (object):

    @staticmethod
    def get_competitions():
        connection.request('GET', '/v4/competitions/2014/teams?season=2021', None, headers )
        response_teams = json.loads(connection.getresponse().read().decode())
        return [Team(team) for team in response_teams["teams"]]

    @staticmethod
    def get_standings():
        connection.request('GET', '/v4/competitions/2014/standings?season=2021', None, headers )
        response_standings = [table for table in json.loads(connection.getresponse().read().decode())["standings"] if table["type"] == "TOTAL"][0]["table"]
        print(response_standings)
        return [Team(team) for team in response_standings]

    @staticmethod
    def get_top_scorers():
        connection.request('GET', '/v4/competitions/2014/scorers?season=2021', None, headers )
        response = json.loads(connection.getresponse().read().decode())["scorers"]
        return response

    @staticmethod
    def get_latest_matches():
        connection.request('GET', '/v4/competitions/2014/matches?season=2021', None, headers )
        response_matches = json.loads(connection.getresponse().read().decode())["matches"]
        return [Match(item).__dict__ for item in response_matches]

#FootballData.get_competitions()

#print(FootballData.get_standings())

#FootballData.get_latest_matches()



