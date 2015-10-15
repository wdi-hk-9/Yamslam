$(document).ready(function() {

  var game = new Game();
  var p1 = new Player(1);
  var p2 = new Player(2);
  var currPlayer = p1;

  // opacity levels for images
  var OPACHALF = 1;
  var OPACFULL = 1;
  var OPACMIN = 0.1;
  var DICEOPACHALF = 0.6;
  $(".chip").css("opacity", OPACHALF);

  // transparent color filters for chips
  var transGreen = "linear-gradient(rgba(57, 143, 40, 0.45),rgba(57, 143, 40, 0.45))";
  var transYellow = "linear-gradient(rgba(255, 204, 0, 0.45),rgba(239, 183, 61, 0.45))";

  $("#roll-btn").on("click", function() {
    if (game.rollsRemain > 0) {
      changeDiceImages();
      game.rollsRemain--;
      $("#rolls-remain").html(game.rollsRemain);
      $("#ok-btn").attr("disabled", false);
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
        dice.css("opacity", DICEOPACHALF);
        dice.children().addClass("dice-kept");
        game.keepDice(value);
        checkCombo();
      } else {
        dice.css("opacity", OPACFULL);
        game.unkeepDice(value);
        dice.children().removeClass("dice-kept");
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
    $("#ok-btn").attr("disabled", true);
    $(".chip").not(".chip-gone").css("opacity", OPACHALF).css("background", transYellow).off("click");
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
      $("#gameOverModal").on("show.bs.modal", function (event) {
        $(this).find("#modal-yes").on("click", resetGame());
      });
      $("#gameOverModal").modal("show");

    }
  };

  var resetGame = function() {
    console.log("tafs")
    currPlayer = p1;
    $(".chip").css("opacity", OPACHALF).css("background", transYellow);
    game.resetDice();
    resetDiceImg();
    game.resetRolls();
    $("#rolls-remain").html(game.rollsRemain);
    $("#roll-btn").removeAttr("disabled");
    $('td').html("0");
  }

//-------------------------------------------------------------
// Functions to check dice vs combinations, take chip, update scores (not DRY)
//-------------------------------------------------------------
  var checkCombo = function() {
    if (game.isTwoPair() && game.twoPairChips > 0) {
      $("#chipTwoPair").css("opacity", OPACFULL).css("background", transGreen).on("click", function() {
        chipTwoPair();
      });
    }
    if (game.isThree() && game.threeChips > 0) {
      $("#chipThree").css("opacity", OPACFULL).css("background", transGreen).on("click", function() {
        chipThree();
      });
    }
    if (game.isSmall() && game.smallChips > 0) {
      $("#chipSmall").css("opacity", OPACFULL).css("background", transGreen).on("click", function() {
        chipSmall();
      });
    }
    if (game.isFlush() && game.flushChips > 0) {
      $("#chipFlush").css("opacity", OPACFULL).css("background", transGreen).on("click", function() {
        chipFlush();
      });
    }
    if (game.isFull() && game.fullChips > 0) {
      $("#chipFull").css("opacity", OPACFULL).css("background", transGreen).on("click", function() {
        chipFull();
      });
    }
    if (game.isFour() && game.fourChips > 0) {
      $("#chipFour").css("opacity", OPACFULL).css("background", transGreen).on("click", function() {
        chipFour();
      });
    }
    if (game.isLarge() && game.largeChips > 0) {
      $("#chipLarge").css("opacity", OPACFULL).css("background", transGreen).on("click", function() {
        chipLarge();
      });
    }
    if (game.isYamslam() && game.twoPairChips > 0) {
      $("#chipTwoPair").css("opacity", OPACFULL).css("background", transGreen).on("click", function() {
        chipTwoPair();
        currPlayer.score += 50;
        updateScoreboard();
      })
    }
    if (game.isYamslam() && threeChips > 0) {
      $("#chipThree").css("opacity", OPACFULL).css("background", transGreen).on("click", function() {
        chipThree();
        currPlayer.score += 50;
        updateScoreboard();
      })
    }
    if (game.isYamslam() && smallChips > 0) {
      $("#chipSmall").css("opacity", OPACFULL).css("background", transGreen).on("click", function() {
        chipSmall();
        currPlayer.score += 50;
        updateScoreboard();
      })
    }
    if (game.isYamslam() && flushChips > 0) {
      $("#chipFlush").css("opacity", OPACFULL).css("background", transGreen).on("click", function() {
        chipFlush();
        currPlayer.score += 50;
        updateScoreboard();
      })
    }
    if (game.isYamslam() && fullChips > 0) {
      $("#chipFull").css("opacity", OPACFULL).css("background", transGreen).on("click", function() {
        chipFull();
        currPlayer.score += 50;
        updateScoreboard();
      })
    }
    if (game.isYamslam() && fourChips > 0) {
      $("#chipFour").css("opacity", OPACFULL).css("background", transGreen).on("click", function() {
        chipFour();
        currPlayer.score += 50;
        updateScoreboard();
      })
    }
    if (game.isYamslam() && largeChips > 0) {
      $("#chipLarge").css("opacity", OPACFULL).css("background", transGreen).on("click", function() {
        chipLarge();
        currPlayer.score += 50;
        updateScoreboard();
      })
    }
  };

  var chipTwoPair = function() {
    currPlayer.takeTwoPair();
    game.twoPairChips--;
    if (game.twoPairChips == 0) {
      $("#chipTwoPair").css("opacity", OPACMIN).addClass("chip-gone");
    }
    afterTakeChip();
  };

  var chipThree = function() {
    currPlayer.takeThree();
    game.threeChips--;
    if (game.threeChips == 0) {
      $("#chipThree").css("opacity", OPACMIN).addClass("chip-gone");
    }
    afterTakeChip();
  };

  var chipSmall = function() {
    currPlayer.takeSmall();
    game.smallChips--;
    if (game.smallChips == 0) {
      $("#chipSmall").css("opacity", OPACMIN).addClass("chip-gone");
    }
    afterTakeChip();
  };

  var chipFlush = function() {
    currPlayer.takeFlush();
    game.flushChips--;
    if (game.flushChips == 0) {
      $("#chipFlush").css("opacity", OPACMIN).addClass("chip-gone");
    }
    afterTakeChip();
  };

  var chipFull = function() {
    currPlayer.takeFull();
    game.fullChips--;
    if (game.fullChips == 0) {
      $("#chipFull").css("opacity", OPACMIN).addClass("chip-gone");
    }
    afterTakeChip();
  };

  var chipFour = function() {
    currPlayer.takeFour();
    game.fourChips--;
    if (game.fourChips == 0) {
      $("#chipFour").css("opacity", OPACMIN).addClass("chip-gone");
    }
    afterTakeChip();
  };

  var chipLarge = function() {
    currPlayer.takeLarge();
    game.largeChips--;
    if (game.largeChips == 0) {
      $("#chipLarge").css("opacity", OPACMIN).addClass("chip-gone");
    }
    afterTakeChip();
  };

  var afterTakeChip = function() {
    updateScoreboard();
    checkGameOver();
    $("#roll-btn").attr("disabled", true);
    $(".chip").not(".chip-gone").css("opacity", OPACHALF).off("click");
  };

//-------------------------------------------------------------

});