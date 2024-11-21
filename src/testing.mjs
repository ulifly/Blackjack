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

deck = [
  'QD', 'QS',  '2H',  '5C',  '5D', '4H', 'KS',
  '9D', '5S',  '3S',  'AH',  '8H', 'AS', 'JC',
  '3H', '9C',  'AD',  '4D',  'KD', '7S', '10C',
  '7H', '10H', '10S', '2C',  '8C', 'KH', 'QH',
  'QC', '6D',  '2S',  '9S',  '9H', '7C', '5H',
  '8D', '6H',  '6C',  '10D', '4S', '7D', '3C',
  '2D', '6S',  'JH',  'JD',  'KC', '4C', '8S',
  'JS', '3D',  'AC'
]



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

  // https://www.youtube.com/shorts/6MxHJjrXGIU