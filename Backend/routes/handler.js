var express = require('express');
const { Users, Teams, ProgramDate, PersonalExercise, SelfReportActivity, SelfReport, Ranking } = require('../models/Schemas.js');
const axios = require('axios');
var router = express.Router();
const Schemas = require('../models/Schemas.js');

router.get('/test', async (req, res) => {
    res.send("good Test")
})

router.get('/profile/:UID', async (req, res) => {
    Users.findById(req.params.UID)
        .then((result) => {
            res.send(result)
        })
})


router.get("/teams", async (req, res) => {
    Teams.find().exec(function (err, txs) {
        //console.log(txs);
        res.json(txs);
    });
});

router.get('/', function (req, res, next) {
    res.render('hey this worked');
});

router.get('/another/route', function (req, res, next) {
    res.json({ hello: 'world' });
});

router.get('/serverTestMode', async (req, res) => {
    //delete all document
    ProgramDate.deleteMany({}).exec()
    Users.deleteMany({}).exec()
    Teams.deleteMany({}).exec()
    PersonalExercise.deleteMany({}).exec()
    SelfReportActivity.deleteMany({}).exec()
    SelfReport.deleteMany({}).exec()
    Ranking.deleteMany({}).exec()
    //create Four leader

    res.send("done")
})

function createLeaderUser(num) {
    return axios.post("http://localhost:5000/register/AddUserWithoutTeam", {
        email: email,
        password: password
    });
}


module.exports = router;