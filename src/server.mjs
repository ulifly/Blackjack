import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { createServer } from 'http';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, { connectionStateRecovery: {} });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});