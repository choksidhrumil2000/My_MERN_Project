const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

const {authRoutes} = require('./routes/index.js');
const { ErrorHandler } = require('./middleware/index.js');


const app = express();

console.log("connecting to MOngodb.......");
mongoose.connect('mongodb://localhost:27017/myapp')
.then(()=>{
    console.log('successfully connected to mongodb database');
}).catch(()=>{
    console.log("Error in connecting Database.....");
})


app.use(cors());//allow requests from frontend......
app.use(express.json());//parse JSON request.......

app.use('/api/auth',authRoutes);

app.use(ErrorHandler);



app.listen(process.env.PORT,()=>{
    console.log(`Server is Running on ${process.env.PORT}.....`);
})