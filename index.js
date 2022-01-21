const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');

const authRoute = require('./routes/auth');
const activitiesRoute = require('./routes/activities');
const totalsRoute = require('./routes/totals');

dotenv.config(); 
mongoose.connect(
    process.env.DB_CONNECT, 
    (a) => console.log('DB - ' + a)
);

app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use('/api/auth', authRoute);
app.use('/api/activities', activitiesRoute);
app.use('/api/totals', totalsRoute);

const port = process.env.PORT

app.listen(port, () => console.log("Server Running"));