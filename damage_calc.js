function calculateDamage() {
  var level = parseInt(document.getElementById('level').value);
  var power = parseInt(document.getElementById('power').value);
  var random = Math.floor(Math.random() * (100 - 85 + 1)) + 85;
  var stab = document.getElementById('stab').checked ? 1.2 : 1;
  var crit = document.getElementById('crit').checked ? 1.5 : 1;

  var damage = (((((2 * level / 5 + 2) * power) / 50) + 2) * stab * random / 100 * crit).toFixed(2);
  document.getElementById('result').innerText = "Damage: " + damage;
}
