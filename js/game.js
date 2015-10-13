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

// Function to check Two Pair [a,a,b,b,c] or [a,a,b,c,c] or [a,b,b,c,c] in sorted array
Game.prototype.isTwoPair = function() {
  var sorted = this.keptDice.sort();
  if (sorted[0] == sorted[1] && sorted[2] == sorted[3]) {
    return true;
  }
  else if(sorted[1] == sorted[2] && sorted[3] == sorted[4]) {
    return true;
  }
  else if(sorted[0] == sorted[1] && sorted[3] == sorted[4]) {
    return true;
  }
  else {
    return false;
  }
};

// Function to check 3 Of A Kind [a,a,a,b,c] or [a,b,b,b,c] or [a,b,c,c,c] in sorted array
Game.prototype.isThree = function() {
  var sorted = this.keptDice.sort();
  if (sorted[0] == sorted[1] && sorted[1] == sorted[2]) {
    return true;
  }
  else if(sorted[1] == sorted[2] && sorted[2] == sorted[3]) {
    return true;
  }
  else if(sorted[2] == sorted[3] && sorted[3] == sorted[4]) {
    return true;
  }
  else {
    return false;
  }
};

// Function to check Small Straight (four consecutive numbers)
Game.prototype.isSmall = function() {
  var sorted = this.keptDice.sort(function(a, b) {
    return a - b;
  });
  if (sorted[0] == sorted[1] - 1 && sorted[1] == sorted[2] - 1 && sorted[2] == sorted[3] - 1) {
    return true;
  }
  else if (sorted[1] == sorted[2] - 1 && sorted[2] == sorted[3] - 1 && sorted[3] == sorted[4] - 1) {
    return true;
  }
  else {
    return false;
  }
};

// Function to check Full House [a,a,a,b,b] or [a,a,b,b,b] in sorted array
Game.prototype.isFull = function() {
  var sorted = this.keptDice.sort();
  if (sorted[0] == sorted[1] && sorted[1] == sorted[2] && sorted[3] == sorted[4]) {
    console.log("Full - A");
    return true;
  }
  else if(sorted[0] == sorted[1] && sorted[2] == sorted[3] && sorted[3] == sorted[4]) {
    console.log("Full - B");
    return true;
  }
  else {
    console.log("No Full")
    return false;
  }
};

// Function to check 4 Of A Kind [a,a,a,a,b] or [a,b,b,b,b] in sorted array
Game.prototype.isFour = function() {
  var sorted = this.keptDice.sort();
  if (sorted[0] == sorted[1] && sorted[1] == sorted[2] && sorted[2] == sorted[3]) {
    return true;
  }
  else if(sorted[1] == sorted[2] && sorted[2] == sorted[3] && sorted[3] == sorted[4]) {
    return true;
  }
  else {
    return false;
  }
};

// Function to check Large Straight (five consecutive numbers)
Game.prototype.isLarge = function() {
  var sorted = this.keptDice.sort(function(a, b) {
    return a - b;
  });
  if (sorted[0] == sorted[1] - 1 && sorted[1] == sorted[2] - 1 && sorted[2] == sorted[3] - 1 && sorted[3] == sorted[4] - 1) {
    return true;
  }
  else {
    return false;
  }
};

// Function to check Yamslam (all dice show same face)
Game.prototype.isYamslam = function() {
  if (this.keptDice.length == 5) {
    for (var i = 0; i < this.keptDice.length - 1; i++) {
      if (this.keptDice[i] != this.keptDice[i+1]) {
        return false;
      }
      else {
        return true;
      }
    }
  }
  else {
    return false;
  }
};



// To test in console
var game = new Game();
var p1 = new Player();
var p2 = new Player();

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
game.isYamslam();
game.isTwoPair();
game.isThree();
game.isFour();
game.isLarge();
game.isSmall();

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

// Function to check Small Straight (1-2-3-4) or (2-3-4-5) or (3-4-5-6) // to do
// sort by numbers, not string. then if


// Function to check Flush (all are 2, 4, 6) or (all are 1, 3, 5)
// Game.prototype.isFour = function() {
//   var even = function (number) {
//     return number % 2;
//   }
  // either see if every will work - every/even and every/odd

