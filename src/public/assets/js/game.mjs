//*BJO-7A 
//!add a button to double down, the player can double the bet and take only one card  this first

//!check error when the player has a blackjack and the dealer has an ace and the player decides 
//!to not take the 1:1 payment and dealer does not has a blackjack bet is not paid to the player

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
const doubleBtn = document.querySelector('#doubleBtn');

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
  showWinner(data);
});

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

  doubleBtn.classList.remove('hidden-content')


}
//-----------------------------------------------


//* This function takes a card from the deck-----
const takeCard = (turn) => {
  socket.emit('takeCard', turn);
}
//-----------------------------------------------

//* This function show the winner of the game
const showWinner = (data) => {
  setTimeout(() => {
    showLostWin(data);
    newGameButton.disabled = false;
    takeCardButton.disabled = true;
    standButton.disabled = true;

    switch (data) {
      case 'tie':
        bank += bet;
        break;
      case 'blackjack':
        bank += bet * 2.5;
        break;
      case 'blackjack1to1':
        if (confirm('aceptas pago 1:1')) {
          bank += bet * 2;
          stand();
        } else {
          stand(true);
        }
        break;
      case 'player':
        bank += bet * 2;
        break;
      default:
        break;
    }

    bet = 0;
    betDisplay.innerHTML = bet;
    bankDisplay.innerHTML = bank;
    if (bank === 0) {
      alert('Game Over');
      location.reload();
    }
  }, 500);
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

const stand = (blackjack1to1) => { //const stand = (blackjack1to1 = false) => {
  turn = 'dealer';
  dealerCards.removeChild(document.getElementById('backCard'));
  takeCard(turn);
  newGameButton.disabled = false;
  if (blackjack1to1) {
    bank += bet * 2.5;
    bet = 0;
    betDisplay.innerHTML = bet;
    bankDisplay.innerHTML = bank;
  }
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
  const playerCard = takeCard(turn);
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