const express = require('express');
require('dotenv').config();
const cors = require('cors');

const connection = require('./config/db.js');
const userRoute = require('./routes/user.route.js');
const notesRoute = require('./routes/notes.route.js');
const authenticate = require('./middlewares/authenticate.js');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the Homepage');
});

app.use('/user', userRoute);
app.use('/notes', authenticate, notesRoute);

app.listen(8080, async () => {
    try {
        await connection;
        console.log('Connected to DB successfully');
    }
    catch (err) {
        console.log('Unable to connect: ', err);
    }
    console.log(`Listening at http://localhost:8080`);
});