#!/usr/bin/python3.11

import json

def parse_monsters_from_text(file_path):
    monsters = []
    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            parts = line.strip().split('\t')
            if len(parts) == 9:  # Assurer qu'il y a suffisamment de parties dans la ligne
                print("go")
                monster = {
                    "id": parts[1].strip('#'),
                    "name": parts[0],
                    "img": " ",
                    "type": parts[2],
                    "evolvesFrom": " ",
                    "evolvesTo": [" "],
                    "stats": {
                        "hp": int(parts[3]),
                        "meleeAttack": int(parts[4]),
                        "rangedAttack": int(parts[5]),
                        "meleeDefense": int(parts[6]),
                        "rangedDefense": int(parts[7]),
                        "speed": int(parts[8])
                    },
                    "moves": []  # Ce champ sera rempli plus tard
                }
                monsters.append(monster)
            print("nogo")
    return monsters

def save_data(data, filename):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

if __name__ == '__main__':
    monsters_path = 'monsters.txt'
    monsters = parse_monsters_from_text(monsters_path)
    save_data(monsters, 'monsters.json')
    print("Les données des monstres ont été sauvegardées dans monsters.json.")

