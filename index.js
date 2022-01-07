const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

const authRoute = require('./routes/auth');
const activitiesRoute = require('./routes/activities');

dotenv.config(); 
mongoose.connect(
    process.env.DB_CONNECT, 
    (a) => {
        console.log('DB - ' + a);
    }
);

app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/activities', activitiesRoute);

const port = process.env.PORT

app.listen(port, () => console.log("Server Running"));
