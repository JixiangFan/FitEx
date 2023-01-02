var express = require('express');
const { Users, Teams } = require('../models/Schemas.js');

var router = express.Router();
const Schemas = require('../models/Schemas.js');

router.get('/Navbar/:UID', async (req, res) => {
    Users.findById(req.params.UID)
        .select('User_Name Avater')
        .exec(function (err, txs) {
            res.send(txs)
        });
})

router.get('/Daily_Step/:UID', async (req, res) => {
    Users.findById(req.params.UID)
        .select('Today Daily_Step_Goal Daily_Step_Fitbit Daily_Step_Self_Report Daily_Step_Mix Daily_Incomplete_Step')
        .exec(function (err, txs) {
            res.send(txs)
        });
})

router.get('/Daily_Miles/:UID', async (req, res) => {
    Users.findById(req.params.UID)
        .select('Today Daily_Mile_Goal Daily_Mile_Fitbit Daily_Mile_Self_Report Daily_Mile_Mix Daily_Incomplete_Mile')
        .exec(function (err, txs) {
            res.send(txs)
        });
})

router.get('/Weekly_Step/:UID', async (req, res) => {
    Users.findById(req.params.UID)
        .select('StartofWeek EndofWeek Weekly_Step_Goal Weekly_Step_Fitbit_Total Weekly_Step_Self_Report_Total Weekly_Step_Mix_Total Weekly_Step_Fitbit_Record Weekly_Step_Self_Report_Record Weekly_Step_Mix_Record Weekly_Incomplete_Step')
        .exec(function (err, txs) {
            res.send(txs)
        });
})

router.get('/Weekly_Miles/:UID', async (req, res) => {
    Users.findById(req.params.UID)
        .select('StartofWeek EndofWeek Weekly_Mile_Goal Weekly_Mile_Fitbit_Total Weekly_Mile_Self_Report_Total Weekly_Mile_Mix_Total Weekly_Mile_Fitbit_Record Weekly_Mile_Self_Report_Record Weekly_Mile_Mix_Record Weekly_Incomplete_Mile')
        .exec(function (err, txs) {
            res.send(txs)
        });
})

router.get('/FV/:UID', async (req, res) => {
    Users.findById(req.params.UID)
        .select('FV_Goal Daily_FV_Report')
        .exec(function (err, txs) {
            res.send(txs)
        });
})

router.get('/Daily_Activity_Report/:UID', async (req, res) => {
    Users.findById(req.params.UID)
        .select('Today Daily_Activity Activty_Date Activity_Name Activity_Description Activity_Time_Hours Activity_Time_Minutes Activity_Time_Minutes_Total Activity_Miles Activity_Steps')
        .exec(function (err, txs) {
            res.send(txs)
        });
})

router.get('/Weekly_Activity_Report/:UID', async (req, res) => {
    Users.findById(req.params.UID)
        .select('StartofWeek EndofWeek Weekly_Activity Activty_Date Activity_Name Activity_Description Activity_Time_Hours Activity_Time_Minutes Activity_Time_Minutes_Total Activity_Miles Activity_Steps')
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