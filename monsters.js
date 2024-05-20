var monsters = [
    {
        name: "Carniviper",
        image: "https://wiki.cassettebeasts.com/wiki/File:Carniviper.png",
        type: "Poison",
        evolvesFrom: "-",
        evolvesTo: "Masquerattle",
        stats: {
            hp: 60,
            meleeAttack: 120,
            rangedAttack: 120,
            meleeDefense: 80,
            rangedDefense: 80,
            speed: 140
        },
        moves: [
            { name: "Spit", type: "Typeless", power: 30, accuracy: 100, cost: 0 },
	    { name: "Raise Arms", type: "Typeless", power: 0, accuracy: 100, cost: 1 }
        ]
    },
    {
        name: "Flameon",
        image: "https://wiki.cassettebeasts.com/images/b/b9/Scampire.png",
        type: "Fire",
        evolvesFrom: "Sparky",
        evolvesTo: "Infernon",
        stats: {
            hp: 35,
            attackDistance: 40,
            attackMelee: 50,
            defenseDistance: 20,
            defenseMelee: 30,
            speed: 60
        },
        moves: [
            { name: "Fire Blast", type: "Fire", power: 90, accuracy: 75 }
        ]
    },
    // Autres monstres...
];
