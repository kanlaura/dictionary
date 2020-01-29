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
        // let sana = data[0].word;
        res.send(data)
    })
})