let deck = [];
const figures = ['C', 'D', 'H', 'S'];
const specialFigures = ['J', 'Q', 'K', 'A'];

// HTML elements
const playerCards = document.querySelector('#player-cards');
const dealerCards = document.querySelector('#dealer-cards');
const takeCardButton = document.querySelector('#take-card');
const playerPoints = document.querySelector('#playerPoints');
const dealerPoints = document.querySelector('#dealerPoints');
const standButton = document.querySelector('#stand-Button');

let playerHand = [];
let dealerHand = [];
let playerScoreSum = 0;
let dealerScoreSum = 0;
let turn = 'player';

// This function creates a new deck of cards and shuffles it
const deckCreation = () => {
  for (let i = 2; i <= 10; i++) {
      for (figure of figures) {
          deck.push(i + figure);
      }
    }
    for (figure of figures) {
        for (specialFigure of specialFigures) {
            deck.push(specialFigure + figure);
        }
    }
    deck = _.shuffle(deck);
    return deck;
}

deckCreation();



//* This function allows us to take a card

const takeCard = () => {
  //TODO--------------------------------------------------------------
  //TODO this is going to be removed, im going to create 6 decks as in casino rules, 
  //TODO and valide at the end of every play if the deck length is less than 25% of the total cards, 
  //TODO then create a new deck
  if (deck.length === 0) {   
    throw 'There are no cards in the deck';
  }
  //TODO--------------------------------------------------------------

  return deck.pop();
}


//* This function allows us to take the value of a card

const cardValue = (card) => {
//TODO--------------------------------------------------------------
//TODO this function is going to be implemented when playerScore and dealerScore are defined,
  const value = card.substring(0, card.length - 1);
  // if (isNaN(value)) {
  //   if (value === 'A' && playerScore > 21) {
  //     return 1;
  //   } else if (value === 'A') {
  //     return 11;
  //   } else {
  //     return 10;
  //   }
  // } else {
  //   return value * 1;
  // }

  //return isNaN(value) ? (value === 'A' ? (playerScore > 21 ? 1 : 11) : 10) : value * 1; //Todo this is the final implementation
  //TODO--------------------------------------------------------------

  return (isNaN(value)) ? (value === 'A') ? 11 : 10 : value * 1; //Todo this function is going to be removed when the function commented is implemented
}


//* This function allows us to show the cards in the game screen
const showCards = (turn, card) => {
  if (turn === 'player') {
    playerCards.innerHTML += `<img class = "game-card" src="/Assets/cartas/${card}.png" alt="card ${card}">`;
  } else {
    dealerCards.innerHTML += `<img class = "game-card" src="/Assets/cartas/${card}.png" alt="card ${card}">`;
  }
}

const dealerTurn = () => {
  do {
    dealerCard = takeCard();
    showCards('dealer', dealerCard);
    dealerScoreSum += cardValue(dealerCard);
    dealerPoints.innerHTML = dealerScoreSum;
  } while (dealerScoreSum < 17);
}


//*  listens to the event of the button and call the function to take a card
takeCardButton.addEventListener('click', () => {
  playerCard = takeCard();
  showCards('player', playerCard);
  playerScoreSum += cardValue(playerCard);
  playerPoints.innerHTML = playerScoreSum;

  if (playerScoreSum > 21) { //TODO change this to wait for the dealer to play and add validations and remove console.logs
    console.log('You lose');
    takeCardButton.disabled = true;
    dealerTurn();
  } else if (playerScoreSum === 21) {
    console.log('You win');
    takeCardButton.disabled = true;
    dealerTurn();
  }
  // playerScoreSum === 21 ? console.log('You win') 
  // : playerScoreSum > 21 ? console.log('You lose'): null;
  
});

//* listens to the event of the button stand and call the function to take the dealer turn

standButton.addEventListener('click', () => {
  takeCardButton.disabled = true;
  dealerTurn();
  if (dealerScoreSum > 21 || dealerScoreSum < playerScoreSum) {
    console.log('You win');
  } else if (dealerScoreSum === playerScoreSum) {
    console.log('It is a draw');
  } else {
    console.log('You lose');
  }
  standButton.disabled = true;
  // dealerScoreSum > 21 || dealerScoreSum < playerScoreSum ? console.log('You win') 
  // : dealerScoreSum === playerScoreSum ? console.log('It is a draw') : console.log('You lose');
});



// //! TESTS//////
// showCards('player', '5H');
// showCards('dealer', '5C');
// showCards('player', 'JD');
// showCards('dealer', 'AC');