#!/usr/bin/python3.11

import json

def parse_moves_from_text(file_path):
    moves = []
    move_id = 1
    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            parts = line.strip().split('\t')  # Tabulation délimite les colonnes
            if len(parts) == 6:  # S'assurer que toutes les parties sont présentes
                move = {
                    "id": move_id,
                    "name": parts[0],
                    "type": parts[1],
                    "category": parts[2],
                    "power": parse_power(parts[3]),
                    "accuracy": parse_accuracy(parts[4]),
                    "cost": parse_cost(parts[5])
                }
                moves.append(move)
                move_id += 1
    return moves

def parse_power(value):
    try:
        return int(value)
    except ValueError:
        return 0  # Pour les valeurs comme '—'

def parse_accuracy(value):
    if value == 'Unavoidable':
        return "Unavoidable"
    elif value == '—':
        return 0  # No accuracy applicable
    try:
        return int(value.strip('%'))
    except ValueError:
        return 0

def parse_cost(value):
    if value == 'Passive':
        return 'Passive'
    try:
        return int(value.split()[0])  # Extrait le nombre avant 'AP'
    except (ValueError, IndexError):
        return 0

def save_data(data, filename):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

if __name__ == '__main__':
    moves_path = 'test.txt'
    moves = parse_moves_from_text(moves_path)
    save_data(moves, 'moves.json')
    print("Les données ont été sauvegardées dans moves.json.")
