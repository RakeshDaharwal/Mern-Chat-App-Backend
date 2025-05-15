const express = require('express')
const cors = require('cors')
const http = require('http');
const dotenv = require('dotenv')
const Router = require('./Routes/Router')
const connectDB = require('./Config/dbConnection')
const { socketConnection } = require('./Config/socket');

const app = express();



dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/', Router)



const server = http.createServer(app);
socketConnection(server);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})