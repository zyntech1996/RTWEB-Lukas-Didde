var express = require('express');
var router = express.Router();
var User = require('./dbtest');
var bcrypt = require('bcrypt');
var path = require('path');
const fs = require('fs');
var LocalStorage = require('node-localstorage').LocalStorage;
LocalStorage = new LocalStorage('./scratch');


router.get('/', function (req, res) {
    res.render('pages/index');
});

router.get('/game', function (req, res, next) {
    User.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    return next(err);
                } else {
                    return res.render('pages/game');
                }
            }
        });
});

router.get('/login', function (req, res) {
    res.render('pages/loginPage')
});

//POST route for updating data
router.post('/', function (req, res, next) {
    // confirm that user typed same password twice


    if (
        req.body.username &&
        req.body.password) {

        var userData = {
            username: req.body.username,
            password: req.body.password,
        }

        User.create(userData, function (error, user) {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                console.log('Created' + JSON.stringify(userData));
                return res.render('/game');
            }
        });

    } else if (req.body.logusername && req.body.logpassword) {
        User.authenticate(req.body.logusername, req.body.logpassword, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong username or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                //console.log('Welcome back: ' + req.body.logusername);
                let usern = req.body.logusername;
                console.log('Welcome back: ' + usern);
                return res.redirect('/game');
            }
        });
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
});
router.get('/highscores.json', (req, res) => {
    res.sendFile(path.join(__dirname, '/highscores.json'))
});
router.post('/highscores.json', (req,res)=>{
    console.log(req.query)
})
/*
router.get('/highscores.json', function(req, res, next){
    res.sendFile('/highscores.json');
    
});*/

// GET for logout logout
router.get('/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                console.log("logged out!");
                return res.redirect('/login');
            }
        });
    }
});

module.exports = router;