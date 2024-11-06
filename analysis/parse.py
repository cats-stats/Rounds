import pandas as pd
import sqlite3

# Load the CSV file
data = pd.read_csv("ex_out.csv")


# Function to process the data
def process_data(data):
    processed_data = []

    for index, row in data.iterrows():
        half = row["Half"]
        minutes, seconds = divmod(
            int(row["Time"].split(":")[0]) * 60 + int(row["Time"].split(":")[1]), 60
        )

        # Determine play type and player name
        if pd.notna(row["Davidson"]):
            if " by " in row["Davidson"]:
                player_name = row["Davidson"].split(" by ")[1]
                play_type = row["Davidson"].split(" by ")[0]  # Extract play type
            else:
                player_name = ""
                play_type = row["Davidson"]  # Use the whole string as play type
            team = "Davidson"
            davidson_score = row["Davidson Score"]
            charlotte_score = row["Charlotte Score"]
        else:
            if " by " in row["Charlotte"]:
                player_name = row["Charlotte"].split(" by ")[1]
                play_type = row["Charlotte"].split(" by ")[0]  # Extract play type
            else:
                player_name = ""
                play_type = row["Charlotte"]  # Use the whole string as play type
            team = "Charlotte"
            davidson_score = row["Davidson Score"]
            charlotte_score = row["Charlotte Score"]

        processed_data.append(
            {
                "half": half,
                "minutes": minutes,
                "seconds": seconds,
                "play_type": play_type,
                "team": team,
                "first_name": (
                    player_name.split(",")[1] if "," in player_name else ""
                ),  # Assuming first name is before the comma
                "last_name": (
                    player_name.split(",")[0] if "," in player_name else ""
                ),  # Last name after the comma
                "davidson_score": davidson_score,
                "opponent_score": charlotte_score,
            }
        )

    return processed_data


# Function to insert processed data into the database
def insert_data(processed_data):
    con = sqlite3.connect("plays.db")
    cur = con.cursor()

    for entry in processed_data:
        cur.execute(
            "INSERT INTO plays (first_name, last_name, team, play_type, davidson_score, opponent_score, half, minutes, seconds) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (
                entry["first_name"],
                entry["last_name"],
                entry["team"],
                entry["play_type"],
                entry["davidson_score"],
                entry["opponent_score"],
                entry["half"],
                entry["minutes"],
                entry["seconds"],
            ),
        )

    con.commit()
    con.close()


# Process the data
processed_data = process_data(data)


# Insert the processed data into the database
insert_data(processed_data)
