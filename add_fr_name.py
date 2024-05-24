#!/usr/bin/python3.11

import json

def load_json_data(filename):
    """ Charge les données depuis un fichier JSON. """
    with open(filename, 'r', encoding='utf-8') as file:
        return json.load(file)

def save_json_data(data, filename):
    """ Sauvegarde les données dans un fichier JSON. """
    with open(filename, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4, ensure_ascii=False)

def update_monster_name(monsters_data, english_name, french_name):
    """ Met à jour ou ajoute le nom français d'un monstre basé sur son nom anglais. """
    found = False
    for monster in monsters_data:
        if monster['name'].lower() == english_name.lower():
            monster['name_fr'] = french_name
            found = True
            break
    if not found:
        print("Aucun monstre trouvé avec le nom anglais spécifié.")
    return monsters_data

if __name__ == '__main__':
    filename = 'monsters.json'  # Chemin vers votre fichier JSON
    monsters = load_json_data(filename)

    # Demander à l'utilisateur de rentrer le nom anglais et français du monstre
    english_name = input("Entrez le nom anglais du monstre : ")
    french_name = input("Entrez le nom français du monstre : ").lower().capitalize()

    # Mettre à jour le fichier JSON avec le nouveau nom français
    updated_monsters = update_monster_name(monsters, english_name, french_name)
    save_json_data(updated_monsters, filename)

    print("Mise à jour effectuée avec succès.")

