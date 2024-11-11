//TODO validate at the end of every play if the deck length is less than 25% of the total cards, if so, create a new deck
//TODO im going to create 6 decks as in casino rules, and shuffle them all together,
import _ from 'underscore';

import { cardEmitter, winnerEmitter } from './server.mjs';

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


const winEvaluator = () => {
    if (playerScoreSum > 21) {
        winnerEmitter('dealer'); //!emit winner
    } else if (dealerScoreSum > 21) {
        winnerEmitter('player'); //!emit winner
    } else if (dealerScoreSum === 21 && playerScoreSum != 21) {
        winnerEmitter('dealer'); //!emit winner
    } else if (dealerScoreSum === 21 && playerScoreSum === 21) {
        winnerEmitter('tie'); //!emit winner
    } else if (dealerScoreSum === playerScoreSum) {
        winnerEmitter('tie'); //!emit winner
    } else if (dealerScoreSum > playerScoreSum) {
        winnerEmitter('dealer'); //!emit winner
    } else {
        winnerEmitter('player'); //!emit winner
    }
};