$(document).ready(function() {

  var game = new Game();
  var p1 = new Player();
  var p2 = new Player();


  // change dice image based on dice value
  var changeDiceImages = function() {
    $(".dice-active img").each(function(){
      var roll = game.roll();
      $(this).attr("src", "images/" + roll + "dice.png");
      // how do I record the roll, i.e. the value of each dice so I can compare later? It is in var roll.
    });
  }

  $("#roll-btn").on("click", function() {
    if(game.rollsRemain > 0) {
      changeDiceImages();
      game.rollsRemain--;
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