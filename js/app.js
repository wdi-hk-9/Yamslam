$(document).ready(function() {

  var game = new Game();
  var p1 = new Player(1);
  var p2 = new Player(2);

  var currPlayer = p1;

  // opacity of chips
  var chipBase = 0.5;
  var chipElig = 1;
  var chipGone = 0.05;
  $(".chip").css("opacity", chipBase).off("click");

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
    if (game.isTwoPair()) {
      if (game.twoPairChips > 0) {
        $("#chipTwoPair").css("opacity", chipElig).on("click", function() {
          currPlayer.takeTwoPair(); // HARD-CODED... FIX**
          game.twoPairChips--;
          console.log("TWO PAIR CHIPS LEFT: " + game.twoPairChips);
          console.log("ALL CHIPS LEFT: " + game.allChipsGone());
          scoreboard();
          gameOver();
          $("#chipTwoPair").css("opacity", chipBase);
         });
      }
    }
    if (game.isThree() && game.threeChips > 0) {
      $("#chipThree").css("opacity", chipElig).on("click", function() {
        currPlayer.takeThree(); // HARD-CODED... FIX**
        game.threeChips--;
        console.log("THREE OF A KIND CHIPS LEFT: " + game.threeChips);
        console.log("ALL CHIPS LEFT: " + game.allChipsGone());
        scoreboard();
        gameOver();
        $("#chipThree").css("opacity", chipBase);
       });
    }
    if (game.isSmall()) {
      if (game.smallChips > 0) {
        $("#chipSmall").css("opacity", chipElig).on("click", function() {
          p1.takeSmall(); // HARD-CODED... FIX**
          scoreboard();
          gameOver();
          game.smallChips--;
          $("#chipSmall").css("opacity", chipBase);
         });
      }
    }
    if (game.isFlush()) {
      if (game.flushChips > 0) {
        $("#chipFlush").css("opacity", chipElig).on("click", function() {
          p1.takeFlush(); // HARD-CODED... FIX**
          scoreboard();
          gameOver();
          game.flushChips--;
          $("#chipFlush").css("opacity", chipBase);
         });
      }
    }
    if (game.isFull()) {
      if (game.fullChips > 0) {
        $("#chipFull").css("opacity", chipElig).on("click", function() {
          p1.takeFull(); // HARD-CODED... FIX**
          scoreboard();
          gameOver();
          game.fullChips--;
          $("#chipFull").css("opacity", chipBase);
         });
      }
    }
    if (game.isFour()) {
      if (game.fourChips > 0) {
        $("#chipFour").css("opacity", chipElig).on("click", function() {
          p1.takeFour(); // HARD-CODED... FIX**
          scoreboard();
          gameOver();
          game.fourChips--;
          $("#chipFour").css("opacity", chipBase);
         });
      }
    }
    if (game.isLarge()) {
      if (game.largeChips > 0) {
        $("#chipLarge").css("opacity", chipElig).on("click", function() {
          p1.takeLarge(); // HARD-CODED... FIX**
          scoreboard();
          gameOver();
          game.largeChips--;
          $("#chipLarge").css("opacity", chipBase);
         });
      }
    }
    // if (game.isYamslam()) {
    //     $(".chip").css("opacity", chipElig).on("click", function() {
    //       p1.[takechip](); // HARD-CODED... FIX**
    //       scoreboard();
    //       gameOver();
    //       game.[the chip that was taken decrements]--;
    //       $(".chip").css("opacity", chipBase);
    //      });
    // }
  };

  var changePlayer = function() {
    if (currPlayer === p1) {
      currPlayer = p2;
    }
    else {
      currPlayer = p1;
    }
    console.log(currPlayer);
    $("#player").html(currPlayer.id);
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
    console.log(currPlayer);
    changePlayer();
    // reset dice and rolls remaining
    game.resetDiceRolls();
    resetDiceImgAttr();
    $("#rolls-remain").html(game.rollsRemain);
    $(".chip").css("opacity", chipBase)
  });

  var scoreboard = function() {
    $("#p1-score").html(p1.score);
    $("#p1-twoPair").html(p1.twoPair);
    $("#p1-three").html(p1.three);
    $("#p1-small").html(p1.small);
    $("#p1-flush").html(p1.flush);
    $("#p1-full").html(p1.full);
    $("#p1-four").html(p1.four);
    $("#p1-large").html(p1.large);
  };

  var gameOver = function() {

    if (game.allChipsGone()) {
      console.log("game over");
      alert("Game Over. P1's Score: " + p1.score +". P2's Score: " + p2.score + ". The winner is X." );
    }
  };


});


  // Game ends:
  // when no chips are left in the rack
  // add up chip totals and bonuses, show score and "Player x won!"
  // ask play again? with buttons
  // if yes, reset board
