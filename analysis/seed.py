import sqlite3

con = sqlite3.connect("plays.db")

cur = con.cursor()

cur.execute(
    "CREATE TABLE plays (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, team TEXT, play_type TEXT, davidson_score INTEGER, opponent_score INTEGER, half INTEGER, minutes INTEGER, seconds INTEGER, round INTEGER)"
)

con.commit()
con.close()
