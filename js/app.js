$(document).ready(function() {

  var game = new Game();
  var p1 = new Player();
  var p2 = new Player();

  var currPlayer = "p1";

  // opacity of chips
  var chipBase = 0.5;
  var chipElig = 1;
  var chipGone = 0.05;
  $(".chip").css("opacity", chipBase);

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
    if (game.isTwoPair()) {   // how to code for all chips?
      if (game.twoPairChips > 0) {
        $("#chipTwoPair").css("opacity", chipElig);
        $("#chipTwoPair").on("click", function() {
        //   currPlayer.takeTwoPair();
           game.twoPairChips--;
           $("#chipTwoPair").css("opacity", chipBase);
         });
      }
    }
  };

  var changePlayer = function() {
    if (currPlayer === "p1") {
      currPlayer = "p2";
    }
    else {
      currPlayer = "p1";
    }
    var playerNum = currPlayer.replace("p","");
    $("#player").html(playerNum);
  }

  var resetDiceImgAttr = function() {
    $(".dice").children().removeClass("dice-kept");
    $(".dice-active img").each(function(idx){
      $(this).attr("src", "images/" + game.activeDice[idx] + "dice.png");
      $(this).attr("data-value", game.activeDice[idx]);
    });
    $(".dice").css("opacity", "1");
    }


  $("#ok-btn").on("click", function() {
    $(".dice").off("click");
    changePlayer();
    // reset dice and rolls remaining
    game.resetDiceRolls();
    resetDiceImgAttr();
    $("#rolls-remain").html(game.rollsRemain);
    $(".chip").css("opacity", chipBase)
  });

});


  // Game ends:
  // when no chips are left in the rack
  // add up chip totals and bonuses, show score and "Player x won!"
  // ask play again? with buttons
  // if yes, reset board
