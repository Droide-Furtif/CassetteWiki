var monsters = [];  // Tableau pour stocker les données des monstres chargées
var moves = [];     // Tableau pour stocker les données des mouvements chargées

// Fonction pour charger les données des monstres et des mouvements au démarrage
async function loadData() {
    try {
        const monstersResponse = await fetch('monsters.json');
        const movesResponse = await fetch('moves.json');
	const typesResponse = await fetch('assets/types.json');
        monsters = await monstersResponse.json();
        moves = await movesResponse.json();
	types = await typesResponse.json();
        console.log(monsters);
        if (monsters.length > 0) {
            loadMonster(0);  // Charge le premier monstre après avoir chargé les données
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
    var typeInfo = types.find(type => type.name === monster.type) || { color_code: '#fff', image: '', name: 'Unknown' };

    if (!monster) {
        console.error("Données de monstre non trouvées à l'index:", index);
        return;
    }

    var monsterMoves = monster.moves.map(moveEntry => {
        var move = moves.find(m => m.id === moveEntry.move_id);
        return move ? {
            name: move.name,
            type: move.type,
            category: move.category,
            power: move.power || '—',
            accuracy: move.accuracy + '%',
            cost: move.cost + ' AP',
            unlockedLevel: moveEntry.unlockedLevel
        } : null;
    }).filter(m => m);  // Filtre les mouvements non trouvés
    var monsterHtml = `
        <div>
            <button onclick="loadMonster(${index - 1 >= 0 ? index - 1 : monsters.length - 1})">Précédent</button>
            <button onclick="loadMonster(${index + 1 < monsters.length ? index + 1 : 0})">Suivant</button>
        </div>

        <h2>${monster.name}</h2>
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
                <th>Level Unlocked</th>
                <th>Move</th>
                <th>Type</th>
                <th>Category</th>
                <th>Power</th>
                <th>Accuracy</th>
                <th>Use Cost</th>
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
    var searchText = document.getElementById('searchBox').value.toLowerCase();
    var foundIndex = monsters.findIndex(monster => monster.name.toLowerCase().includes(searchText));
    if (foundIndex !== -1) {
        loadMonster(foundIndex);
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

window.addEventListener('load', loadData);  // Appelle loadData lorsque la page est chargée
