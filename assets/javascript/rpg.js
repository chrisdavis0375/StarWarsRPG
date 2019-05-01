$(document).ready(function() {

    //Character objects that contain characrers name, health, attack, and enemy counters

    var characters = {
        "Obi-Wan Kenobi": {
            name: "Obi-Wan Kenobi",
            health: 120,
            attack: 8,
            imageUrl: "assets/images/obi-wan.jpg",
            enemyCounter: 15
        },
        "Luke Skywalker": {
            name: "Luke Skywalker",
            health: 100,
            attack: 14,
            imageUrl: "assets/images/luke-skywalker.jpg",
            enemyCounter: 5
        },
        "Darth Sidious": {
            name: "Darth Sidious",
            health: 150,
            attack: 7,
            imageUrl: "assets/images/darth-sidious.png"
            enemyCounter: 20
        },
        "Darth Maul": {
            name: "Darth Maul",
            health: 180,
            attack: 7,
            imageUrl: "assets/images/darth-maul.jpg",
            enemyCounter: 25
        }
    };
    //Empty variables fo attacker and defender
    var attacker;
    var defender;
    //Variable for characters not selected
    var combatants = [];
    //Turn counter
    var turn = 1;
    //Kill counter
    var kills = 0;



    
})