const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const app = express();

dotenv.config();


app.use(cors());
app.use(express.json());


require('./Config/dbConnection')



const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})