$(document).ready(function() {

  var game = new Game();
  var p1 = new Player(1);
  var p2 = new Player(2);
  var currPlayer = p1;

  // opacity levels for images
  var OPACHALF = 0.5;
  var OPACFULL = 1;
  var OPACMIN = 0.05;
  $(".chip").css("opacity", OPACHALF);

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

  // Player "keeps" dice by clicking on it. Can make active again by clicking again.
  var diceClick = function() {
    $(".dice").on("click", function(event) {
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
      game.printBoard();
    });
  };

  var changeDiceImages = function() {
    game.roll();
    $(".dice-active img").not(".dice-kept").each(function(idx){
      var image = $(this);
        image.attr("src", "images/" + game.activeDice[idx] + "dice.png");
        image.attr("data-value", game.activeDice[idx]);
    });
  };

  $("#ok-btn").on("click", function() {
    $(".dice").off("click");
    changePlayer();
    changeTurnResets();
    $("#roll-btn").attr("disabled", false);
  });

  var changeTurnResets = function() {
    game.resetDice();
    game.resetRolls();
    resetDiceImg();
    $("#rolls-remain").html(game.rollsRemain);
  }
  var changePlayer = function() {
    if (currPlayer === p1) {
      currPlayer = p2;
    }
    else {
      currPlayer = p1;
    }
    $("#player").html(currPlayer.id);
  };

  var resetDiceImg = function() {
    $(".dice").children().removeClass("dice-kept");
    $(".dice-active img").each(function(idx){
      $(this).attr("src", "images/" + game.activeDice[idx] + "dice.png");
      $(this).attr("data-value", game.activeDice[idx]);
    });
    $(".dice").css("opacity", OPACFULL);
  };

  var updateScoreboard = function() {
      $("#p1-score").html(p1.score);
      $("#p1-twoPair").html(p1.twoPair);
      $("#p1-three").html(p1.three);
      $("#p1-small").html(p1.small);
      $("#p1-flush").html(p1.flush);
      $("#p1-full").html(p1.full);
      $("#p1-four").html(p1.four);
      $("#p1-large").html(p1.large);

      $("#p2-score").html(p2.score);
      $("#p2-twoPair").html(p2.twoPair);
      $("#p2-three").html(p2.three);
      $("#p2-small").html(p2.small);
      $("#p2-flush").html(p2.flush);
      $("#p2-full").html(p2.full);
      $("#p2-four").html(p2.four);
      $("#p2-large").html(p2.large);
  };

  var checkGameOver = function() {
    if (game.allChipsGone()) {
      $("#modal-p1-score").html(p1.score);
      $("#modal-p2-score").html(p2.score);
      $("#gameOverModal").modal("show");
      $("modal-yes").on("click", resetGame());
    }
  };

  var resetGame = function() {
    currPlayer = p1;
    $(".chip").css("opacity", OPACHALF);
    game.resetDice();
    game.resetRolls();
    $("#rolls-remain").html(game.rollsRemain);
  }

//-------------------------------------------------------------
// Functions to check dice vs combinations, take chip, update scores (not DRY)
//-------------------------------------------------------------
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
  var afterTakeChip = function() {
    updateScoreboard();
    checkGameOver();
    $("#roll-btn").attr("disabled", true);
    if($(".chip").not(".chip-gone")) {
      $(".chip").css("opacity", OPACHALF).off("click");
    }
  };

  var chipTwoPair = function() {
    currPlayer.takeTwoPair();
    game.twoPairChips--;
    afterTakeChip();
    if (game.twoPairChips == 0) {
      $("#chipTwoPair").css("opacity", OPACMIN).addClass("chip-gone");
    }
  };

  var chipThree = function() {
    currPlayer.takeThree();
    game.threeChips--;
    afterTakeChip();
    // updateScoreboard();
    // checkGameOver();
    // changePlayer();
    // $(".chip").css("opacity", OPACHALF).off("click");
    if (game.threeChips == 0) {
      $("#chipThree").css("opacity", OPACMIN).addClass("chip-gone");
    }
  };

  var chipSmall = function() {
    currPlayer.takeSmall();
    game.smallChips--;
    updateScoreboard();
    checkGameOver();
    changePlayer();
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
    changePlayer();
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
    changePlayer();
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
    changePlayer();
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
    changePlayer();
    changePlayer();
    $(".chip").css("opacity", OPACHALF).off("click");
    if (game.largeChips == 0) {
      $("#chipLarge").css("opacity", OPACMIN);
    }
  };
//-------------------------------------------------------------

});