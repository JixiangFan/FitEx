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
    teamName = "testTeam1"
    num = 5
    Promise.all([createLeaderUser(1), createLeaderUser(2), createLeaderUser(3), createLeaderUser(4)])
        .then(function (results) {
            //create four teams
            results.forEach((result) => {
                createTeam(result.data, teamName).then(function (result) {
                    //create 5 user for all teams
                    Promise.all([createGeneralUser(num, result.data), createGeneralUser(num + 1, result.data), createGeneralUser(num + 2, result.data), createGeneralUser(num + 3, result.data), createGeneralUser(num + 4, result.data)])
                    num += 5
                })
            })
        });
})

router.get('/applyDummyExercise', async (req, res) => {
    Users.find({}).exec((err, doc) => {
        if (err) console.log(err)
        time = 1
        Job = []
        doc.forEach((user) => {
            for (let i = 0; i < time; i++)
            {
                newExercise(user.id)
            }
            time += 1
        })
        res.send("done")
    })
})

async function newExercise(userId) {
    Activity_Name = "test Activity_Name"
    Activity_Description = "test Activity_Description "
    Activity_Time_Hours = 1
    Activity_Time_Minutes = 1
    Activity_Time_Minutes_Total = 1
    Activity_Miles = 10
    Activity_Steps = 10
    const activity = {
        User: userId,
        Activty_Date: Date.now(),
        Activity_Name: Activity_Name,
        Activity_Description: Activity_Description,
        Activity_Time_Hours: Activity_Time_Hours,
        Activity_Time_Minutes: Activity_Time_Minutes,
        Activity_Time_Minutes_Total: Activity_Time_Minutes_Total,
        Activity_Miles: Activity_Miles,
        Activity_Steps: Activity_Steps,
    }

    const newSelfReportActivity = new Schemas.SelfReportActivity(activity);
    await newSelfReportActivity.save(async (err, newActivityResult) => {
        if (err)
        {
            console.log(err)
            res.end(err)
        }
        else
        {
            const filter = { User: userId };
            const update = {
                $push: {
                    Daily_Activity: newActivityResult.id,
                    Weekly_Activity: newActivityResult.id,
                    Program_Activity: newActivityResult.id,
                }
            };
            selfReportUpdate = await SelfReport.updateOne(filter, update, { upsert: true });
            //console.log(`Updated ${selfReportUpdate.modifiedCount} documents in users collections`);
            const filter2 = { User: userId };
            const update2 = {
                $inc: {
                    'Individual_Step.Daily_Step_Self_Report': Activity_Steps,
                    'Individual_Step.Daily_Step_Mix': Activity_Steps,
                    'Individual_Step.Daily_Incomplete_Step': -(Activity_Steps),
                    'Individual_Step.Weekly_Step_Self_Report_Total': Activity_Steps,
                    'Individual_Step.Weekly_Step_Mix_Total': Activity_Steps,

                    'Individual_Mile.Daily_Mile_Self_Report': Activity_Miles,
                    'Individual_Mile.Daily_Mile_Mix': Activity_Miles,
                    'Individual_Mile.Daily_Incomplete_Mile': -(Activity_Miles),
                    'Individual_Mile.Weekly_Mile_Self_Report_Total': Activity_Miles,
                    'Individual_Mile.Weekly_Mile_Mix_Total': Activity_Miles,
                },
            };
            personalExerciseUpdate = await PersonalExercise.updateOne(filter2, update2, { upsert: true }).clone();
            //console.log(`Updated ${personalExerciseUpdate.modifiedCount} documents in comments collections`);
            const filter3 = { Team_Member: userId };
            const update3 = {
                $inc: {
                    'Team_Exercise_Data.Team_Daily_Steps': Activity_Steps,
                    'Team_Exercise_Data.Team_Weekly_Steps_Total': Activity_Steps,
                    'Team_Exercise_Data.Team_Daily_Miles': Activity_Miles,
                    'Team_Exercise_Data.Team_Weekly_Miles_Total': Activity_Miles,
                },

            }

            teamUpdate = await Teams.updateOne(filter3, update3, { upsert: true }).clone();
            console.log(`Updated ${teamUpdate.modifiedCount} documents in comments collections`);
        }
    })
}

function addExercise(userID) {
    return axios.post("http://localhost:5000/exerciseupdate/newSelfReportActivity", {
        userId: userID,
        Activity_Name: "name",
        Activity_Description: "description",
        Activity_Time_Hours: 1,
        Activity_Time_Minutes: 2,
        Activity_Time_Minutes_Total: 3,
        Activity_Miles: 10,
        Activity_Steps: 10,
    })
}

function createTeam(leaderID, teamName) {
    return axios.post("http://localhost:5000/register/CreateTeam", {
        userID: leaderID,
        Team_Name: teamName,
        Team_Daily_Step_Goal: 1000,
        Team_Daily_Mile_Goal: 1000,
        Team_Weekly_Step_Goal: 7000,
        Team_Weekly_Mile_Goal: 7000,
    })
}

function createGeneralUser(num, teamID) {
    return axios.post("http://localhost:5000/register/AddUserWithTeam", {
        First_Name: ("First_Name" + num),
        Last_Name: ("Last_Name" + num),
        Middle_Name: ("Middle_Name" + num),
        User_Name: ("User_Name" + num),
        Avater: "Avater",
        Email: ("Email" + num),
        Password: ("Password" + num),
        Location: "Location",
        Gender: "male",
        Age: 11,
        Weight: 111,
        Height_feet: 3,
        Height_Inch: 2,
        Height_Inch_total: 44,
        Device: "Fitbit",
        Fitbit_Access_Token: ("Fitbit_Access_Token" + num),
        Daily_Step_Goal: 1000,
        Daily_Mile_Goal: 1000,
        Weekly_Step_Goal: 7000,
        Weekly_Mile_Goal: 7000,
        Daily_FV_Goal: 10,
        Weekly_FV_Goal: 70,
        User_Type: "Member",
        Unit_Prefernece: "Step",
        Daily_Carloies_Goal: 1000,
        Weekly_Carloies_Goal: 7,
        FV_Goal: 3,
        Team_ID: teamID,
    });
}

function createLeaderUser(num) {
    return axios.post("http://localhost:5000/register/AddUserWithoutTeam", {
        First_Name: ("First_Name" + num),
        Last_Name: ("Last_Name" + num),
        Middle_Name: ("Middle_Name" + num),
        User_Name: ("User_Name" + num),
        Avater: "Avater",
        Email: ("Email" + num),
        Password: ("Password" + num),
        Location: "Location",
        Gender: "male",
        Age: 11,
        Weight: 111,
        Height_feet: 3,
        Height_Inch: 2,
        Height_Inch_total: 44,
        Device: "Fitbit",
        Fitbit_Access_Token: ("Fitbit_Access_Token" + num),
        Daily_Step_Goal: 1000,
        Daily_Mile_Goal: 1000,
        Weekly_Step_Goal: 7000,
        Weekly_Mile_Goal: 7000,
        Daily_FV_Goal: 10,
        Weekly_FV_Goal: 70,
        User_Type: "Member",
        Unit_Prefernece: "Step",
        Daily_Carloies_Goal: 1000,
        Weekly_Carloies_Goal: 7,
        FV_Goal: 3,

    });
}


module.exports = router;