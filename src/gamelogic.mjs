//TODO validate at the end of every play if the deck length is less than 25% of the total cards, if so, create a new deck
//TODO im going to create 6 decks as in casino rules, and shuffle them all together,
import _ from 'underscore';

import { cardEmitter, winnerEmitter, blackjackEmitter } from './server.mjs';

const figures = ['C', 'D', 'H', 'S'];
const specialFigures = ['J', 'Q', 'K', 'A'];
let deck = [];

let playerHand = [];
let dealerHand = [];
let playerScoreSum = 0;
let dealerScoreSum = 0;

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

//! debugging deck creation
// export const deckCreation = () => {
//     deck = [
//         'QD', 'QS', '2H', '5C', '5D', '4H', 'KS',
//         '9D', '5S', '3S', 'AH', '8H', '3D', 'JC',
//         '3H', '9C', 'AD', '4D', 'KD', '7S', '10C',
//         '7H', '10H', '10S', '2C', '8C', 'KH', 'QH',
//         'QC', '6D', '2S', '9S', '9H', '7C', '5H',
//         '8D', '6H', '6C', '10D', '4S', '7D', '3C',
//         '2D', '6S', 'JH', 'JD', 'KC', '4C', '8S',
//         'JS', 'AS', 'AC'
//     ];
//     return deck;
// }


export const resetGame = () => {
    playerHand = [];
    dealerHand = [];
    playerScoreSum = 0;
    dealerScoreSum = 0;
};

export const turnHelper = (turn) => {
    if (turn === 'dealer') {
        while (dealerScoreSum < 17)
            takeCard('dealer');
        winEvaluator();
    } else {
        takeCard(turn);
    }
}

//* This function allows us to take a card from the deck------
const takeCard = (turn) => {
    if (deck.length < 10) {
        console.log('deck is less than 10 cards, creating a new deck');
    }
    if (turn === 'player') {
        const card = deck.pop();
        playerHand.push(card.substring(0, card.length - 1));
        playerScoreSum += cardValue(card);
        if (playerScoreSum > 21 && playerHand.includes('A')) {
            playerHand.splice(playerHand.indexOf('A'), 1);
            playerScoreSum -= 10;
        }
        if (playerScoreSum > 21) {
            winnerEmitter('dealer'); //!emit winner change this to blackjack
        }
        cardEmitter({ card, playerScoreSum, dealerScoreSum });
    } else {
        const card = deck.pop();
        dealerHand.push(card.substring(0, card.length - 1));
        dealerScoreSum += cardValue(card);
        if (dealerScoreSum > 21 && dealerHand.includes('A')) {
            dealerHand.splice(dealerHand.indexOf('A'), 1);
            dealerScoreSum -= 10;
        }
        cardEmitter({ card, playerScoreSum, dealerScoreSum });
    }
};
//----------------------------------------------------------

//* This function allows us to take the value of a card------
const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    return (isNaN(value)) ? (value === 'A') ? 11 : 10 : value * 1;
}
//---------------------------------------------------------

//* This function allows us to evaluate the winner of the game------
const winEvaluator = () => {
    if (playerScoreSum > 21) {
        winnerEmitter('dealer');
    } else if (dealerScoreSum > 21) {
        winnerEmitter('player');
    } else if (dealerScoreSum === 21 && playerScoreSum != 21) {
        winnerEmitter('dealer');
    } else if (dealerScoreSum === 21 && playerScoreSum === 21) {
        winnerEmitter('tie');
    } else if (dealerScoreSum === playerScoreSum) {
        winnerEmitter('tie');
    } else if (dealerScoreSum > playerScoreSum) {
        winnerEmitter('dealer');
    } else {
        winnerEmitter('player');
    }
};

export const blackjackEvaluator = () => {
    if (playerScoreSum === 21 && dealerScoreSum != 11) {
        blackjackEmitter('blackjack');
    } else if (playerScoreSum === 21 && dealerScoreSum === 11) {
        console.log('one to ona payment'); //!falta implementar la lógica del seguro
        blackjackEmitter('blackjack1to1');
    }
}