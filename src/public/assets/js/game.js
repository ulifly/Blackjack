
//TODO add win loss and draw counters and display them on the screen
//TODO change take card order to player, dealer backward, player, dealer
//TODO add advanced game rules logic (natural 21, split, double down, surrender, insurance)
//TODO create button and logic to logout from server
//TODO reset points when a new game starts

//Todo change the buttons to nicer ones
//TODO add flip card animations and sounds
//TODO add multiplayer functionality (5 players to the table)
//TODO check for player reconnection and continue the game(game session - game state)
//TODO when on play the new player should be able to see the game in progress but not to play until the game is over
//TODO add a chat to the game

// HTML elements
const playerCards = document.querySelector('#player-cards');
const dealerCards = document.querySelector('#dealer-cards');
const newGameButton = document.querySelector('#new-game');
const takeCardButton = document.querySelector('#take-card');
const standButton = document.querySelector('#stand-Button');
const playerPoints = document.querySelector('#playerPoints');
const dealerPoints = document.querySelector('#dealerPoints');
const loginScreen = document.querySelector('#loginScreen');
const gameScreen = document.querySelector('#mainGame');

let turn = 'dealer';

//**  Sockets listeners -----------------------
socket.on('roomFull', data => {
  console.log(data);
})

socket.on('gameSessionLog', playerName => {
  loginScreen.remove();
  setTimeout(() => {
    gameScreen.classList.remove('hidden-content');
  }, 300);
  document.querySelector('#playerN').innerHTML = playerName + " - ";
})

socket.on('takeCardR', (data) => {
  const card = data.card;
  const playerScoreSum = data.playerScoreSum;
  const dealerScoreSum = data.dealerScoreSum;
  playerPoints.innerHTML = playerScoreSum; //TODO change this to a function or not ?
  dealerPoints.innerHTML = dealerScoreSum;
  showCard(card);
})

socket.on('winnerR', (data) => { //!emit winner on console
  data === 'player' ? console.log('You win') : console.log('You lose');
})
//------------------------------------------




//* functions -------------------------------

const logToServer = (playerName) => {
  socket.emit('logToServer', playerName)
}





//* This function starts a new game----------------
const newGame = () => {
  socket.emit('newGame');
  turn = 'firstDealer';
  playerCards.innerHTML = '';
  dealerCards.innerHTML = '';
  takeCard(turn);
  takeCardButton.disabled = false;
  standButton.disabled = false;
  setTimeout(() => {
    turn = 'player';
  }, 500); // Delay to simulate dealer's turn
  newGameButton.disabled = true;
  setTimeout(() => {
    dealerCards.innerHTML += `<img  id="backCard" class = "game-card" src="/Assets/cartas/grey_back.png" alt="card back">`;
  }, 600);
}
//-----------------------------------------------





//* This function takes a card from the deck
const takeCard = (turn) => {
  socket.emit('takeCard', turn);
}
//-----------------------------------------------





//* This function shows the card in the screen
const showCard = (card) => {
  if (turn === 'player') {
    playerCards.innerHTML += `<img class = "game-card" src="/Assets/cartas/${card}.png" alt="card ${card}">`;
  } else {
    dealerCards.innerHTML += `<img class = "game-card" src="/Assets/cartas/${card}.png" alt="card ${card}">`;
  }
}
//-----------------------------------------------

const showLostWin = (data) => {
  
}


const stand = () => {
  turn = 'dealer';
  dealerCards.removeChild(document.getElementById('backCard'));
  takeCard(turn);
  newGameButton.disabled = false;
}
document.getElementById('game-login').addEventListener('submit', function (event) {
  event.preventDefault();

  //obtain name from the form
  const playerName = document.getElementById('playerName').value;
  logToServer(playerName);
})


//*init game-----------
takeCardButton.disabled = true;
standButton.disabled = true;
newGameButton.addEventListener('click', () => {
  newGame();
});
//---------------------

//*  listens to the event of the button and call the function to take a card
takeCardButton.addEventListener('click', () => {
  playerCard = takeCard(turn);


  // if (playerScoreSum > 21) { //TODO change this to wait for the dealer to play and add validations and remove console.logs
  //   console.log('You lose');
  //   takeCardButton.disabled = true;
  //   dealerTurn();
  // } else if (playerScoreSum === 21) {
  //   console.log('You win');
  //   takeCardButton.disabled = true;
  //   dealerTurn();
  // }
  // // playerScoreSum === 21 ? console.log('You win') 
  // // : playerScoreSum > 21 ? console.log('You lose'): null;

});

//* listens to the event of the button stand and call the function to take the dealer turn

standButton.addEventListener('click', () => {
  takeCardButton.disabled = true;
  standButton.disabled = true;
  stand();

  // if (dealerScoreSum > 21 || dealerScoreSum < playerScoreSum ) {
  //   console.log('You win');
  //   console.log({dealerScoreSum, playerScoreSum});
  // } else if (dealerScoreSum === playerScoreSum) {
  //   console.log('It is a draw');
  // } else {
  //   console.log('You lose');
  // }

  // // dealerScoreSum > 21 || dealerScoreSum < playerScoreSum ? console.log('You win') 
  // // : dealerScoreSum === playerScoreSum ? console.log('It is a draw') : console.log('You lose');
});

