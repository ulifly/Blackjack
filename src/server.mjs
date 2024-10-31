import path from 'path';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';

import { deckCreation }  from './gamelogic.mjs'

const deck = deckCreation();
console.log(deck)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//-----------------
const PORT = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});