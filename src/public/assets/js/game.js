
//Todo change the buttons to nicer ones canvas png
//TODO hide players not playing?

//!bankrupt logic (game over)

//TODO add bets and chips to the game

//TODO add advanced game rules logic (natural 21, split, double down, surrender, insurance)
//TODO create button and logic to logout from server

//TODO add a background image to the game
//TODO change winner message for a nicer one
//TODO add multiplayer functionality (3 players to the table)
//TODO when on play the new player should be able to see the game in progress but not to play until the game is over

//TODO add flip card animations and sounds
//TODO check for player reconnection and continue the game(game session - game state)
//TODO add a chat to the game

// HTML elements
const playerCards = document.querySelector('#player-cards');
const dealerCards = document.querySelector('#dealer-cards');
const bankDisplay = document.querySelector('#bank');
const newGameButton = document.querySelector('#new-game');
const takeCardButton = document.querySelector('#take-card');
const standButton = document.querySelector('#stand-Button');
const playerPoints = document.querySelector('#playerPoints');
const dealerPoints = document.querySelector('#dealerPoints');
const loginScreen = document.querySelector('#loginScreen');
const gameScreen = document.querySelector('#mainGame');
const body = document.querySelector('body');
const betInput = document.querySelector('#betN');
const betDisplay = document.querySelector('#bet');


let turn = 'dealer';
let bank = 1500;
let bet = 0;


//**  Sockets listeners -----------------------
socket.on('roomFull', data => {
  console.log(data);
})

socket.on('gameSessionLog', playerName => {
  loginScreen.remove();
  setTimeout(() => {
    gameScreen.classList.remove('hidden-content');
    body.classList.remove('d-flex');
  }, 300);
  document.querySelector('#playerN').innerHTML = playerName + " ";
  //document.querySelector('#playerBank').innerHTML = bank;
})

socket.on('takeCardR', (data) => {
  const card = data.card;
  const playerScoreSum = data.playerScoreSum;
  const dealerScoreSum = data.dealerScoreSum;
  playerPoints.innerHTML = playerScoreSum;
  dealerPoints.innerHTML = dealerScoreSum;
  showCard(card);
})

socket.on('winnerR', (data) => {
  setTimeout(() => {
    showLostWin(data);
    newGameButton.disabled = false;
    takeCardButton.disabled = true;
    standButton.disabled = true;
    console.log(data);
    if (data === 'tie') {
      bank += bet;
    } else if (data === 'blackjack') {
      console.log(bet);
      bank += bet * 2.5;
      console.log(bank);
    } else if (data === 'blackjack1to1') {
      const ask = confirm('aceptas pago 1:1');
      if (ask === true) {
        bank += bet * 2;
        turn = 'dealer';
        takeCard(turn);
      } else {
        stand();//!check to add helper to stand function bet not added
      }
    } else if (data === 'player') {
      bank += bet * 2;
    } else {
      bank += 0;
    }
    bet = 0;
    betDisplay.innerHTML = bet;//!aqui esta el pedo
    bankDisplay.innerHTML = bank;
  }, 500);
})


//------------------------------------------


//* functions -------------------------------

const logToServer = (playerName) => {
  socket.emit('logToServer', playerName)
}


//* This function starts a new game----------------
const newGame = () => {
  socket.emit('newGame');

  playerCards.innerHTML = '';
  dealerCards.innerHTML = '';

  turn = 'player';
  takeCard(turn);

  dealerCards.innerHTML += `<img  id="backCard" class = "game-card" src="/Assets/cartas/grey_back.png" alt="card back">`;

  newGameButton.disabled = true;

  setTimeout(() => {
    turn = 'firstDealer';
    takeCard(turn);
  }, 800);

  setTimeout(() => {
    turn = 'player';
    takeCard(turn);

    setTimeout(() => {
      takeCardButton.disabled = false;
      standButton.disabled = false;
      socket.emit("blackjackEval");
    }, 600);
  }, 1000); // Delay to simulate player's turn

}
//-----------------------------------------------


//* This function takes a card from the deck-----
const takeCard = (turn) => {
  console.log(turn);
  socket.emit('takeCard', turn);
}
//-----------------------------------------------

//* This function shows the card in the screen
const showCard = (card) => {
  if (turn === 'player') {
    playerCards.innerHTML += `<img class = "game-card player-cards" src="/Assets/cartas/${card}.png" alt="card ${card}">`;
  } else {
    dealerCards.innerHTML += `<img class = "game-card" src="/Assets/cartas/${card}.png" alt="card ${card}">`;
  }
}
//-----------------------------------------------

//* This function shows the win or lost message----- 
const showLostWin = (data) => {
  if (data === 'player') {
    playerCards.innerHTML += `<img class = "winnerMessage" src="/assets/images/ganaste.png" alt="logo ganador">`;
  } else if (data === 'blackjack') {
    playerCards.innerHTML += `<img class = "winnerMessage" src="/assets/images/bj.png" alt="logo blackjack">`;
  } else if (data === 'dealer') {
    playerCards.innerHTML += `<img class = "winnerMessage" src="/assets/images/pierde.png" alt="logo perdiste">`;
  } else if (data === 'blackjack1to1') {
    playerCards.innerHTML += `<img class = "winnerMessage" src="/assets/images/bj.png" alt="logo blackjack">`;
  } else {
    playerCards.innerHTML += `<img class = "winnerMessage" src="/assets/images/empate.png" alt="logo empate">`;
  }
}
//--------------------------------------------------

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


//*init game----------------------------------------
takeCardButton.disabled = true;
standButton.disabled = true;
bankDisplay.innerHTML = bank;
//--------------------------------------------------

//*  listens to the event of the button and call the function to start a new game
newGameButton.addEventListener('click', () => {
  const betValue = parseInt(betInput.value, 10); //get the bet value
  bank -= betValue; //subtract the bet from the bank
  bankDisplay.innerHTML = bank; //update the bank display
  bet = betValue; //set the bet value
  betDisplay.innerHTML = bet; //display the bet value

  newGame();
});
//-----------------------------------------------

//*  listens to the event of the button and call the function to take a card
takeCardButton.addEventListener('click', () => {
  playerCard = takeCard(turn);
});

//* listens to the event of the button stand and call the function to take the dealer turn

standButton.addEventListener('click', () => {
  takeCardButton.disabled = true;
  standButton.disabled = true;
  stand();
});

//* Ensure betN does not exceed bank
betInput.addEventListener('input', () => {
  let betValue = parseInt(betInput.value);
  if (betValue > bank) {
    betInput.value = bank;
  }
});