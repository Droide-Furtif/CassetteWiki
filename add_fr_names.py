#!/usr/bin/python3.11

import json

# Charger le fichier JSON existant
with open('testfr.json', 'r') as file:
    data = json.load(file)

# Modifier chaque élément pour ajouter le champ "name_fr"
for character in data:
    # Création d'une copie de la liste des clés et valeurs
    items = list(character.items())
    # Trouver l'index du champ "name"
    index_name = next(i for i, item in enumerate(items) if item[0] == 'name') + 1
    # Insérer le champ "name_fr" juste après "name"
    items.insert(index_name, ('name_fr', character['name'] + '_FR'))
    # Créer un nouveau dictionnaire avec les items modifiés
    new_character = dict(items)
    # Mettre à jour l'objet original
    character.update(new_character)

# Sauvegarder le nouveau JSON modifié dans un nouveau fichier
with open('outtestfr.json', 'w') as file:
    json.dump(data, file, indent=4)
