var express = require('express');
const { Users, Teams } = require('../models/Schemas.js');

var router = express.Router();
const Schemas = require('../models/Schemas.js');

router.get('/test', async (req, res) => {
    res.send("good Test")
})



router.get('/profile/getUser/:UID', async (req, res) => {
    Users.findById(req.params.UID)
        .then((result) => {
            res.send(result)
        })
})

router.get('/', function (req, res, next) {
    res.render('hey this worked');
});

router.get('/another/route', function (req, res, next) {
    res.json({ hello: 'world' });
});

module.exports = router;