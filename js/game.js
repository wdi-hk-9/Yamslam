// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
'use strict';

var Game = function() {
  this.activeDice = [0,0,0,0,0];
  this.keptDice   = [];
}

// Function to roll all the active dices
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

Game.prototype.printBoard = function() {
  console.log("ACTIVE: " + this.activeDice);
  console.log(" KEPT:  " + this.keptDice);
}

var game = new Game();
console.log("### GAME STARTED");
game.roll();
game.printBoard();
console.log("### KEEP FIRST ACTIVE DICE");
game.keepDice(game.activeDice[0]);
game.printBoard();
console.log("### ROLL")
game.roll();
game.printBoard();
console.log("### KEEP FIRST ACTIVE DICE");
game.keepDice(game.activeDice[0]);
game.printBoard();
console.log("### UNKEEP FIRST KEPT DICE");
game.unkeepDice(game.keptDice[0]);
game.printBoard();
console.log("### ROLL")
game.roll();
game.printBoard();
console.log("** KEEP FIRST ACTIVE DICE");
game.keepDice(game.activeDice[0]);
game.printBoard();

  // this.MAXROLLS = 3;
  // this.rollsRemain = this.MAXROLLS;

  // this.POINTS = {
  //   "TWOPAIRPTS"       : 5,
  //   "THREEOFAKINDPTS"  : 10,
  //   "SMALLSTRAIGHTPTS" : 20,
  //   "FLUSHPTS"         : 25,
  //   "FULLHOUSEPTS"     : 30,
  //   "FOUROFAKINDPTS"   : 40,
  //   "LARGESTRAIGHTPTS" : 50
  // };

  // this.p1 = {
  //   "TwoPairs"      : 0,
  //   "ThreeOfAKind"  : 0,
  //   "SmallStraight" : 0,
  //   "Flush"         : 0,
  //   "FullHouse"     : 0,
  //   "FourOfAKind"   : 0,
  //   "LargeStraight" : 0
  // };

  // this.p2 = {
  //   "TwoPairs"      : 0,
  //   "ThreeOfAKind"  : 0,
  //   "SmallStraight" : 0,
  //   "Flush"         : 0,
  //   "FullHouse"     : 0,
  //   "FourOfAKind"   : 0,
  //   "LargeStraight" : 0
  // };
