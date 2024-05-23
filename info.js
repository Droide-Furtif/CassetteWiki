var monsters = [];  // Tableau pour stocker les données des monstres chargées
var moves = [];     // Tableau pour stocker les données des mouvements chargées

var currentLanguage = 'en';

// Fonction pour charger les données des monstres et des mouvements au démarrage
async function loadData() {
    try {
	// besoin d'async pour charger le JSON même en locale (le client n'est pas en locale ducon)
        const monstersResponse = await fetch('monsters.json');
        const movesResponse = await fetch('moves.json');
	const typesResponse = await fetch('assets/types.json');
        monsters = await monstersResponse.json();
        moves = await movesResponse.json();
	types = await typesResponse.json();
        if (monsters.length > 0) {
            loadMonster(1);  // Charge le premier monstre après avoir chargé les données
        } else {
            console.error("Aucun monstre trouvé dans le fichier JSON.");
        }
    } catch (error) {
        console.error("Erreur lors du chargement des fichiers JSON:", error);
    }
}

function loadMonster(index) {
    if (index < 0 || index >= monsters.length) {
        return;  // Sort de la fonction si l'index est invalide
    }

    var monster = monsters[index];
    // récupération des données de types dans le json, selon type du monstre
    var typeInfo = types.find(type => type.name === monster.type) || { color_code: '#fff', image: '', name: 'Unknown' };
    var langKey = currentLanguage === 'fr' ? '_fr' : '';

    if (!monster) {
        console.error("Données de monstre non trouvées à l'index:", index);
        return;
    }

    // Mise en place des moves du monstre
    var monsterMoves = monster.moves.map(moveEntry => {
        var move = moves.find(m => m.id === moveEntry.move_id);
        var moveTranslatedName = move['name' + langKey] || move.name;
        return move ? {
            name: moveTranslatedName,
            type: currentLanguage === 'fr' ? translate(move.type, typeTranslations) : move.type,
            category: currentLanguage === 'fr' ? translate(move.category, categoryTranslations) : move.category,
            power: move.power || '—',
            accuracy: typeof move.accuracy === 'number' ? move.accuracy + '%' : move.accuracy,
            cost: typeof move.cost === 'number' ? move.cost + (currentLanguage === 'fr' ? ' PA' : ' AP') : move.cost,
            unlockedLevel: moveEntry.unlockedLevel
        } : null;
    }).filter(m => m);  // Filtre les mouvements non trouvés

    // Création de l'HTML des infos du monstre
    var monsterHtml = `
        <div>
            <button onclick="loadMonster(${index - 1 >= 0 ? index - 1 : monsters.length - 1})">Précédent</button>
            <button onclick="loadMonster(${index + 1 < monsters.length ? index + 1 : 0})">Suivant</button>
        </div>

        <h2>#${monster.id} ${monster['name' + langKey]}</h2>
        <img src="${monster.img}" alt="${monster.name}">
        <p>Type: <span class="type-info" style="background-color:${typeInfo.color_code};">
            <img src="${typeInfo.image}" alt="${typeInfo.name}" style="height:32px;margin: 5px"> ${typeInfo.name}
        </span></p>
        <p>Évolue de: ${monster.evolvesFrom || 'N/A'}</p>
        <p>Évolue en: ${monster.evolvesTo.join(', ') || 'N/A'}</p>
        <h3>Base Stats</h3>
        <div class="stats-table">
            ${generateStatsRow('Max HP', monster.stats.hp)}
            ${generateStatsRow('M. Atk', monster.stats.meleeAttack)}
            ${generateStatsRow('M. Def', monster.stats.meleeDefense)}
            ${generateStatsRow('R. Atk', monster.stats.rangedAttack)}
            ${generateStatsRow('R. Def', monster.stats.rangedDefense)}
            ${generateStatsRow('Speed', monster.stats.speed)}
        </div>
        <h3>Movelist</h3>
        <table class="moves-table">
            <tr>
                <th class="col-wide">${currentLanguage === 'fr' ? "Niveau d'obtention" : 'Unlocked at Level'}</th>
                <th class="col-medium">${currentLanguage === 'fr' ? "Nom" : 'Name'}</th>
                <th class="col-medium">Type</th>
                <th class="col-medium">${currentLanguage === 'fr' ? "Catégorie" : 'Category'}</th>
                <th class="col-small">${currentLanguage === 'fr' ? "Puissance" : 'Power'}</th>
                <th class="col-small">${currentLanguage === 'fr' ? "Précision" : 'Accuracy'}</th>
                <th class="col-small">${currentLanguage === 'fr' ? "Coût" : 'Cost'}</th>
            </tr>
            ${monsterMoves.map(move => `
                <tr>
                    <td>${'★'.repeat(move.unlockedLevel)}${move.unlockedLevel > 0 ? ` (${move.unlockedLevel})` : 'Initial'}</td>
                    <td>${move.name}</td>
                    <td>${move.type}</td>
                    <td>${move.category}</td>
                    <td>${move.power}</td>
                    <td>${move.accuracy}</td>
                    <td>${move.cost}</td>
                </tr>`).join('')}
        </table>
    `;
    document.getElementById('monsterInfo').innerHTML = monsterHtml;
    currentMonsterIndex = index;
}

function searchMonster() {
    var searchText = document.getElementById('searchBox').value.trim();  // Récupère le texte entré dans le champ de recherche
    var searchNumber = parseInt(searchText, 10);  // Tente de convertir le texte en nombre

    // Trouve l'index du monstre soit par ID (si searchText est numérique) soit par nom
    var foundIndex = monsters.findIndex(monster =>
        monster.name.toLowerCase().includes(searchText.toLowerCase()) ||
        parseInt(monster.id) === searchNumber
    );

    if (foundIndex !== -1) {
        loadMonster(foundIndex);  // Charge le monstre trouvé
    } else {
        document.getElementById('monsterInfo').innerHTML = '<p>Aucun monstre trouvé.</p>';  // Affiche un message si aucun monstre n'est trouvé
    }
}

function generateStatsRow(statName, value) {
    const maxValue = 300;
    const widthPercent = (value / maxValue) * 100;
    return `
        <div class="stat-row">
            <div class="stat-name">${statName}</div>
            <div class="stat-bar-container">
                <div class="stat-bar" style="width: ${widthPercent}%;">${value}</div>
            </div>
        </div>
    `;
}

function changeLanguage() {
    currentLanguage = document.getElementById('languageSelect').value;
    loadMonster(currentMonsterIndex);
}

window.addEventListener('load', loadData);  // Appelle loadData lorsque la page est chargée
