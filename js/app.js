var game;
$(document).ready(function() {

  game = new Game();

  $("#roll-btn").on("click", function() {
    // change dice image based on dice value
    $(".dice-active img").each(function(){
      var roll = game.rollDice();
      $(this).attr("src", "images/" + roll + "dice.png");
      // how and where do I record the roll, i.e. the dice value?
    })
    // decrement rollsRemain; **** NOTE: cannot be less than 0
    game.rollsRemain--;
    console.log(game.rollsRemain);
  });

  $(".dice").on("click", function(event) {
    // the img changes opacity
    if ($(this).css("opacity") === "1") {
      $(this).css("opacity", "0.4");
      // set $(this) as keptDice by pushing to array or changing class?
    } else {
      $(this).css("opacity", "1");
    }
  });

});

// the div is pushed into the keptDice array
// Function to change player turn
// Function to show how many rolls are remaining
/*
set rolls as 3
when button is clicked, rolls --

*/