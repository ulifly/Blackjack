import _ from 'underscore';

const figures = ['C', 'D', 'H', 'S'];
const specialFigures = ['J', 'Q', 'K', 'A'];
let deck = [];

let playerScoreSum = 0;
let dealerScoreSum = 0;



  //TODO and validate at the end of every play if the deck length is less than 25% of the total cards, 
  //TODO this is going to be removed, im going to create 6 decks as in casino rules, 
  //TODO then create a new deck

//! test
// deck = ['2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 
//         'QC', 'KC', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 
//         '10D', 'JD', 'QD', 'KD', 'AD', '2H', '3H', '4H', '5H', '6H', 
//         '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH', '4S', '5S', 
//         '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', '3S', 'AS', 'AC','2S'];


export const deckCreation = () => {
    for (let i = 2; i <= 10; i++) {
        for (const figure of figures) {
            deck.push(i + figure);
        }
      }
      for (const figure of figures) {
          for (const specialFigure of specialFigures) {
              deck.push(specialFigure + figure);
          }
      }
      deck = _.shuffle(deck);
  
      return deck;
}

//* This function allows us to take a card from the deck------
export const takeCard = (turn) => {
    const card = deck.pop();
    return card;
};
//----------------------------------------------------------


//* This function allows us to take the value of a card------
const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    return (isNaN(value)) ? (value === 'A') ? 11 : 10 : value * 1; 
  }
//----------------------------------------------------------