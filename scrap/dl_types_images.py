#!/usr/bin/python3.11

import json
import urllib.request

with open("types.json", 'r', encoding='utf-8') as file:
	data = json.load(file)
	for type in data:
		url = type['image']
		filename = "imgs/" + type['name'] + '.png'
		urllib.request.urlretrieve(url, filename)
		print(f"{filename} saved succesfully.")
print("Done.")
