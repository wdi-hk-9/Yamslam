$(document).ready(function() {

  var game = new Game();
  var p1 = new Player();
  var p2 = new Player();
  var counter = 1; // this is for figuring out player turns


  var changeDiceImages = function() {
    $(".dice-active img").each(function(){
      // this part doesn't work because game.roll() maps activeDice but before it just returned random numbers
      var roll = game.roll();
      console.log(roll);
      $(this).attr("src", "images/" + roll + "dice.png");
    });
  };

  var changeDiceOpacity = function() {
    if ($(this).css("opacity") === "1") {
      $(this).css("opacity", "0.5");
    } else {
      $(this).css("opacity", "1");
    }
  };

  $("#roll-btn").on("click", function() {
    if(game.rollsRemain > 0) {
      changeDiceImages();
      game.rollsRemain--;
      $("#rolls-remain").html(game.rollsRemain);
    }
  });

  $(".dice").on("click", function(event) {
    changeDiceOpacity();
    // game.keepDice() <-- but how to write the dice value?
  });

});

  // if the keptDice corresponds to a combination:
  // the corresponding chip "brightens"

  // when player clicks on a chip to take it:
  // check to see if it is an eligible combination.
  // [or we limit the chips that are clickable to the ones that are eligible?]
  // if it is,
  // the chip count in game goes down,
  // call the player.takechip function

  // when a stack is all taken, the chip image is hidden

  // when no chips are left in the rack, then the game finishes:

  // banner to say game over with buttons to ask player whether play again
