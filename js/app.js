var game;
$(document).ready(function() {
game = new Game();


// game.rollDice();

//game.changeDiceImage(game.dice1);
//game.changeDiceImage(game.dice2);


$("#roll-btn").on("click", function() {
// Iterate through active dice: roll and change dice image

  game.rollDice();

  game.changeDiceImage(game.dice1);
});










});