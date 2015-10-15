// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
'use strict';

var Game = function() {
  this.activeDice   = [0,0,0,0,0];
  this.keptDice     = [];

  this.MAXROLLS     = 3;
  this.rollsRemain  = this.MAXROLLS;
//
  this.twoPairChips = 1;
  this.threeChips   = 1;
  this.smallChips   = 0;
  this.flushChips   = 0;
  this.fullChips    = 0;
  this.fourChips    = 0;
  this.largeChips   = 0;
};

Game.prototype.allChipsGone = function() {
  return (this.twoPairChips + this.threeChips + this.smallChips + this.flushChips + this.fullChips + this.fourChips + this.largeChips === 0);
};

// Roll all the active dices
Game.prototype.roll = function() {
  this.activeDice = this.activeDice.map(function(){
    return Math.floor((Math.random() * 6)+1);
  });
};

// game.keepDice(keepVal) <-- dice value 1-6
Game.prototype.keepDice = function(diceVal) {
  var pos = this.activeDice.indexOf(diceVal);
  if (pos != -1) {
    this.keptDice.push(diceVal);
    this.activeDice.splice(pos,1);
  }
};

Game.prototype.unkeepDice = function(diceVal) {
  var pos = this.keptDice.indexOf(diceVal);
  if (pos != -1) {
    this.activeDice.push(diceVal);
    this.keptDice.splice(pos,1);
  }
};

Game.prototype.resetDice = function() {
  this.activeDice   = [1,2,3,4,5];
  this.keptDice     = [];
};

Game.prototype.resetRolls = function() {
  this.rollsRemain  = this.MAXROLLS;
};

Game.prototype.resetGame = function() {
  resetDiceRolls();
  this.twoPairChips = 4;
  this.threeChips   = 4;
  this.smallChips   = 4;
  this.flushChips   = 4;
  this.fullChips    = 4;
  this.fourChips    = 4;
  this.largeChips   = 4;
};

Game.prototype.printBoard = function() {
  console.log("ACTIVE: " + this.activeDice);
  console.log(" KEPT:  " + this.keptDice);
};

//------------------------------------------------
// Functions to check combinations
//------------------------------------------------

// Function to check whether dice match ANY combination
Game.prototype.isCombo = function() {
  if (game.isTwoPair() || game.isThree() || game.isSmall() || game.isFlush() || game.isFull() || game.isFour() || game.isLarge() || game.isYamslam()) {
    console.log("there is a combo");
    return true;
  }
  else {
    return false;
  }
};

// Function to check Two Pair [a,a,b,b,c] or [a,a,b,c,c] or [a,b,b,c,c] in sorted array
Game.prototype.isTwoPair = function() {
  var sorted = this.keptDice.sort();
  if(sorted.length < 4) {
    return false;
  } else {
    return ((sorted[0] === sorted[1] && sorted[2] === sorted[3]) ||
            (sorted[1] === sorted[2] && sorted[3] === sorted[4]) ||
            (sorted[0] === sorted[1] && sorted[3] === sorted[4]));
  }
};


// Function to check 3 Of A Kind [a,a,a,b,c] or [a,b,b,b,c] or [a,b,c,c,c] in sorted array
Game.prototype.isThree = function() {
  var sorted = this.keptDice.sort();
  if(sorted.length < 3) {
    return false;
  } else {
    return ((sorted[0] === sorted[1] && sorted[1] === sorted[2]) ||
            (sorted[1] === sorted[2] && sorted[2] === sorted[3]) ||
            (sorted[2] === sorted[3] && sorted[3] === sorted[4]));
  }
};

// Function to check Small Straight (four consecutive numbers)
Game.prototype.isSmall = function() {
  var sorted = this.keptDice.sort(function(a, b) { return a - b; });

  if(sorted.length < 4) {
    return false;
  }
  else {
    return ((sorted[0] == sorted[1] - 1 && sorted[1] == sorted[2] - 1 && sorted[2] == sorted[3] - 1) ||
            (sorted[1] == sorted[2] - 1 && sorted[2] == sorted[3] - 1 && sorted[3] == sorted[4] - 1));
  }
};

// Function to check Flush [all even numbers] or [all odds]
Game.prototype.isFlush = function() {
  var oddArr = [];
  var evenArr = [];

  for (var i = 0; i < this.keptDice.length; i++) {
    if (this.keptDice[i] % 2 === 1) { oddArr.push( this.keptDice[i]); }
    if (this.keptDice[i] % 2 === 0) { evenArr.push(this.keptDice[i]); }
  }

  if (oddArr.length === 5) {
    return true;
  } else {
    return (evenArr.length === 5);
  }
};

// Function to check Full House [a,a,a,b,b] or [a,a,b,b,b] in sorted array
Game.prototype.isFull = function() {
  var sorted = this.keptDice.sort();
  if(sorted.length < 5) {
    return false;
  }
  else {
  return ((sorted[0] == sorted[1] && sorted[1] == sorted[2] && sorted[3] == sorted[4]) ||
          (sorted[0] == sorted[1] && sorted[2] == sorted[3] && sorted[3] == sorted[4]));
  }
};

// Function to check 4 Of A Kind [a,a,a,a,b] or [a,b,b,b,b] in sorted array
Game.prototype.isFour = function() {
  var sorted = this.keptDice.sort();
  if(sorted.length < 4) {
    return false;
  }
  else {
    return ((sorted[0] == sorted[1] && sorted[1] == sorted[2] && sorted[2] == sorted[3]) ||
            (sorted[1] == sorted[2] && sorted[2] == sorted[3] && sorted[3] == sorted[4]));
  }
};

// Function to check Large Straight (five consecutive numbers)
Game.prototype.isLarge = function() {
  var sorted = this.keptDice.sort(function(a, b) {
    return a - b;
  });
  return (sorted[0] == sorted[1] - 1 && sorted[1] == sorted[2] - 1 &&
          sorted[2] == sorted[3] - 1 && sorted[3] == sorted[4] - 1);
};

// Function to check Yamslam (all dice show same face)
Game.prototype.isYamslam = function() {
  return this.keptDice[0] === this.keptDice[1] === this.keptDice[2] === this.keptDice[3] === this.keptDice[4];
};