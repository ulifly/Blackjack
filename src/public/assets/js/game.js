//TODO delete this, is already on server
// let deck = [];
// const figures = ['C', 'D', 'H', 'S'];
// const specialFigures = ['J', 'Q', 'K', 'A']; 
//TODO --------------------------------
// HTML elements
const playerCards = document.querySelector('#player-cards');
const dealerCards = document.querySelector('#dealer-cards');
const takeCardButton = document.querySelector('#take-card');
const playerPoints = document.querySelector('#playerPoints');
const dealerPoints = document.querySelector('#dealerPoints');
const standButton = document.querySelector('#stand-Button');

//let playerHand = [];
//let dealerHand = [];
//let playerScoreSum = 0;
//let dealerScoreSum = 0;
let turn = 'dealer';

//! test
// deck = ['2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 
//         'QC', 'KC', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 
//         '10D', 'JD', 'QD', 'KD', 'AD', '2H', '3H', '4H', '5H', '6H', 
//         '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH', '4S', '5S', 
//         '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', '3S', 'AS', 'AC','2S'];


const takeCard = (turn) => {
  socket.emit('takeCard', turn)
  socket.on('takeCard', card => {
    console.log(card)
    showCard(card, turn);
  })
}

const showCard = (card, turn) => {
  if (turn === 'player') {
    playerCards.innerHTML += `<img class = "game-card" src="/Assets/cartas/${card}.png" alt="card ${card}">`;
  }  else {
    dealerCards.innerHTML += `<img class = "game-card" src="/Assets/cartas/${card}.png" alt="card ${card}">`;
  }
}


//* This function allows us to take the value of a card

const cardValue = (card) => {
  const value = card.substring(0, card.length - 1);
  return (isNaN(value)) ? (value === 'A') ? 11 : 10 : value * 1; //Todo this function is going to be removed when the function commented is implemented
}

const dealerTurn = () => {
      turn = 'dealer';
      dealerCard = takeCard();
      dealerScoreSum += cardValue(dealerCard);
      dealerPoints.innerHTML = dealerScoreSum;
      dealerHand.push(dealerCard.substring(0, dealerCard.length - 1));
  
      if(dealerScoreSum > 21 && dealerHand.includes('A')) {
        dealerHand.splice(dealerHand.indexOf('A'), 1);
        dealerScoreSum -= 10;
      }
}


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



