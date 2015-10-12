var game;
$(document).ready(function() {
game = new Game();

game.activeDice.push("#dice1", "#dice2", "#dice3", "#dice4", "#dice5");

$("#roll-btn").on("click", function() {
// Iterate through active dice array; roll and change dice image
  for (var i = 0; i < game.activeDice.length; i++) {
    var randomNum = game.rollDice();
    var elem = $(game.activeDice[i]);
    // var elem = $("#dice1")
    // set value
    elem.val(randomNum);
    console.log(elem.val());
    // change picture
    changeDiceImage(elem);
  }
});
//$this = $("#expanderSign img");
//$(game.activeDice[i] )
// Function to change dice image
var changeDiceImage = function(elem) {
  switch(parseInt(elem.val())) {
    case 1:
      $this.img.attr("src", "images/1dice.png");
      break;
    case 2:
      $this.img.attr("src", "images/2dice.png");
      break;
    case 3:
      $this.img.attr("src", "images/3dicepng");
      break;
    case 4:
      $this.img.attr("src", "images/4dice.png");
      break;
    case 5:
      $this.img.attr("src", "images/5dice.png");
      break;
    case 6:
      $this.img.attr("src", "images/6dice.png");
      break;
    default:
      console.log("CHECK")
  }
}

});

// Function to keep dice after a roll
//var keepDice = function() {
//}

// when the img is clicked
$("#dice1").on("click", function() {
  // change div opacity
  if ($("#dice1").css("opacity") === "1") {
    $("#dice1").css("opacity", "0.4");
  } else {
    $("#dice1").css("opacity", "1");
  }
});

// the div is pushed into the keptDice array
// game.setKept($("#dice1"))

// Function to change player turn


// Function to show how many rolls are remaining
