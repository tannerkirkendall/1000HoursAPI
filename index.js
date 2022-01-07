const { application } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const authRoute = require('./routes/auth');

dotenv.config(); 
mongoose.connect(
    process.env.DB_CONNECT, 
    (a) => {
        console.log('DB - ' + a);
    }
);


app.use(express.json());
app.use('/api/user', authRoute);

app.listen(3000, () => console.log("Server Running"));
