const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

module.exports = router;

router.route('/:word').get(function (req, res, next) {
    let word = req.params.word;

    fetch(`https://googledictionaryapi.eu-gb.mybluemix.net/?define=${word}
    `)
    .then(res => res.json())
    .then(data => {
        res.send(data)
    })
})

router.route('/:word/triggers').get(async function (req, res, next) {
    let word = req.params.word;

    const response = await fetch(`https://api.datamuse.com/words?sp=${word}`)
    const data = await response.json();
    res.send(data);
})