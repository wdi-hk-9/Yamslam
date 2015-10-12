$(document).ready(function() {

  var game = new Game();

  $("#roll-btn").on("click", function() {
    $('.dice-active img').each(function(){
      var roll = game.rollDice();
      $(this).attr("src", "images/" + roll + "dice.png");
    })
  });

  $(".dice").on("click", function(event) {
    // the img changes opacity
    if ($(this).css("opacity") === "1") {
      $(this).css("opacity", "0.4");
    } else {
      $(this).css("opacity", "1");
    }
  });

});

// the div is pushed into the keptDice array
// Function to change player turn
// Function to show how many rolls are remaining
