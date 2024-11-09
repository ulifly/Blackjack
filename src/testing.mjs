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



//refactor to use in gamelogic.mjs


//* This function starts a new game----------------
const newGame = () => {
    socket.emit('newGame');
    turn = 'firstDealer';
    playerCards.innerHTML = '';
    dealerCards.innerHTML = '';
    takeCard(turn);
    takeCardButton.disabled = false;
    standButton.disabled = false;
    setTimeout(() => {
      turn = 'player';
    }, 500); // Delay to simulate dealer's turn
    newGameButton.disabled = true;
    setTimeout(() => {
      dealerCards.innerHTML += `<img  id="backCard" class = "game-card" src="/Assets/cartas/grey_back.png" alt="card back">`;
    }, 600);
  }
  //-----------------------------------------------