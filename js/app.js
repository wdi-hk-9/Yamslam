$(document).ready(function() {

  var game = new Game();
  var p1 = new Player(1);
  var p2 = new Player(2);

  var currPlayer = p1;
  var winner = null;

  // opacity levels for images
  var OPACHALF = 0.5;
  var OPACFULL = 1;
  var OPACMIN = 0.05;

  var startTurn = function() {
    if (($(".chip").css("opacity") != OPACMIN)) {
      $(".chip").css("opacity", OPACHALF).off("click");
    }
  };

  startTurn(); // gone chips come back to .5 opacity

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
        game.printBoard();
      var dice = $(this);
      var value = parseInt(dice.children().attr('data-value'));
      if (dice.css("opacity") == OPACFULL) {
        dice.css("opacity", OPACHALF);
        dice.children().addClass("dice-kept");
        game.keepDice(value);
        checkCombo();
      } else {
        dice.css("opacity", OPACFULL);
        game.unkeepDice(value);
      }
    });
  };

  $("#ok-btn").on("click", function() {
    $(".dice").off("click");
    console.log(currPlayer);
    changePlayer();
    // reset dice and rolls remaining
    game.resetDiceRolls();
    resetDiceImgAttr();
    $("#rolls-remain").html(game.rollsRemain);
    $(".chip").css("opacity", OPACHALF)
  });

