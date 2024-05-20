#!/usr/bin/python3.11

import json

def main():
    moves = load_existing_moves()
    monsters = load_existing_monsters()

    while True:
        choice = input("Voulez-vous ajouter un 'monstre' ou un 'sort' ? (monstre/sort) ")
        if choice.lower() == 'sort':
            move = get_move_data(moves)
            moves.append(move)
            save_data(moves, 'moves.json')
        elif choice.lower() == 'monstre':
            monster = get_monster_data(moves)
            monsters.append(monster)
            save_data(monsters, 'monsters.json')

        if input("Ajouter autre chose ? (oui/non) ").lower() != 'oui':
            break

def load_existing_moves():
    try:
        with open('moves.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except:
        return []

def load_existing_monsters():
    try:
        with open('monsters.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except:
        return []

def get_monster_data(moves):
    name = input("Nom du monstre : ")
    image = input("Chemin de l'image du monstre : ")
    type_ = input("Type du monstre : ")
    evolves_from = input("Évolue de (laisser vide si aucun) : ")
    evolves_to = input("Évolue en (laisser vide si aucun) : ")
    stats = {
        "hp": int(input("HP Max : ")),
        "attackMelee": int(input("Attaque CàC : ")),
        "defenseMelee": int(input("Défense CàC : ")),
        "attackDistance": int(input("Attaque Distance : ")),
        "defenseDistance": int(input("Défense Distance : ")),
        "speed": int(input("Vitesse : "))
    }
    moves_list = get_moves_for_monster(moves)

    return {
        "name": name,
        "image": image,
        "type": type_,
        "evolvesFrom": evolves_from,
        "evolvesTo": evolves_to,
        "stats": stats,
        "moves": moves_list
    }

def get_moves_for_monster(moves):
    moves_list = []
    adding_more_moves = True
    while adding_more_moves:
        move_id = input("ID du sort : ")
        level_learned = int(input("Niveau auquel le sort est appris : "))
        if any(move['id'] == move_id for move in moves):
            moves_list.append({"id": move_id, "levelLearned": level_learned})
        else:
            print("ID de sort non trouvé.")
        adding_more_moves = input("Ajouter un autre sort ? (oui/non) ").lower() == 'oui'
    return moves_list

def get_move_data(moves):
    move_id = generate_move_id(moves)
    name = input("Nom du sort : ")
    type_ = input("Type : ")
    category = get_move_category()
    power = int(input("Puissance : "))
    accuracy = int(input("Précision : "))
    cost = get_move_cost()
    return {
        "id": move_id,
        "name": name,
        "type": type_,
        "category": category,
        "power": power,
        "accuracy": accuracy,
        "cost": cost,
    }

def generate_move_id(moves):
    if not moves:
        return 1
    return max(move['id'] for move in moves) + 1

def get_move_category():
    category_mapping = {'m': "Melee", 'r': "Distance", 's': "Status", 'o': "Miscellaneous"}
    letter = input("Catégorie (Melee; Distance; Status; Other) : ")[0].lower()
    return category_mapping.get(letter, "???")

def get_move_cost():
    cost = int(input("Coût en PA (entrer -1 pour Passive) : "))
    return "Passive" if cost == -1 else cost

def save_data(data, filename):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    main()

