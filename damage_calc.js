function calculateDamage() {
    const power = parseInt(document.getElementById('power').value);
    const attack = parseInt(document.getElementById('attack').value);
    const defense = parseInt(document.getElementById('defense').value);
    const level = parseInt(document.getElementById('level').value);
    const stab = document.getElementById('stab').checked ? 1.2 : 1;
    const crit = document.getElementById('crit').checked;
    const advantage = parseInt(document.getElementById('advantage').value);
    const disadvantage = parseInt(document.getElementById('disadvantage').value);
    const critAttribute = parseInt(document.getElementById('critAttribute').value);

    const random = Math.floor(Math.random() * (100 - 85 + 1)) + 85;
    const critMultiplier = crit ? 1.5 + critAttribute : 1;

    const damage = (power * (attack / defense) * ((level + 37) / 100) * (random / 100) + 1) * stab * Math.pow(1.3, (advantage - disadvantage)) * critMultiplier;

    document.getElementById('result').textContent = `Calculé Dommages: ${damage.toFixed(2)}`;
}

window.onload = function() {
    document.getElementById('crit').addEventListener('change', function() {
        document.getElementById('critAttribute').disabled = !this.checked;
    });
}
