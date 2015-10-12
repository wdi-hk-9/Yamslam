var game;
$(document).ready(function() {
game = new Game();

game.activeDice.push("#dice1", "#dice2", "#dice3", "#dice4", "#dice5");

$("#roll-btn").on("click", function() {
// Iterate through active dice array; roll and change dice image
  for (var i = 0; i < game.activeDice.length; i++) {
    var randomNum = game.rollDice();
    var elem = $(game.activeDice[i])
    // var elem = $("#dice1")
    // set value
    elem.val(randomNum);
    console.log(elem.val());
    // change picture
    changeDiceImage(elem);
  }
});

// Function to change dice image
var changeDiceImage = function(elem) {
  var elemValue = elem.val();
  switch(elemValue) {
    case 1:
      (elem img).attr("src", "images/1dice.png");
      break;
    case 2:
      $("#dice1Image").attr("src", "images/2dice.png");
      break;
    case 3:
      $("#dice1Image").attr("src", "images/3dicepng");
      break;
    case 4:
      $("#dice1Image").attr("src", "images/4dice.png");
      break;
    case 5:
      $("#dice1Image").attr("src", "images/5dice.png");
      break;
    case 6:
      $("#dice1Image").attr("src", "images/6dice.png");
      break;
    default:
      console.log("CHECK")
  }
}

});



// this is for later; ignore for now
// game.changeDiceImage(game.activeDice[i]);

// Function to change player turn


// Function to show how many rolls are remaining
