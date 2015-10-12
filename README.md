# Yamslam

## Introduction
This is a 2-player dice game that involves strategy. Players take turns to roll 5 dice up to 3 times to get the best combination. There are only 4 chips for each combination, so it's a race to claim a chip before they are gone.

When all 5 dice match, the player has rolled a Yamslam! There’s not a chip for that. Instead the player takes any chip and a bonus turn.

The game ends when all the chips have been claimed. When the game ends, it will display both players' scores and allows you to play again.

## Technologies
- HTML
- CSS
- Bootstrap
- Javascript
- Jquery

## Playing the Game
- `Roll Dice`
  - Click the "ROLL" button to roll the five dice.
  - The player can roll the five dice up to three times to achieve one of the eight combinations
  - After the first and second roll, the player can choose the dice they wish to keep and roll the remaining dice again
  - The player can stop rolling the dice at any time if they achieve a satisfactory combination

- `Claim Chip`
  - There are eight possible types of combinations, seven of which have a corresponding chip. There are only four chips of each kind.
    - 2 Pair (Two pairs of dice showing the same face) - 5 points
    - 3 of a Kind (Three dice showing the same face) - 10 points
    - Small Straight (Four dice with consecutive numbers, e.g. 1, 2, 3, 4) - 20 points
    - Flush (All five dice have the same color) - 25 points
    - Full House (3 of a kind and a pair) - 30 points
    - 4 of a Kind (Four dice showing the same face)- 40 points
    - Large Straight (Five dice with consecutive numbers, e.g. 1, 2, 3, 4, 5) - 50 points
    - Yamslam (Five dice showing the same face) - Take any chip and roll again
  - If any of the three rolls wins a chip, the player may choose to end their turn immediately and collect. If a roll satisfies more than one combination, the player can choose the chip of their choice. The other player then goes.
  - If the dice do not match an available chip, the player does not collect a chip. The other player then goes.

- `Winning the Game`
  - The game ends when the last chip is taken. At the end of the game, the player with the higher score based on the sum of chip totals and any bonuses wins.

## [BONUS] Extra Features
- `Point Bonus`
  - Golden 7 / 50 points
    - Collect one of each chip and get a 50-point bonus

  - Full Stack / 30 points
    - Collect a complete stack of 4 chips and get a 30-point bonus

  - Last Draw / 20 points
    - Take the last chip remaining on the rack and get a 20-point bonus

- `Discard a Chip from the Rack`
  - If during one round, no player collects a chip, discard one chip of the highest value from the rack.

## Display
- `Available Chips`. Available chips are displayed with an adjacent number showing the number of chips of that type remaining.

- `Player Turn`. Alerts whose turn it is, e.g. "Player 1's Turn".

- `Five Dice`. Odd number dice have black pips, even number dice have red pips.

- `Number of Rolls Remaining`. The number is 3 at the start of every turn and decrements by 1 with each roll.

- `Scoreboard`. Shows each player's score and number of each type of chip claimed.

- When the game ends, the following will display:
  -"Game Over" banner
  - Ask "Play again?"
  - Button to choose to play again

> [Original idea] http://www.blueorangegames.com/index.php/games/yamslam