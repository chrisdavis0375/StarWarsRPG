$(document).ready(function() {


    // Character objects that contain charcters name, health, attack power, and enemy counter attack damage
    var characters = {
      "Obi-Wan Kenobi": {
        name: "Obi-Wan Kenobi",
        health: 120,
        attack: 8,
        imageUrl: "assets/images/obi-wan.jpg",
        enemyAttackBack: 15
      },
      "Luke Skywalker": {
        name: "Luke Skywalker",
        health: 100,
        attack: 14,
        imageUrl: "assets/images/luke-skywalker.jpg",
        enemyAttackBack: 5
      },
      "Darth Sidious": {
        name: "Darth Sidious",
        health: 150,
        attack: 8,
        imageUrl: "assets/images/darth-sidious.png",
        enemyAttackBack: 20
      },
      "Darth Maul": {
        name: "Darth Maul",
        health: 180,
        attack: 7,
        imageUrl: "assets/images/darth-maul.jpg",
        enemyAttackBack: 25
      }
    };
  
    //Declared variable for users selected character
    var attacker;
    //Empty array for the characters that the use did not select
    var combatants = [];
    //Declared variable for defender
    var defender;
    //Variable to count turns
    var turnCounter = 1;
    //Keeps track of how many kills the user has
    var killCount = 0;
  

  
    //Function to create all divs for character objects and append them to the page
    var renderCharacter = function(character, renderArea) {
      var charDiv = $("<div class='character' data-name='" + character.name + "'>");
      var charName = $("<div class='character-name'>").text(character.name);
      var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
      var charHealth = $("<div class='character-health'>").text(character.health);
      charDiv.append(charName).append(charImage).append(charHealth);
      $(renderArea).append(charDiv);
    };
  
    // this function will load all the characters into the character section to be selected
    var initializeGame = function() {
      // Loop through the characters object and call the renderCharacter function on each character to render their card.
      for (var key in characters) {
        renderCharacter(characters[key], "#characters-section");
      }
    };
  

    initializeGame();
  

    var updateCharacter = function(charObj, areaRender) {
      $(areaRender).empty();
      renderCharacter(charObj, areaRender);
    };
  
    //Function for appending the enemy selected to the available to attack div
    var renderEnemies = function(enemyArr) {
      for (var i = 0; i < enemyArr.length; i++) {
        renderCharacter(enemyArr[i], "#available-to-attack-section");
      }
    };
  
    //Function for rendering messages
    var renderMessage = function(message) {
      var gameMessageSet = $("#game-message");
      var newMessage = $("<div>").text(message);
      gameMessageSet.append(newMessage);
    };
  

    //Function to restart the game
    var restartGame = function(resultMessage) {
      var restart = $("<button>Restart</button>").click(function() {
        location.reload();
      });
  
      var gameState = $("<div>").text(resultMessage);
  
      $("body").append(gameState);
      $("body").append(restart);
    };
  
    // Function to clear the game message section
    var clearMessage = function() {
      var gameMessage = $("#game-message");
  
      gameMessage.text("");
    };
  
  
    // On click event for selecting character
    $("#characters-section").on("click", ".character", function() {
      var name = $(this).attr("data-name");
  
      if (!attacker) {
        attacker = characters[name];
        for (var key in characters) {
          if (key !== name) {
            combatants.push(characters[key]);
          }
        }
  
        $("#characters-section").hide();
  
        updateCharacter(attacker, "#selected-character");
        renderEnemies(combatants);
      }
    });
  
    //On click function for enemies
    $("#available-to-attack-section").on("click", ".character", function() {
      var name = $(this).attr("data-name");
  
      if ($("#defender").children().length === 0) {
        defender = characters[name];
        updateCharacter(defender, "#defender");
  
        $(this).remove();
        clearMessage();
      }
    });
  
    //On click event for when the user attacks defender
    $("#attack-button").on("click", function() {
      if ($("#defender").children().length !== 0) {
        var attackMessage = "You attacked " + defender.name + " for " + attacker.attack * turnCounter + " damage.";
        var counterAttackMessage = defender.name + " attacked you back for " + defender.enemyAttackBack + " damage.";
        clearMessage();
  
        defender.health -= attacker.attack * turnCounter;
  
        if (defender.health > 0) {
          updateCharacter(defender, "#defender");
  
          renderMessage(attackMessage);
          renderMessage(counterAttackMessage);
  
          attacker.health -= defender.enemyAttackBack;
  
          updateCharacter(attacker, "#selected-character");
  
          //If you have less than zero health the game ends

          if (attacker.health <= 0) {
            clearMessage();
            restartGame("You have been defeated...GAME OVER!!!");
            $("#attack-button").off("click");
          }
        }
        else {

          //If the enemy has less than zero health they are defeated.
          $("#defender").empty();
  
          var gameStateMessage = "You have defeated " + defender.name + ", you can choose to fight another enemy.";
          renderMessage(gameStateMessage);
  
          killCount++;
  
          // If the user kills all opponents then the game is restarted after recieving you won notification

          if (killCount >= combatants.length) {
            clearMessage();
            $("#attack-button").off("click");
            restartGame("You Won!!!! GAME OVER!!!");
          }
        }
        turnCounter++;
      }
      else {
        //If there is no defender the user is notified that there is not an enemy to attack
        clearMessage();
        renderMessage("No enemy here.");
      }
    });
  });
  