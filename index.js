const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const Router = require('./Routes/Router')
const app = express();
dotenv.config();


app.use(cors());
app.use(express.json());
app.use('/', Router)

require('./Config/dbConnection')



const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})