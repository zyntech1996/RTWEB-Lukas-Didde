var express = require('express');
var router = express.Router();
var path = require('path');
var app = express();

const userRoutes = (app, fs) => {

    // variables
    //const dataPath = '/highscores.json';

    // READ
    app.get('/highscores.js', (req, res) => {
        res.sendFile(path.join(__dirname, '/', 'highscores.json'))
    });
};

module.exports = userRoutes;