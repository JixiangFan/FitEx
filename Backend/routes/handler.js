var express = require('express');
const { Users, Teams } = require('../models/Schemas.js');

var router = express.Router();
const Schemas = require('../models/Schemas.js');
router.put('/register/addUser', async (req, res) => {
    const user = {
        Name: {
            First_Name: req.params.First_Name,
            Last_Name: req.params.Last_Name,
            Middle_Name: req.params.Middle_Name,
        },
        User_Name: req.params.User_Name,
        Avater: req.params.Avater,
        Email: req.params.Email,
        Password: req.params.Password,
        Location: req.params.Location,
        Gender: req.params.Gender,
        Age: req.params.Age,
        Weight: req.params.Weight,
        Height: {
            Height_feet: req.params.Height_feet,
            Height_Inch: req.params.Height_Inch,
            Height_Inch_total: req.params.Height_Inch_total,
        },
        Device: req.params.Device,
        Fitbit_Access_Token: req.params.Fitbit_Access_Token,
        Goal: {
            Daily_Step_Goal: req.params.Daily_Step_Goal,
            Daily_Mile_Goal: req.params.Daily_Mile_Goal,
            Weekly_Step_Goal: req.params.Weekly_Step_Goal,
            Weekly_Mile_Goal: req.params.Weekly_Mile_Goal,
            Daily_FV_Goal: req.params.Daily_FV_Goal,
            Weekly_FV_Goal: req.params.Weekly_FV_Goal,
        },
        User_Type: req.params.User_Type,
        Unit_Prefernece: req.params.Unit_Prefernece,
    }
    const newUser = new Schemas.Users(user);
    try
    {
        await newUser.save(async (err, newUserResult) => {
            console.log(newUserResult);
            console.log(err);
            res.end('new User created')
        });
    } catch (err)
    {
        console.log(err);
        res.end('User not added!');
    }
});


router.put('/register/addTeam', async (req, res) => {
    const user = {
        Team_Goal: {
            Team_Daily_Step_Goal: 1000,
            Team_Daily_Mile_Goal: 1001,
            Team_Weekly_Step_Goal: 1002,
            Team_Weekly_Mile_Goal: 1003,   
        },
        Team_Daily_Steps: 1004,
        Team_Daily_Miles: 1005,
        Team_Daily_Carloies: 1006,
        Team_Weekly_Steps_Total: 1007,
        Team_Weekly_Miles_Total: 1008,
        Team_Weekly_Carloies_Total: 1009,
        Team_Weekly_Steps_Record: [1,2,3,4,5,6,7],
        Team_Weekly_Mile_Record: [11,12,13,14,15,16,17],
        Team_Weekly_Carloies_Record: [21,22,23,24,25,26,27],
        Team_Program_Steps:{1:11,2:12,3:13},
        Team_Program_Miles:{1:21,2:22,3:23},
        Team_Program_Carloies:{1:31,2:32,3:33},
        Team_Member: 
        {
            //{0:uuid1, 1:uuid2}
            type: Map,
            of: {
                type: Schema.Types.ObjectId, 
                ref:'PersonalExercise'
            }
        },
    
        Team_Daily_Step_Lift: {type:Number, required: true},
        Team_Daily_Mile_Lift: {type:Number, required: true},
        Team_Weekly_Step_Lift:
        {type:[
        {
            type:Number,
            maxlength: 7,
        }]},
        Team_Weekly_Mile_Lift:
        {type:[
        {
            type:Number,
            maxlength: 7,
        }]},
        Daily_Team_Ranking: {type:Number, required: true},
        Weekly_Team_Ranking: {type:[
        {
            type:Number,
            maxlength: 7,
        }],
        required: true
        },
    }
    const newUser = new Schemas.Users(user);
    try
    {
        await newUser.save(async (err, newUserResult) => {
            console.log(newUserResult);
            console.log(err);
            res.end('new User created')
        });
    } catch (err)
    {
        console.log(err);
        res.end('User not added!');
    }
});


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