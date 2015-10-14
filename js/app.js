$(document).ready(function() {

  var game = new Game();
  var p1 = new Player(1);
  var p2 = new Player(2);

  var currPlayer = p1;

  // opacity levels for images
  var OPACHALF = 0.5;
  var OPACFULL = 1;
  var OPACMIN = 0.05;
  $(".chip").css("opacity", OPACHALF).off("click");

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

  var checkCombo = function() {
    if (game.isTwoPair() && game.twoPairChips > 0) {
      $("#chipTwoPair").css("opacity", OPACFULL).on("click", function() {
        currPlayer.takeTwoPair();
        game.twoPairChips--;
        updateScoreboard();
        checkGameOver();
        $("#chipTwoPair").css("opacity", OPACHALF);
      });
    }
    if (game.isThree() && game.threeChips > 0) {
      $("#chipThree").css("opacity", OPACFULL).on("click", function() {
        currPlayer.takeThree();
        game.threeChips--;
        updateScoreboard();
        checkGameOver();
        $("#chipThree").css("opacity", OPACHALF);
      });
    }
    if (game.isSmall() && game.smallChips > 0) {
      $("#chipSmall").css("opacity", OPACFULL).on("click", function() {
        currPlayer.takeSmall();
        updateScoreboard();
        checkGameOver();
        game.smallChips--;
        $("#chipSmall").css("opacity", OPACHALF);
      });
    }
    if (game.isFlush() && game.flushChips > 0) {
      $("#chipFlush").css("opacity", OPACFULL).on("click", function() {
        currPlayer.takeFlush();
        updateScoreboard();
        checkGameOver();
        game.flushChips--;
        $("#chipFlush").css("opacity", OPACHALF);
      });
    }
    if (game.isFull() && game.fullChips > 0) {
      $("#chipFull").css("opacity", OPACFULL).on("click", function() {
        currPlayer.takeFull();
        updateScoreboard();
        checkGameOver();
        game.fullChips--;
        $("#chipFull").css("opacity", OPACHALF);
      });
    }
    if (game.isFour() && game.fourChips > 0) {
      $("#chipFour").css("opacity", OPACFULL).on("click", function() {
        currPlayer.takeFour();
        updateScoreboard();
        checkGameOver();
        game.fourChips--;
        $("#chipFour").css("opacity", OPACHALF);
      });
    }
    if (game.isLarge() && game.largeChips > 0) {
      $("#chipLarge").css("opacity", OPACFULL).on("click", function() {
        currPlayer.takeLarge();
        updateScoreboard();
        checkGameOver();
        game.largeChips--;
        $("#chipLarge").css("opacity", OPACHALF);
      });
    }
    // if (game.isYamslam()) {
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
    $(".chip").css("opacity", OPACHALF)
  });

  var updateScoreboard = function() {
    $("#p1-score").html(p1.score);
    $("#p1-twoPair").html(p1.twoPair);
    $("#p1-three").html(p1.three);
    $("#p1-small").html(p1.small);
    $("#p1-flush").html(p1.flush);
    $("#p1-full").html(p1.full);
    $("#p1-four").html(p1.four);
    $("#p1-large").html(p1.large);
  };

  // var checkWinner = function () {
  //   if (p1.score > p2.score) {
  //     winner = p1;
  //   }
  //   else if (p1.score < p2.score) {
  //     winner = p2;
  //   }
  //   else {
  //     winner = "tied";
  //   }
  // };

  var checkGameOver = function() {
    if (game.allChipsGone()) {
      console.log("game over");
      alert("Game Over. P1's Score: " + p1.score +". P2's Score: " + p2.score + ". The winner is X. Do you want to play again?");
      // does this work for a tie?
    }
  };


});

// YAMSLAM - what to do if get Yamslam