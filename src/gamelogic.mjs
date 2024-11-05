//TODO Validate playerScoreSum and dealerScoreSum, if the playerScoreSum is greater than 21, the player loses,
//TODO on the function deckCreation, create a new deck with 52 cards,

import _ from 'underscore';

const figures = ['C', 'D', 'H', 'S'];
const specialFigures = ['J', 'Q', 'K', 'A'];
let deck = [];

let playerHand = [];
let dealerHand = [];
let playerScoreSum = 0;
let dealerScoreSum = 0;



//TODO validate at the end of every play if the deck length is less than 25% of the total cards, if so, create a new deck
//TODO im going to create 6 decks as in casino rules, and shuffle them all together,

//! test
// deck = ['2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 
//         'QC', 'KC', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 
//         '10D', 'JD', 'QD', 'KD', 'AD', '2H', '3H', '4H', '5H', '6H', 
//         '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH', '4S', '5S', 
//         '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', '3S', 'AS', 'AC','2S'];

//! test dealer 21 natural(blackjack) and player 21 
// deck = [ '5C',  'QD', '7S', 'JC', '2H',  '3C', 'QH',
// '8D',  'JD', '5S', 'QC', '10D', '7C', '8C',
// '4D',  '5H', 'KD', 'JH', '9H',  'AH', '4H',
// '3S',  '3H', 'KC', 'KS', '10S', '3D', '2S',
// 'AS',  '4S', 'JS', '4C', '10H', '6S', '9D',
// '8S',  '8H', 'AC', '6D', '7H',  'KH', '5D',
// '10C', '9C', '2C', '2D', '7D',  'QS', '9S',
// '6H',  '6C', 'AD'];


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

    if (turn === 'player') {
        const card = deck.pop();
        playerHand.push(card.substring(0, card.length - 1));
        playerScoreSum += cardValue(card);
        return { card, playerScoreSum, dealerScoreSum };
    } else if (turn === 'firstDealer') {
        const card = deck.pop();
        dealerHand.push(card.substring(0, card.length - 1));
        dealerScoreSum += cardValue(card);
        console.log(dealerScoreSum);
        return { card, playerScoreSum, dealerScoreSum };
    } else {
        const card = deck.pop();
        while (dealerScoreSum < 17) {
            dealerHand.push(card.substring(0, card.length - 1));
            dealerScoreSum += cardValue(card);
            console.log(dealerScoreSum);
            return { card, playerScoreSum, dealerScoreSum };
        }
    }
};
//----------------------------------------------------------

//* This function allows us to take the value of a card------
const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    return (isNaN(value)) ? (value === 'A') ? 11 : 10 : value * 1;
}
//---------------------------------------------------------