

const typeTranslations = {
	'Typeless': 'Neutre',
	'Beast': 'Bête',
	'Air': 'Air',
	'Astral': 'Astral',
	'Earth': 'Terre',
	'Fire': 'Feu',
	'Ice': 'Glace',
	'Lightning': 'Électrique',
	'Metal': 'Métal',
	'Plant': 'Plante',
	'Plastic': 'Plastique',
	'Poison': 'Poison',
	'Water': 'Eau',
	'Glass': 'Verre',
	'Glitter': 'Brilliant'
}

const categoryTranslations = {
	'Melee Attack': 'Attaque CàC',
	'Ranged Attack': 'Attaque à Distance',
	'Status Effect': 'Effet de Status',
	'Miscellaneous': 'Autres'
}

function translate(key, dictionary) {
    return dictionary[key] || key;  // Retourne la clé si aucune traduction n'est trouvée
}
