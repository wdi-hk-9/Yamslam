// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
'use strict';

 var Game = function() {
// not sure I completely get this...
  this.dices      = [1,2,3,4,5];
  this.activeDice = [1,2,3,4,5];
  this.keptDice   = [];

  this.MAXROLLS = 3;
  this.rollsRemain = this.MAXROLLS;

  this.POINTS = {
    "TWOPAIRPTS"       : 5,
    "THREEOFAKINDPTS"  : 10,
    "SMALLSTRAIGHTPTS" : 20,
    "FLUSHPTS"         : 25,
    "FULLHOUSEPTS"     : 30,
    "FOUROFAKINDPTS"   : 40,
    "LARGESTRAIGHTPTS" : 50
  };

  this.p1 = {
    "TwoPairs"      : 0,
    "ThreeOfAKind"  : 0,
    "SmallStraight" : 0,
    "Flush"         : 0,
    "FullHouse"     : 0,
    "FourOfAKind"   : 0,
    "LargeStraight" : 0
  };

  this.p2 = {
    "TwoPairs"      : 0,
    "ThreeOfAKind"  : 0,
    "SmallStraight" : 0,
    "Flush"         : 0,
    "FullHouse"     : 0,
    "FourOfAKind"   : 0,
    "LargeStraight" : 0
  };
}

// Function to roll dice
Game.prototype.rollDice = function() {
  return Math.floor((Math.random() * 6)+1);
}

// Function to push dice element into array of active dice
Game.prototype.setActive = function(elem) {
  this.activeDice.push(elem);
}

// Function to push dice element into array of kept dice
Game.prototype.setKept = function(elem) {
  this.keptDice.push(elem);
}



