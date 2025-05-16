const express = require('express');
const cors = require('cors');
const http = require('http');
const dotenv = require('dotenv');
const Router = require('./Routes/Router');
const connectDB = require('./Config/dbConnection');
const { chatSocket } = require('./Config/socket');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', Router);

const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

chatSocket(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
