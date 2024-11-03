//TODO CardValue function to server side
//TODO change player for the variable playerName
//TODO remove back card when the dealer tur starts
//TODO stand button should be disabled until the player has at least 2 cards
//TODO stand button logic should be changed to server side
//TODO leave button and logic to logout from server
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

//let playerScoreSum = 0;
//let dealerScoreSum = 0;
let turn = 'dealer';

//**  Sockets listeners -----------------------
socket.on('roomFull', data => {
  console.log(data);
})

socket.on('gameSessionLog', playerName => {
  loginScreen.remove();
  setTimeout(()=> {
    gameScreen.classList.remove('hidden-content');
  }, 400 );
})

socket.on('takeCardR', card => {
  console.log(card, turn)
  showCard(card);
})
//------------------------------------------


//* functions -------------------------------
const newGame = () => {
  
}

const logToServer = (playerName) => {
  socket.emit('logToServer', playerName)
}

const takeCard = (turn) => {
  socket.emit('takeCard', turn);
}

const showCard = (card) => {
  if (turn === 'player') {
    playerCards.innerHTML += `<img class = "game-card" src="/Assets/cartas/${card}.png" alt="card ${card}">`;
  }  else {
    dealerCards.innerHTML += `<img class = "game-card" src="/Assets/cartas/${card}.png" alt="card ${card}">`;
  }
}


//* This function allows us to take the value of a card

const cardValue = (card) => {
  const value = card.substring(0, card.length - 1);
  return (isNaN(value)) ? (value === 'A') ? 11 : 10 : value * 1; //Todo this function is going to be changed to the server
}

// const dealerTurn = () => {
//       turn = 'dealer';
//       dealerCard = takeCard();
//       dealerScoreSum += cardValue(dealerCard);
//       dealerPoints.innerHTML = dealerScoreSum;
//       dealerHand.push(dealerCard.substring(0, dealerCard.length - 1));
  
//       if(dealerScoreSum > 21 && dealerHand.includes('A')) {
//         dealerHand.splice(dealerHand.indexOf('A'), 1);
//         dealerScoreSum -= 10;
//       }
// }


document.getElementById('game-login').addEventListener('submit', function(event){
  event.preventDefault();
  
  //obtain name from the form
  const playerName = document.getElementById('playerName').value;
  logToServer(playerName);
})


//*init game
takeCardButton.disabled = true;
standButton.disabled = true;

newGameButton.addEventListener('click', () => {
  turn = 'dealer';
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
});


//*  listens to the event of the button and call the function to take a card
takeCardButton.addEventListener('click', () => {
  playerCard = takeCard(turn);

  // playerHand.push(playerCard.substring(0, playerCard.length - 1));
  // console.log(playerHand);
  // playerScoreSum += cardValue(playerCard);

  // if(playerScoreSum > 21 && playerHand.includes('A')) {
  //   playerHand.splice(playerHand.indexOf('A'), 1);
  //   console.log(playerHand);
  //   playerScoreSum -= 10;
  // }

  // playerPoints.innerHTML = playerScoreSum;

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
  
  while (dealerScoreSum < 17) {
    dealerTurn();
  }
  //if (dealerScoreSum < 17) {setTimeout(()=> {dealerTurn()}, 1000);}

  if (dealerScoreSum > 21 || dealerScoreSum < playerScoreSum ) {
    console.log('You win');
    console.log({dealerScoreSum, playerScoreSum});
  } else if (dealerScoreSum === playerScoreSum) {
    console.log('It is a draw');
  } else {
    console.log('You lose');
  }
  // dealerScoreSum > 21 || dealerScoreSum < playerScoreSum ? console.log('You win') 
  // : dealerScoreSum === playerScoreSum ? console.log('It is a draw') : console.log('You lose');
});

