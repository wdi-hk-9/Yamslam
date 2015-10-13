$(document).ready(function() {

  var game = new Game();

  // when the Roll button is clicked
  $("#roll-btn").on("click", function() {
    // as long as there is at least one roll remaining
    if(game.rollsRemain > 0) {
      // change dice image based on dice value
      $(".dice-active img").each(function(){
        var roll = game.roll();
        $(this).attr("src", "images/" + roll + "dice.png");
        // how do I record the roll, i.e. the value of each dice so I can compare later? It is in var roll.
      })
      // decrement rollsRemain
      game.rollsRemain--;
      // change the corresponding rolls remaining in html
      $("#rolls-remain").html(game.rollsRemain);
    }
  });

  $(".dice").on("click", function(event) {
    // the img changes opacity
    if ($(this).css("opacity") === "1") {
      $(this).css("opacity", "0.5");
      // set $(this) as keptDice by pushing to array or changing class?
    } else {
      $(this).css("opacity", "1");
    }
  });

});

// the div is pushed into the keptDice array
// Function to change player turn