//-----------------------------------------------------------------------------
// Functions to check dice vs combinations, take chip, update scores (not DRY)
//-----------------------------------------------------------------------------
  var checkCombo = function() {
    if (game.isTwoPair() && game.twoPairChips > 0) {
      $("#chipTwoPair").css("opacity", OPACFULL).on("click", function() {
        chipTwoPair();
      });
    }
    if (game.isThree() && game.threeChips > 0) {
      $("#chipThree").css("opacity", OPACFULL).on("click", function() {
        chipThree();
      });
    }
    if (game.isSmall() && game.smallChips > 0) {
      $("#chipSmall").css("opacity", OPACFULL).on("click", function() {
        chipSmall();
      });
    }
    if (game.isFlush() && game.flushChips > 0) {
      $("#chipFlush").css("opacity", OPACFULL).on("click", function() {
        chipFlush();
      });
    }
    if (game.isFull() && game.fullChips > 0) {
      $("#chipFull").css("opacity", OPACFULL).on("click", function() {
        chipFull();
      });
    }
    if (game.isFour() && game.fourChips > 0) {
      $("#chipFour").css("opacity", OPACFULL).on("click", function() {
        chipFour();
      });
    }
    if (game.isLarge() && game.largeChips > 0) {
      $("#chipLarge").css("opacity", OPACFULL).on("click", function() {
        chipLarge();
      });
    }
    if (game.isYamslam() && game.twoPairChips > 0) {
      $("#chipTwoPair").css("opacity", OPACFULL).on("click", function() {
        chipTwoPair();
        currPlayer.score += 50;
        updateScoreboard();
      })
    }
    if (game.isYamslam() && threeChips > 0) {
      $("#chipThree").css("opacity", OPACFULL).on("click", function() {
        chipThree();
        currPlayer.score += 50;
        updateScoreboard();
      })
    }
    if (game.isYamslam() && smallChips > 0) {
      $("#chipSmall").css("opacity", OPACFULL).on("click", function() {
        chipSmall();
        currPlayer.score += 50;
        updateScoreboard();
      })
    }
    if (game.isYamslam() && flushChips > 0) {
      $("#chipFlush").css("opacity", OPACFULL).on("click", function() {
        chipFlush();
        currPlayer.score += 50;
        updateScoreboard();
      })
    }
    if (game.isYamslam() && fullChips > 0) {
      $("#chipFull").css("opacity", OPACFULL).on("click", function() {
        chipFull();
        currPlayer.score += 50;
        updateScoreboard();
      })
    }
    if (game.isYamslam() && fourChips > 0) {
      $("#chipFour").css("opacity", OPACFULL).on("click", function() {
        chipFour();
        currPlayer.score += 50;
        updateScoreboard();
      })
    }
    if (game.isYamslam() && largeChips > 0) {
      $("#chipLarge").css("opacity", OPACFULL).on("click", function() {
        chipLarge();
        currPlayer.score += 50;
        updateScoreboard();
      })
    }
  };

  var chipTwoPair = function() {
    currPlayer.takeTwoPair();
    game.twoPairChips--;
    updateScoreboard();
    checkGameOver();
    $(".chip").css("opacity", OPACHALF).off("click");
    if (game.twoPairChips == 0) {
      $("#chipTwoPair").css("opacity", OPACMIN);
    }
  };

  var chipThree = function() {
    currPlayer.takeThree();
    game.threeChips--;
    updateScoreboard();
    checkGameOver();
    $(".chip").css("opacity", OPACHALF).off("click");
    if (game.threeChips == 0) {
      $("#chipThree").css("opacity", OPACMIN);
    }
  };

  var chipSmall = function() {
    currPlayer.takeSmall();
    game.smallChips--;
    updateScoreboard();
    checkGameOver();
    $(".chip").css("opacity", OPACHALF).off("click");
    if (game.smallChips == 0) {
      $("#chipSmall").css("opacity", OPACMIN);
    }
  };

  var chipFlush = function() {
    currPlayer.takeFlush();
    game.flushChips--;
    updateScoreboard();
    checkGameOver();
    $(".chip").css("opacity", OPACHALF).off("click");
    if (game.flushChips == 0) {
      $("#chipFlush").css("opacity", OPACMIN);
    }
  };

  var chipFull = function() {
    currPlayer.takeFull();
    game.fullChips--;
    updateScoreboard();
    checkGameOver();
    $(".chip").css("opacity", OPACHALF).off("click");
    if (game.fullChips == 0) {
      $("#chipFull").css("opacity", OPACMIN);
    }
  };

  var chipFour = function() {
    currPlayer.takeFour();
    game.fourChips--;
    updateScoreboard();
    checkGameOver();
    $(".chip").css("opacity", OPACHALF).off("click");
    if (game.fourChips == 0) {
      $("#chipFour").css("opacity", OPACMIN);
    }
  };

  var chipLarge = function() {
    currPlayer.takeLarge();
    game.largeChips--;
    updateScoreboard();
    checkGameOver();
    $(".chip").css("opacity", OPACHALF).off("click");
    if (game.largeChips == 0) {
      $("#chipLarge").css("opacity", OPACMIN);
    }
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
//--------------------------------------------------------------------------

  var resetDiceImgAttr = function() {
    $(".dice").children().removeClass("dice-kept");
    $(".dice-active img").each(function(idx){
      $(this).attr("src", "images/" + game.activeDice[idx] + "dice.png");
      $(this).attr("data-value", game.activeDice[idx]);
    });
    $(".dice").css("opacity", "1");
    }

  var updateScoreboard = function() {
    if (currPlayer === p1) {
      $("#p1-score").html(currPlayer.score);
      $("#p1-twoPair").html(currPlayer.twoPair);
      $("#p1-three").html(currPlayer.three);
      $("#p1-small").html(currPlayer.small);
      $("#p1-flush").html(currPlayer.flush);
      $("#p1-full").html(currPlayer.full);
      $("#p1-four").html(currPlayer.four);
      $("#p1-large").html(currPlayer.large);
    }
    else {
      $("#p2-score").html(currPlayer.score);
      $("#p2-twoPair").html(currPlayer.twoPair);
      $("#p2-three").html(currPlayer.three);
      $("#p2-small").html(currPlayer.small);
      $("#p2-flush").html(currPlayer.flush);
      $("#p2-full").html(currPlayer.full);
      $("#p2-four").html(currPlayer.four);
      $("#p2-large").html(currPlayer.large);
    }
  };

  var checkWinner = function () {
    if (p1.score > p2.score) {
      winner = p1;
    }
    else if (p1.score < p2.score) {
      winner = p2;
    }
    else {
      winner = null;
    }
  };

  var checkGameOver = function() {
    if (game.allChipsGone()) {
      if (winner != null) {
        alert("Game Over. P1's Score: " + p1.score +". P2's Score: " + p2.score + ". The winner is " + winner + ". Play again?");
      }
      else {
        alert("Game Over. P1's Score: " + p1.score +". P2's Score: " + p2.score + ". It is a tie. Play again?")
      }
    }
  };
});

// YAMSLAM - what to do if get Yamslam