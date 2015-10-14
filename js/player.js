var Player = function() {
  this.score   = 0;
  this.twoPair = 0;
  this.three   = 0;
  this.small   = 0;
  this.flush   = 0;
  this.full    = 0;
  this.four    = 0;
  this.large   = 0;
};

Player.prototype.resetPlayer = function() {
  this.score   = 0;
  this.twoPair = 0;
  this.three   = 0;
  this.small   = 0;
  this.flush   = 0;
  this.full    = 0;
  this.four    = 0;
  this.large   = 0;
};

//-----------------------------------------
// Functions for player taking a chip
//-----------------------------------------

Player.prototype.takeTwoPair = function() {
  this.twoPair += 1;
  this.score   += 5;
};

Player.prototype.takeThree = function() {
  this.three += 1;
  this.score += 10;
};

Player.prototype.takeSmall = function() {
  this.small += 1;
  this.score += 20;
};

Player.prototype.takeFlush = function() {
  this.flush += 1;
  this.score += 25;
};

Player.prototype.takeFull = function() {
  this.full  += 1;
  this.score += 30;
};

Player.prototype.takeFour = function() {
  this.four  += 1;
  this.score += 40;
};

Player.prototype.takeLarge = function() {
  this.large += 1;
  this.score += 50;
};

// Do this later as it follows different rules
// Player.prototype.yamslam = function() {
//   this.twoPair += 1
// }
