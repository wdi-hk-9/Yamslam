// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
'use strict';

 var Game = function() {
  this.dice1;
  this.dice2;
  this.dice3;
  this.dice4;
  this.dice5;

  this.activeDice = [];
  this.keptDice = [];

  this.TWOPAIRPTS = 5;
  this.THREEOFAKINDPTS = 10;
  this.SMALLSTRAIGHTPTS = 20;
  this.FLUSHPTS = 25;
  this.FULLHOUSEPTS = 30;
  this.FOUROFAKINDPTS = 40;
  this.LARGESTRAIGHTPTS = 50;

  this.p1TwoPairs;
  this.p1ThreeOfAKind;
  this.p1SmallStraight;
  this.p1Flush;
  this.p1FullHouse;
  this.p1FourOfAKind;
  this.p1LargeStraight;
 }

// Function to roll dice
Game.prototype.rollDice = function() {
  this.dice1 = Math.floor((Math.random() * 6)+1);
  this.dice2 = Math.floor((Math.random() * 6)+1);
  this.dice3 = Math.floor((Math.random() * 6)+1);
  this.dice4 = Math.floor((Math.random() * 6)+1);
  this.dice5 = Math.floor((Math.random() * 6)+1);
}

// Function to push dice element into array of active dice
Game.prototype.setActive = function(elem) {
  this.activeDice.push(elem);
}

// Function to push dice element into array of kept dice
Game.prototype.setKept = function(elem) {
  this.keptDice.push(elem);
}

// Function to change dice image (pass through game.dice1 or game.dice2 or ..., etc)
Game.prototype.changeDiceImage = function(elem) {
  switch(elem) {
    case 1:
      $("#dice1Image").attr("src", "images/1dice.png");
      break;
    case 2:
      $("#dice1Image").attr("src", "images/2dice.png");
      break;
    case 3:
      $("#dice1Image").attr("src", "images/3dice.png");
      break;
    case 4:
      $("#dice1Image").attr("src", "images/4dice.png");
      break;
    case 5:
      $("#dice1Image").attr("src", "images/5dice.png");
      break;
    case 6:
      $("#dice1Image").attr("src", "images/6dice.png");
      break;
    default:
      console.log("CHECK")
  }
}