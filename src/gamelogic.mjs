import _ from 'underscore';

const figures = ['C', 'D', 'H', 'S'];
const specialFigures = ['J', 'Q', 'K', 'A'];
let deck = [];

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