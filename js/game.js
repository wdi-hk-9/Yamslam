// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
'use strict';

 var Game = function() {
  this.dice1 = 6;
  this.dice2 = 6;
  this.dice3 = 6;
  this.dice4 = 6;
  this.dice5 = 6;

  this.TWOPAIRPTS = 5;
  this.THREEOFAKINDPTS = 10;
  this.SMALLSTRAIGHTPTS = 20;
  this.FLUSHPTS = 25;
  this.FULLHOUSEPTS = 30;
  this.FOUROFAKINDPTS = 40;
  this.LARGESTRAIGHTPTS = 50;
 }

// Function to roll dice
Game.prototype.rollDice = function() {
  this.dice1 = Math.floor((Math.random() * 6)+1);
  this.dice2 = Math.floor((Math.random() * 6)+1);
  this.dice3 = Math.floor((Math.random() * 6)+1);
  this.dice4 = Math.floor((Math.random() * 6)+1);
  this.dice5 = Math.floor((Math.random() * 6)+1);
}