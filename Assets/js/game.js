let deck = [];
const figures = ['C', 'D', 'H', 'S'];
const specialFigures = ['J', 'Q', 'K', 'A'];

let playerHand = [];
let dealerHand = [];


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



// This function allows us to take a card

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


// This function allows us to take the value of a card

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

console.log(cardValue('8C') ); 