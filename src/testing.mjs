







//refactor to use in gamelogic.mjs

//* This function allows us to take a card from the deck------
const takeCard = (turn) => {
    const card = deck.pop();
    const hand = turn === 'player' ? playerHand : dealerHand;
    const scoreSum = turn === 'player' ? playerScoreSum : dealerScoreSum;

    hand.push(card.substring(0, card.length - 1));
    scoreSum += cardValue(card);
    cardEmitter({ card, playerScoreSum, dealerScoreSum });

    if (turn === 'player') playerScoreSum = scoreSum;
    else dealerScoreSum = scoreSum;
};