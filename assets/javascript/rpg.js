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


//Function for generating a character
function generateCharacter(character, section) {
    var charDiv = $("<div class='character' data-name='" + character.name + "'>");
    var charName = $("<div class='character-name'>").text(character.name);
    var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
    var charHealth = $("<div class='character-health'>").text(character.health);
    charDiv.append(charName).append(charImage).append(charHealth);
    $(section).append(charDiv);

}


//Function to start the game
function start() {

    for(var key in character) {
        generateCharacter(characters[key], "#characters-section");
    }
}

start();

})