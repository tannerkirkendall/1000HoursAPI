const { application } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config(); 
mongoose.connect(
    process.env.DB_CONNECT, 
    (a) => {
        console.log('DB - ' + a);
    }
);

app.use(express.json());
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

const port = process.env.PORT

app.listen(port, () => console.log("Server Running"));
