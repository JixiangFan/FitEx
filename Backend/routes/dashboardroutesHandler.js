var express = require('express');
const { Users, SelfReportActivity ,SelfReport, PersonalExercise } = require('../models/Schemas.js');

var router = express.Router();
const Schemas = require('../models/Schemas.js');

router.get('/test', async (req, res) => {
    res.send("good Test")
})

router.get('/Navbar/:UID', async (req, res) => {
    Users.findById(req.params.UID)
        .select('User_Name Avater')
        .exec(function (err, txs) {
            res.send(txs)
        });
})

router.get('/DailyStep/:UID', async (req, res) => {
    let result  = []; 
    Users.findById(req.params.UID)
    .select('Today Goal.Daily_Step_Goal Exercise_Profile')
        .exec(function (err, txs) {
            result = result.concat(txs)
            PersonalExercise.findById(txs.Exercise_Profile)
                .select('Individual_Step.Daily_Step_Fitbit Individual_Step.Daily_Step_Self_Report Individual_Step.Daily_Step_Mix Individual_Step.Daily_Incomplete_Step')
                .exec(function (err, txs) {
                    result = result.concat(txs)
                    res.json(result)
                })
    });
     
})

router.get('/DailyMiles/:UID', async (req, res) => {
   let result  = []; 
    Users.findById(req.params.UID)
    .select('Today Goal.Daily_Mile_Goal Exercise_Profile')
        .exec(function (err, txs) {
            result = result.concat(txs)
            PersonalExercise.findById(txs.Exercise_Profile)
                .select('Individual_Mile.Daily_Mile_Fitbit Individual_Mile.Daily_Mile_Self_Report Individual_Mile.Daily_Mile_Mix Individual_Mile.Daily_Incomplete_Mile')
                .exec(function (err, txs) {
                    result = result.concat(txs)
                    res.json(result)
                })
    });
})

router.get('/WeeklyStep/:UID', async (req, res) => {
    let result  = []; 
    Users.findById(req.params.UID)
    .select('Today StartofWeek EndofWeek Goal.Weekly_Step_Goal Exercise_Profile')
        .exec(function (err, txs) {
            result = result.concat(txs)
            PersonalExercise.findById(txs.Exercise_Profile)
                .select('Individual_Step.Weekly_Step_Fitbit_Total Individual_Step.Weekly_Step_Self_Report_Total Individual_Step.Weekly_Step_Mix_Total Individual_Step.Weekly_Step_Fitbit_Record Individual_Step.Weekly_Step_Self_Report_Record Individual_Step.Weekly_Step_Mix_Record Individual_Step.Weekly_Incomplete_Step')
                .exec(function (err, txs) {
                    result = result.concat(txs)
                    res.json(result)
                })
    });
})

router.get('/WeeklyMiles/:UID', async (req, res) => {
    let result  = []; 
    Users.findById(req.params.UID)
    .select('Today StartofWeek EndofWeek Goal.Weekly_Mile_Goal Exercise_Profile')
        .exec(function (err, txs) {
            result = result.concat(txs)
            PersonalExercise.findById(txs.Exercise_Profile)
                .select('Individual_Mile.Weekly_Mile_Fitbit_Total Individual_Mile.Weekly_Mile_Self_Report_Total Individual_Mile.Weekly_Mile_Mix_Total Individual_Mile.Weekly_Mile_Fitbit_Record Individual_Mile.Weekly_Mile_Self_Report_Record Individual_Mile.Weekly_Mile_Mix_Record Individual_Mile.Weekly_Incomplete_Mile')
                .exec(function (err, txs) {
                    result = result.concat(txs)
                    res.json(result)
                })
    });
})

router.get('/FV/:UID', async (req, res) => {
    let result  = []; 
    Users.findById(req.params.UID)
        .select('Today StartofWeek EndofWeek Exercise_Profile')
        .exec(function (err, txs) {
            PersonalExercise.findById(txs.Exercise_Profile)
            .select('Individual_FV.FV_Goal Individual_FV.Daily_FV_Report Individual_FV.Weekly_FV_Report')
                .exec(function (err, txs) {
                    result = result.concat(txs)
                    res.json(result)
                })
        });
})

router.get('/OverallStep/:UID', async (req, res) => {
    let result  = []; 
    Users.findById(req.params.UID)
        .select('Today Exercise_Profile')
        .exec(function (err, txs) {
            PersonalExercise.findById(txs.Exercise_Profile)
            .select('Individual_Step.Program_Step_Fitbit Individual_Step.Program_Step_Mix Individual_Step.Annual_Step Individual_Step.Total_Step')
                .exec(function (err, txs) {
                    result = result.concat(txs)
                    res.json(result)
                })
        });
   
})

router.get('/OverallMile/:UID', async (req, res) => {
    let result  = []; 
    Users.findById(req.params.UID)
        .select('Today Exercise_Profile')
        .exec(function (err, txs) {
            PersonalExercise.findById(txs.Exercise_Profile)
            .select('Individual_Mile.Program_Mile_Fitbit Individual_Mile.Program_Mile_Mix Individual_Mile.Annual_Mile Individual_Mile.Total_Mile')
                .exec(function (err, txs) {
                    result = result.concat(txs)
                    res.json(result)
                })
        });
})

router.get('/DailyActivityReport/:UID', async (req, res) => {
    let result  = []; 
    Users.findById(req.params.UID)
        .select('Today Self_Report_Profile')
        .exec(function (err, txs) {
            //result = result.concat(txs)
            SelfReport.findById(txs.Self_Report_Profile)
            .select('Daily_Activity')
                .exec(function (err, txs) {
                    result = result.concat(txs.Daily_Activity)
                    result.forEach(element => {
                        
                    });

                   res.json(result)
                })
        });
    
})




//unfinished
router.get('/WeeklyActivityReport/:UID', async (req, res) => {
   
})

router.get('/WeeklyStepRecord/:UID', async (req, res) => {
    let result  = []; 
    Users.findById(req.params.UID)
    .select('Today StartofWeek EndofWeek Goal.Weekly_Step_Goal Exercise_Profile')
        .exec(function (err, txs) {
            result = result.concat(txs)
            PersonalExercise.findById(txs.Exercise_Profile)
                .select('Individual_Step.Weekly_Step_Fitbit_Record Individual_Step.Weekly_Step_Self_Report_Record Individual_Step.Weekly_Step_Mix_Record Individual_Step.Weekly_Incomplete_Step')
                .exec(function (err, txs) {
                    result = result.concat(txs)
                    res.json(result)
                })
    });
})

router.get('/WeeklyMileRecord/:UID', async (req, res) => {
    let result  = []; 
    Users.findById(req.params.UID)
    .select('Today StartofWeek EndofWeek Goal.Weekly_Mile_Goal Exercise_Profile')
        .exec(function (err, txs) {
            result = result.concat(txs)
            PersonalExercise.findById(txs.Exercise_Profile)
                .select('Individual_Mile.Weekly_Mile_Fitbit_Record Individual_Mile.Weekly_Mile_Self_Report_Record Individual_Mile.Weekly_Mile_Mix_Record Individual_Mile.Weekly_Incomplete_Mile')
                .exec(function (err, txs) {
                    result = result.concat(txs)
                    res.json(result)
                })
    });
})



router.get('/', function (req, res, next) {
    res.render('hey this worked');
});

router.get('/another/route', function (req, res, next) {
    res.json({ hello: 'world' });
});

module.exports = router;