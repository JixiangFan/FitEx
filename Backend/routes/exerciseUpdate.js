var express = require('express');
const { Users, Teams, SelfReportActivity, SelfReport, Ranking, PersonalExercise } = require('../models/Schemas.js');

var router = express.Router();
const Schemas = require('../models/Schemas.js');

router.get('/test', async (req, res) => {
    res.send("good Test")
})

router.post('/newSelfReportActivity', async (req, res) => {
    const activity = {
        User: req.body.userId,
        Activty_Date: Date.now(),
        Activity_Name: req.body.Activity_Name,
        Activity_Description: req.body.Activity_Description,
        Activity_Time_Hours: req.body.Activity_Time_Hours,
        Activity_Time_Minutes: req.body.Activity_Time_Minutes,
        Activity_Time_Minutes_Total: req.body.Activity_Time_Minutes_Total,
        Activity_Miles: req.body.Activity_Miles,
        Activity_Steps: req.body.Activity_Steps,
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
            const filter = { User: req.body.userId };
            const update = { $push: { Daily_Activity: newActivityResult.id } };
            selfReportUpdate = await SelfReport.updateOne(filter, update, { upsert: true });
            //console.log(`Updated ${selfReportUpdate.modifiedCount} documents in users collections`);
            const filter2 = { User: req.body.userId };
            const update2 = {
                $inc: {
                    'Individual_Step.Daily_Step_Self_Report': req.body.Activity_Steps,
                    'Individual_Step.Daily_Step_Mix': req.body.Activity_Steps,
                    'Individual_Step.Daily_Incomplete_Step': -(req.body.Activity_Steps),
                    'Individual_Mile.Daily_Mile_Self_Report': req.body.Activity_Miles,
                    'Individual_Mile.Daily_Mile_Mix': req.body.Activity_Miles,
                    'Individual_Mile.Daily_Incomplete_Mile': -(req.body.Activity_Miles),
                },
            };
            personalExerciseUpdate = await PersonalExercise.updateOne(filter2, update2, { upsert: true }).clone();
            //console.log(`Updated ${personalExerciseUpdate.modifiedCount} documents in comments collections`);
            const filter3 = { Team_Member: req.body.userId };
            const update3 = {
                $inc: {
                    'Team_Exercise_Data.Team_Daily_Steps': req.body.Activity_Steps,
                    'Team_Exercise_Data.Team_Weekly_Steps_Total': req.body.Activity_Steps,
                    'Team_Exercise_Data.Team_Daily_Miles': req.body.Activity_Miles,
                    'Team_Exercise_Data.Team_Weekly_Miles_Total': req.body.Activity_Miles,
                },

            }

            teamUpdate = await Teams.updateOne(filter3, update3, { upsert: true }).clone();
            console.log(`Updated ${teamUpdate.modifiedCount} documents in comments collections`);



            res.end("success")
        }
    })
})


router.get('/dailyUpdate', async (req, res) => {
    const d = new Date();
    let day = d.getDay() - 1
    //update team record
    Teams.find({}).exec((err, doc) => {
        if (err) { console.log(err) }
        doc.forEach((team) => {
            console.log(team.id)
            console.log(team.Team_Exercise_Data.Team_Weekly_Steps_Record[day])
            team.Team_Exercise_Data.Team_Weekly_Steps_Record[day] = team.Team_Exercise_Data.Team_Daily_Steps
            
            
        })
    })

   
    // await Teams.updateMany({}, {
    //     $set: {
    //         'Team_Exercise_Data.Team_Daily_Steps': req.body.Activity_Steps,
    //         'Team_Exercise_Data.Team_Weekly_Steps_Total': req.body.Activity_Steps,
    //         'Team_Exercise_Data.Team_Daily_Miles': req.body.Activity_Miles,
    //         'Team_Exercise_Data.Team_Weekly_Miles_Total': req.body.Activity_Miles,
    //     },

    // }, { upsert: true }).clone();
    // console.log(`Updated ${TeamUpdate.modifiedCount} documents in comments collections`);
    res.end("success")
})


router.get('/weeklyUpdate', async (req, res) => {
    res.send("good Test")
})



module.exports = router;