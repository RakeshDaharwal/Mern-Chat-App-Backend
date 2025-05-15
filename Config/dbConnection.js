const mongoose = require('mongoose')


mongoose.connect(`${process.env.MONGO_URL}/ChatApp`).then(()=>{
    console.log('Database Connected')
}).catch((err)=>{
    console.log('Error', err)
})