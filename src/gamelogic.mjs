//TODO Validate playerScoreSum and dealerScoreSum, if the playerScoreSum is greater than 21, the player loses,
//TODO dealer turn
//TODO on the function deckCreation, create a new deck with 52 cards,

import _ from 'underscore';

const figures = ['C', 'D', 'H', 'S'];
const specialFigures = ['J', 'Q', 'K', 'A'];
let deck = [];

let playerHand = [];
let dealerHand = [];
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
    if (turn === 'player') {
        playerHand.push(card.substring(0, card.length - 1));
        playerScoreSum += cardValue(card);
    } else if (turn === 'firstDealer') {
        dealerHand.push(card.substring(0, card.length - 1));
        dealerScoreSum += cardValue(card);
    } else {
        while (dealerScoreSum < 17) {
            dealerHand.push(card.substring(0, card.length - 1));
            dealerScoreSum += cardValue(card);
        }
    }
    return { card, playerScoreSum, dealerScoreSum };
};
//----------------------------------------------------------

// export const stand = () => { //!here from server.mjs
//     while (dealerScoreSum < 17) {
//        const data = takeCard('dealer');
//        return data;
//     }
// };

//* This function allows us to take the value of a card------
const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    return (isNaN(value)) ? (value === 'A') ? 11 : 10 : value * 1;
}
//----------------------------------------------------------