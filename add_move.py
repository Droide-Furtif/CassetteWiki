#!/usr/bin/python3.11

import json
import os

def load_json_data(filename):
	""" Charge les données depuis un fichier JSON. """
	with open(filename, 'r', encoding='utf-8') as file:
		return json.load(file)

def save_json_data(data, filename):
	""" Sauvegarde les données dans un fichier JSON. """
	with open(filename, 'w', encoding='utf-8') as file:
		json.dump(data, file, indent=4, ensure_ascii=False)

def find_move_id(moves, move_name):
	""" Retrouve l'ID d'un mouvement par son nom. """
	for move in moves:
		if move['name'].lower() == move_name.lower():
			return move['id']
	return None

def parse_moves_data(moves_data, moves):
	""" Analyse les données des mouvements récupérées pour un monstre donné. """
	move_entries = []
	lines = moves_data.strip().split('\n')
	for line in lines[1:]:
		parts = line.split('\t')
		if len(parts) >= 6:
			move_name = parts[1]
			move_id = find_move_id(moves, move_name)
			level = parts[0].count('Star-white.png')
			if move_id is not None:
				move_entries.append({"move_id": move_id, "unlockedLevel": level})
	return move_entries

def update_monsters_moves(moves_directory, monsters_filename, moves_filename):
	""" Met à jour les informations des monstres avec les données des mouvements. """
	monsters = load_json_data(monsters_filename)
	moves = load_json_data(moves_filename)
	for filename in os.listdir(moves_directory):
		if filename.endswith('_moves.txt'):
			monster_id = filename.split('_')[0]
			with open(os.path.join(moves_directory, filename), 'r', encoding='utf-8') as file:
				moves_data = file.readlines()
				image_url = moves_data[0].strip()
				for monster in monsters:
					if str(monster['id']) == str(monster_id):
						monster['img'] = image_url;
						monster['moves'] = parse_moves_data('\n'.join(moves_data), moves)
						break
	save_json_data(monsters, monsters_filename)

if __name__ == '__main__':
	moves_directory = 'monsters_moves'
	update_monsters_moves(moves_directory, 'monsters.json', 'moves.json')
	print("Mise à jour des données des monstres effectuée.")

