import path from 'path';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';

import { deckCreation, resetGame, turnHelper, blackjackEvaluator } from './gamelogic.mjs'


const deck = deckCreation();
console.log(deck)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//-----------------
const PORT = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);

const players = {};
let playerCount = 1;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//* Socket connections and listeners--------------
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('logToServer', (playerName) => {
    if (Object.keys(players).length >= 100) { //TODO change the number for more players when implemented
      socket.emit('roomFull', true)
    } else {
      players[playerCount] = playerName;
      playerCount++;
      socket.emit('gameSessionLog', playerName);
    }
    console.log({ players });
  });

  socket.on('newGame', () => {
    //deckCreation(); //!check here validate if the deck is less than 25% of the total cards, if so, create a new deck
    resetGame();
  });

  socket.on('takeCard', (turn) => {
    turnHelper(turn)
  });

  socket.on("blackjackEval", () => {
    blackjackEvaluator();
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});
//----------------------------------------------

export const cardEmitter = (data) => {
  io.emit('takeCardR', data);
};

export const winnerEmitter = (data) => {
  io.emit('winnerR', data);
};

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});