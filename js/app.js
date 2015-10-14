$(document).ready(function() {

  var game = new Game();
  var p1 = new Player();
  var p2 = new Player();

  $(".chip").css("opacity", "0.6");

  var changeDiceImages = function() {
    game.roll();
    $(".dice-active img").not(".dice-kept").each(function(idx){
      var image = $(this);
        image.attr("src", "images/" + game.activeDice[idx] + "dice.png");
        image.attr("data-value", game.activeDice[idx]);
    });
  };

  $("#roll-btn").on("click", function() {
    if (game.rollsRemain > 0) {
      changeDiceImages();
      game.rollsRemain--;
      $("#rolls-remain").html(game.rollsRemain);
      if (game.rollsRemain === 2) {
        diceClick();
      }
    }
  });

  var diceClick = function() {
    $(".dice").on("click", function(event) {
      var dice = $(this);
      var value = parseInt(dice.children().attr('data-value'));
      if (dice.css("opacity") === "1") {
        dice.css("opacity", "0.5");
        dice.children().addClass("dice-kept");
        game.keepDice(value);
        checkCombo();
      } else {
        dice.css("opacity", "1");
        game.unkeepDice(value);
      }
    });
  };

  var checkCombo = function() {
    if (game.isTwoPair) {   // how to code for all chips?
      if (game.twoPairChips > 0) {
        $("#chipTwoPair").css("opacity", "1");
        $("#chipTwoPair").on("click", function() {
          game.currPlayer.takeTwoPair();  // should currPlayer be in Game or Player?
          game.twoPairChips--;
          $("#chipTwoPair").css("opacity", "0.6");
        });
      }
    }
  };

  $("#ok-btn").on("click", function() {
    $(".dice").off("click");
    // change player
    if (game.currPlayer == 1) {
      game.currPlayer = 2;
    }
    else {
      game.currPlayer = 1;
    }
    $("#player").html(game.currPlayer);
    // reset dice and rolls remaining
    game.resetDiceRolls();
    $(".dice-active img").each(function(idx){
      $(this).attr("src", "images/" + game.activeDice[idx] + "dice.png");
      $(this).attr("data-value", game.activeDice[idx]);
    });
    $(".dice").css("opacity", "1");
    $("#rolls-remain").html(game.rollsRemain);
  });

});


  // Game ends:
  // when no chips are left in the rack
  // add up chip totals and bonuses, show score and "Player x won!"
  // ask play again? with buttons
  // if yes, reset board
