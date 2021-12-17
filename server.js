const express = require('express');
const { notes } = require('./data/notes');

const app = express();

app.get('/data/notes', (req, res) => {
    res.send('Hello World');
});

app.listen(3001, () => {
    console.log(`Api server now on port 3001!`);
});