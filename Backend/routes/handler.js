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


router.get('/Dashboard/Navbar/:UID', async (req, res) => {
    Users.findById(req.params.UID)
        .select('User_Name Avater')
        .exec(function (err, txs) {
            res.send(txs)
        });
})


router.get('/Dashboard/Daily_Step/:UID', async (req, res) => {
    Users.findById(req.params.UID)
        .select('Date Daily_Step_Goal Daily_Step_Fitbit Daily_Step_Self_Report Daily_Step_Mix Daily_Incomplete_Step')
        .exec(function (err, txs) {
            res.send(txs)
        });
})

router.get('/Dashboard/Daily_Miles/:UID', async (req, res) => {
    Users.findById(req.params.UID)
        .select('Date Daily_Mile_Goal Daily_Mile_Fitbit Daily_Mile_Self_Report Daily_Mile_Mix Daily_Incomplete_Mile')
        .exec(function (err, txs) {
            res.send(txs)
        });
})


router.get('/Dashboard/FV/:UID', async (req, res) => {
    Users.findById(req.params.UID)
        .select('FV_Goal Daily_FV_Report')
        .exec(function (err, txs) {
            res.send(txs)
        });
})



router.get('/', function (req, res, next) {
    res.render('hey this worked');
});

router.get('/another/route', function (req, res, next) {
    res.json({ hello: 'world' });
});

module.exports = router;