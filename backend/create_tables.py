import os
from Database import *
from log_config import *

#db.cursor.execute("DROP TABLE goalkeepers")
db.cursor.execute("CREATE TABLE if not exists players (id INT AUTO_INCREMENT PRIMARY KEY, player_url VARCHAR(170), short_name VARCHAR(170), long_name VARCHAR(170), player_positions VARCHAR(49), \
overall INT(3), potential INT(3), value_eur INT(10), wage_eur INT(10), age INT(3), dob VARCHAR(19), height_cm INT(4), weight_kg INT(4), club_name VARCHAR(85), club_position VARCHAR(49), \
club_joined VARCHAR(19), nationality VARCHAR(49), preferred_foot VARCHAR(9), skill_moves INT(4), work_rate VARCHAR(49), release_clause_eur INT(12), player_traits VARCHAR(221), pace INT(4), shooting INT(4), passing INT(4), dribbling INT(4), physic INT(4), crossing INT(4), \
heading_accuracy INT(4), skill_dribbling INT(4), skill_fk_accuracy INT(4), acceleration INT(4), sprint_speed INT(4), agility INT(4), shot_power INT(4), jumping INT(4), stamina INT(4), \
strength INT(4), long_shots INT(4), sliding_tackle INT(4), ls INT(4), st INT(4), rs INT(4), lw INT(4), lf INT(4), cf INT(4), rf INT(4), rw INT(4), lam INT(4), cam INT(4), ram INT(4), lm INT(4), lcm INT(4), cm INT(4), rcm INT(4), rm INT(4), lwb INT(4), ldm INT(4), cdm INT(4), rdm INT(4), rwb INT(4), lb INT(4), lcb INT(4), cb INT(4), rcb INT(4), rb INT(4), gk INT(4), \
face VARCHAR(170), club_logo VARCHAR(170), club_flag VARCHAR(170), nation_flag VARCHAR(170))")
db.cursor.execute("CREATE TABLE if not exists rankings (rank INT AUTO_INCREMENT PRIMARY KEY, team_name VARCHAR(170), tla VARCHAR(7), crest VARCHAR(170), games INT(4), wins INT(4), draws INT(4), loses INT(4), points INT(4), goals_scored INT(4), goals_conceeded INT(4), goal_difference INT(4))")
db.cursor.execute("CREATE TABLE if not exists teams (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(170), tla VARCHAR(4), crest VARCHAR(170), venue VARCHAR(170), address VARCHAR(170), founded INT(4), colors VARCHAR(170), staff VARCHAR(170), staff_img VARCHAR(170))")
db.cursor.execute("CREATE TABLE if not exists goalkeepers (id INT AUTO_INCREMENT PRIMARY KEY, goalkeeper_url VARCHAR(170), short_name VARCHAR(170), long_name VARCHAR(170), \
overall INT(3), potential INT(3), value_eur INT(10), wage_eur INT(10), age INT(3), dob VARCHAR(19), height_cm INT(4), weight_kg INT(4), club_name VARCHAR(85), club_position VARCHAR(49), \
club_joined VARCHAR(19), nationality VARCHAR(49), preferred_foot VARCHAR(9), skill_moves INT(4), goalkeeping_diving INT(4), goalkeeping_handling INT(4), goalkeeping_kicking INT(4), goalkeeping_positioning INT(4), goalkeeping_reflexes INT(4), \
face VARCHAR(170), club_logo VARCHAR(170), club_flag VARCHAR(170), nation_flag VARCHAR(170))") 
#db.cursor.execute("DROP TABLE top_scorers")   
db.cursor.execute("CREATE TABLE if not exists top_scorers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(170), dob VARCHAR(17), club_name VARCHAR(170), goals INT(4))")
db.cursor.execute("SELECT a.player_url, a.long_name, b.dob, a.club_name, a.club_logo, a.face, b.goals FROM players AS a RIGHT JOIN top_scorers AS b ON a.dob = b.dob AND a.club_name = b.club_name")
#db.cursor.execute("CREATE TABLE if not exists matches (id INT AUTO_INCREMENT PRIMARY KEY, match_id INT(7), matchday INT(7), home_team VARCHAR(85), home_team_crest VARCHAR(170), away_team VARCHAR(85), away_team_crest VARCHAR(170), \
#home_team_goals INT(4), away_team_goals INT(4))")
COLUMNS = ["player_url", "long_name", "dob", "club_name", "club_logo", "face", "goals"]
top_scorers = [dict(zip(COLUMNS, top_scorer)) for top_scorer in db.cursor.fetchall()]
#db.cursor.execute("ALTER TABLE top_scorers ADD COLUMN player_url VARCHAR(170) AFTER id, ADD COLUMN club_logo VARCHAR(170) AFTER club_name, ADD COLUMN face VARCHAR(170) AFTER club_logo")
for top_scorer in top_scorers:
    print(db.show("top_scorers"))
    print(list(top_scorer.values()))
    dob = list(top_scorer.values())[2]
    club_name = list(top_scorer.values())[3]
    player_url = list(top_scorer.values())[0]
    club_logo = list(top_scorer.values())[4]
    face = list(top_scorer.values())[5]
    #db.insert_into("top_scorers", db.show("top_scorers"), list(top_scorer.values()))
    db.cursor.execute("SELECT * FROM top_scorers WHERE {} = '{}' AND {} = '{}'".format("dob", dob, "club_name", club_name))
    #print("SELECT * FROM top_scorers WHERE 'id' = '1' LIMIT 1".format(db.show("top_scorers")[1], list(top_scorer.values())[1]))
    #print(db.cursor.fetchone())
    db.cursor.execute("UPDATE top_scorers SET club_logo = '{}', face = '{}' WHERE {} = '{}' AND {} = '{}'".format(club_logo, face, "dob", dob, "club_name", club_name))
    db.con.commit()