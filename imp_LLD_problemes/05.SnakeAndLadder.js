//! School Sports Day Ladder Game
//? defination - Game system players ke moves, turns, aur winning condition ko manage karta hai.
//? problem - Agar moves ko fixed tarike se track na karo to game confusing ho jati hai.
//? solution - Game engine players ko turn by turn manage karta hai.

//*! Theory in Hinglish - Socho school sports day ka race. Har student ko turn milta hai aur result track hota hai.
//*! Interview Defination - Game system is a turn-based system that manages players and outcomes.

//? Example - Green Valley School race game

// Wrong code
// class Game {
//   play() {
//     console.log('All players moving together');
//   }
// }

// After fixing the code
class Player {
  constructor(name) {
    this.name = name;
    this.position = 0;
  }
}

class TurnBasedGame {
  constructor(players) {
    this.players = players;
    this.turn = 0;
  }

  movePlayer(steps) {
    const currentPlayer = this.players[this.turn];
    currentPlayer.position += steps;
    this.turn = (this.turn + 1) % this.players.length;
    return `${currentPlayer.name} moved to ${currentPlayer.position}`;
  }
}

const game = new TurnBasedGame([new Player('Aman'), new Player('Riya')]);
console.log(game.movePlayer(3));
console.log(game.movePlayer(4));
