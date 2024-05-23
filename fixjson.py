import json

def fix_monsters_stats(file_path):
    # Charger le contenu du fichier JSON
    with open(file_path, 'r', encoding='utf-8') as file:
        monsters = json.load(file)

    # Échanger 'rangedAttack' et 'meleeDefense' pour chaque monstre
    for monster in monsters:
        print('---')
        print(monster['stats']['rangedAttack'])
        monster['stats']['rangedAttack'], monster['stats']['meleeDefense'] = \
            monster['stats']['meleeDefense'], monster['stats']['rangedAttack']
        print(monster['stats']['rangedAttack'])

    # Sauvegarder les modifications dans un nouveau fichier
    with open('fixed_monsters.json', 'w', encoding='utf-8') as file:
        json.dump(monsters, file, indent=4)

file_path = 'monsters.json'
fix_monsters_stats(file_path)
