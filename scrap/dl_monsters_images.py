#!/usr/bin/python3.11

import json
import urllib.request
import sys

with open("monsters.json", 'r', encoding='utf-8') as file:
	data = json.load(file)
	for monster in data:
		url = monster['img']
		if url != "":
			filename = "imgs/monsters/" + monster['name'] + '.png'
			urllib.request.urlretrieve(url, filename)
			print(f"{filename} saved succesfully.")
print("Done.")
