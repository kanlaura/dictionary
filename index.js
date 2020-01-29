const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const words = require('./routes/words');

app.use('/api/words', words);

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
    console.log(`Kuuntelee porttia ${PORT}`)
})