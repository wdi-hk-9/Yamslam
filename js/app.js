$(document).ready(function() {

  var game = new Game();
  var p1 = new Player();
  var p2 = new Player();

  var changeDiceImages = function() {
    game.roll();
    $(".dice-active img").each(function(idx){
      $(this).attr("src", "images/" + game.activeDice[idx] + "dice.png");
      $(this).attr("data-value", game.activeDice[idx]);
    });
  };

  $("#roll-btn").on("click", function() {
    if(game.rollsRemain > 0) {
      changeDiceImages();
      game.rollsRemain--;
      $("#rolls-remain").html(game.rollsRemain);
    }
  });

  $(".dice").on("click", function(event) {
    var dice = $(this);
    var value = parseInt(dice.children().attr('data-value'));
    if (dice.css("opacity") === "1") {
      dice.css("opacity", "0.5");
      game.keepDice(value);
    } else {
      dice.css("opacity", "1");
      game.unkeepDice(value);
    }
  });

// change chip opacity based on the following conditions
  // var changeChipOpacity = function() {
  //   if (//chip all taken) {
  //     $(this).css("opacity") === "0.05");
  //   }
  //   else if (//chip available and eligible) {
  //     // once chip has been taken, check whether still available and change opacity
  //     $(this).css("opacity") === "1");
  //   }
  //   else {
  //     $(this).css("opacity") === "0.6");
  //   }
  // };

  $("#chipTwoPair").on("click", function() { // how to code for any chip?
  // check to see if it is an eligible combination.
  // or limit the chips that are clickable to the ones that are eligible?
    if (game.isTwoPair()) {
      if (game.twoPairChips > 0) {
        game.twoPairChips--;
        [p1].takeTwoPair(); // how to code for current player?
      }
    }
  });

  $("#ok-btn").on("click", function() {
    if (game.currPlayer == 1) {
      game.currPlayer == 2;
    }
    else {
      game.currPlayer == 1;
    }
    game.resetDiceRolls();
  });
  // reset game.activeDice and game.keptDice
  // change "It's Player 1's Turn"
  // reset shown dice

  // Game ends:
  // when no chips are left in the rack
  // add up chip totals, show score and "Player x won!"
  // ask play again? with buttons
  // if yes, reset board


});