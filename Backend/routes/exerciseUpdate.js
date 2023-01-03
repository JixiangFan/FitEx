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
            userUpdate = await SelfReport.updateOne(filter, update,{ upsert : true });
            console.log(`Updated ${userUpdate.modifiedCount} documents in users collections`);
            const filter2 = { User: req.body.userId };
            const update2 = {
                $inc: {
                    Daily_Step_Self_Report: req.body.Activity_Steps,
                    Daily_Step_Mix: req.body.Activity_Steps,
                    Daily_Incomplete_Step: -(req.body.Activity_Steps),
                    Daily_Mile_Self_Report: req.body.Activity_Steps,
                    Daily_Mile_Mix: req.body.Activity_Steps,
                    Daily_Incomplete_Mile: -(req.body.Activity_Steps),
                  },
            };
            commentUpdate = await PersonalExercise.updateOne(filter2, update2,{ upsert : true },function (err, docs) {
                if (err)
                {
                    console.log(err)
                    res.end('fail to update leader profile' + err)
                } else
                {
                    console.log(docs)
                }  
            }).clone();;
            console.log(`Updated ${commentUpdate.modifiedCount} documents in comments collections`);
            res.end("success")
        }
    })
})

module.exports = router;