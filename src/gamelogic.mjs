import _ from 'underscore';

const figures = ['C', 'D', 'H', 'S'];
const specialFigures = ['J', 'Q', 'K', 'A'];
let deck = [];

let playerScoreSum = 0;
let dealerScoreSum = 0;

 //deckCreation();
  //TODO and validate at the end of every play if the deck length is less than 25% of the total cards, 
  //TODO this is going to be removed, im going to create 6 decks as in casino rules, 
  //TODO then create a new deck

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