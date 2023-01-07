var express = require('express');
const { Users, Teams, SelfReportActivity, SelfReport, Ranking, PersonalExercise, ProgramDate } = require('../models/Schemas.js');

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
            const update = {
                $push: {
                    Daily_Activity: newActivityResult.id,
                    Weekly_Activity: newActivityResult.id,
                    Program_Activity: newActivityResult.id,
                }
            };
            selfReportUpdate = await SelfReport.updateOne(filter, update, { upsert: true });
            //console.log(`Updated ${selfReportUpdate.modifiedCount} documents in users collections`);
            const filter2 = { User: req.body.userId };
            const update2 = {
                $inc: {
                    'Individual_Step.Daily_Step_Self_Report': req.body.Activity_Steps,
                    'Individual_Step.Daily_Step_Mix': req.body.Activity_Steps,
                    'Individual_Step.Daily_Incomplete_Step': -(req.body.Activity_Steps),
                    'Individual_Step.Weekly_Step_Self_Report_Total': req.body.Activity_Steps,
                    'Individual_Step.Weekly_Step_Mix_Total': req.body.Activity_Steps,

                    'Individual_Mile.Daily_Mile_Self_Report': req.body.Activity_Miles,
                    'Individual_Mile.Daily_Mile_Mix': req.body.Activity_Miles,
                    'Individual_Mile.Daily_Incomplete_Mile': -(req.body.Activity_Miles),
                    'Individual_Mile.Weekly_Mile_Self_Report_Total': req.body.Activity_Miles,
                    'Individual_Mile.Weekly_Mile_Mix_Total': req.body.Activity_Miles,
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
    ProgramDate.find({}).exec((err, doc) => {
        console.log(doc[0].DayofWeek)
        let day = doc[0].DayofWeek - 1
        // ------update team record
        Teams.find({}).exec((err, doc) => {
            if (err) { console.log(err) }
            doc.forEach((team) => {
                var StepsRecord = team.Team_Exercise_Data.Team_Weekly_Steps_Record
                StepsRecord[day] = team.Team_Exercise_Data.Team_Daily_Steps
                var MilesRecord = team.Team_Exercise_Data.Team_Weekly_Mile_Record
                MilesRecord[day] = team.Team_Exercise_Data.Team_Daily_Miles
                Teams.findByIdAndUpdate(team.id, {
                    $set: {
                        "Team_Exercise_Data.Team_Weekly_Steps_Record": StepsRecord,
                        "Team_Exercise_Data.Team_Weekly_Mile_Record": MilesRecord,
                        "Team_Exercise_Data.Team_Daily_Steps": 0,
                        "Team_Exercise_Data.Team_Daily_Miles": 0,
                    }
                }).exec()
            })
        })
        PersonalExercise.find({}).exec((err, doc) => {
            if (err) { console.log(err) }
            doc.forEach((Member) => {
                var Weekly_Step_Fitbit_Record = Member.Individual_Step.Weekly_Step_Fitbit_Record
                Weekly_Step_Fitbit_Record[day] = Member.Individual_Step.Daily_Step_Fitbit
                var Weekly_Step_Self_Report_Record = Member.Individual_Step.Weekly_Step_Self_Report_Record
                Weekly_Step_Self_Report_Record[day] = Member.Individual_Step.Daily_Step_Self_Report
                var Weekly_Step_Mix_Record = Member.Individual_Step.Weekly_Step_Mix_Record
                Weekly_Step_Mix_Record[day] = Member.Individual_Step.Daily_Step_Mix
                var Weekly_Incomplete_Step = Member.Individual_Step.Weekly_Incomplete_Step
                Weekly_Incomplete_Step[day] = Member.Individual_Step.Daily_Incomplete_Step
                PersonalExercise.findByIdAndUpdate(Member.id, {
                    $set: {
                        "Individual_Step.Weekly_Step_Fitbit_Record": Weekly_Step_Fitbit_Record,
                        "Individual_Step.Weekly_Step_Self_Report_Record": Weekly_Step_Self_Report_Record,
                        "Individual_Step.Weekly_Step_Mix_Record": Weekly_Step_Mix_Record,
                        "Individual_Step.Daily_Step_Fitbit": 0,
                        "Individual_Step.Daily_Step_Self_Report": 0,
                        "Individual_Step.Daily_Step_Mix": 0,
                        "Individual_Step.Daily_Incomplete_Step": Member.Individual_Step.Daily_Step_Goal,
                    },
                    $inc: {
                        "Individual_Step.Total_Step": Member.Individual_Step.Daily_Step_Mix,
                    }
                }).exec()

                var Weekly_Mile_Fitbit_Record = Member.Individual_Mile.Weekly_Mile_Fitbit_Record
                Weekly_Mile_Fitbit_Record[day] = Member.Individual_Mile.Daily_Mile_Fitbit
                var Weekly_Mile_Self_Report_Record = Member.Individual_Mile.Weekly_Mile_Self_Report_Record
                Weekly_Mile_Self_Report_Record[day] = Member.Individual_Mile.Daily_Mile_Self_Report
                var Weekly_Mile_Mix_Record = Member.Individual_Mile.Weekly_Mile_Mix_Record
                Weekly_Mile_Mix_Record[day] = Member.Individual_Mile.Daily_Mile_Mix
                var Weekly_Incomplete_Mile = Member.Individual_Mile.Weekly_Incomplete_Mile
                Weekly_Incomplete_Mile[day] = Member.Individual_Mile.Daily_Incomplete_Mile
                PersonalExercise.findByIdAndUpdate(Member.id, {
                    $set: {
                        "Individual_Mile.Weekly_Mile_Fitbit_Record": Weekly_Mile_Fitbit_Record,
                        "Individual_Mile.Weekly_Mile_Self_Report_Record": Weekly_Mile_Self_Report_Record,
                        "Individual_Mile.Weekly_Mile_Mix_Record": Weekly_Mile_Mix_Record,
                        "Individual_Mile.Daily_Mile_Fitbit": 0,
                        "Individual_Mile.Daily_Mile_Self_Report": 0,
                        "Individual_Mile.Daily_Mile_Mix": 0,
                        "Individual_Mile.Daily_Incomplete_Mile": Member.Individual_Mile.Daily_Mile_Goal,
                    }
                }).exec()

                var Weekly_Carloies_Fitbit_Record = Member.Individual_Carloies.Weekly_Carloies_Fitbit_Record
                Weekly_Carloies_Fitbit_Record[day] = Member.Individual_Carloies.Daily_Carloies_Fitbit
                var Weekly_Carloies_Self_Report_Record = Member.Individual_Carloies.Weekly_Carloies_Self_Report_Record
                Weekly_Carloies_Self_Report_Record[day] = Member.Individual_Carloies.Daily_Carloies_Self_Report
                var Weekly_Carloies_Mix_Record = Member.Individual_Carloies.Weekly_Carloies_Mix_Record
                Weekly_Carloies_Mix_Record[day] = Member.Individual_Carloies.Daily_Carloies_Mix
                var Weekly_Incomplete_Carloies = Member.Individual_Carloies.Weekly_Incomplete_Carloies
                Weekly_Incomplete_Carloies[day] = Member.Individual_Carloies.Daily_Incomplete_Carloies
                PersonalExercise.findByIdAndUpdate(Member.id, {
                    $set: {
                        "Individual_Carloies.Weekly_Carloies_Fitbit_Record": Weekly_Carloies_Fitbit_Record,
                        "Individual_Carloies.Weekly_Carloies_Self_Report_Record": Weekly_Carloies_Self_Report_Record,
                        "Individual_Carloies.Weekly_Carloies_Mix_Record": Weekly_Carloies_Mix_Record,
                        "Individual_Carloies.Daily_Carloies_Fitbit": 0,
                        "Individual_Carloies.Daily_Carloies_Self_Report": 0,
                        "Individual_Carloies.Daily_Carloies_Mix": 0,
                        "Individual_Carloies.Daily_Incomplete_Carloies": Member.Individual_Carloies.Daily_Carloies_Goal,
                    }
                }).exec()

                var Weekly_FV_Report = Member.Individual_FV.Weekly_FV_Report
                Weekly_FV_Report[day] = Member.Individual_FV.Daily_FV_Report
                PersonalExercise.findByIdAndUpdate(Member.id, {
                    $set: {
                        "Individual_FV.Weekly_FV_Report": Weekly_FV_Report,
                        "Individual_FV.Daily_FV_Report": 0,
                    }
                }).exec()

                const filter = { User: Member.User };
                const update = {
                    $set: {
                        Daily_Activity: []
                    }
                };
                SelfReport.updateMany(filter, update).exec((err, doc) => {
                    if (err) { console.log(err) }
                    console.log(doc)
                });


            })
            res.end("success")
        })
    })
})
function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}
function getSunday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day
    return new Date(d.setDate(diff));
}

router.get('/startOfDay', async (req, res) => {
    var dt = new Date()

    ProgramDate.findOneAndUpdate({}, {
        $set: {
            Today: dt,
            StartofWeek: getMonday(dt),
            EndofWeek: getSunday(dt),
            DayofWeek: dt.getDay(),
        },
        $inc: {
            DayCount: 1
        }
    }).exec((err, doc) => {
        if (err) { console.log(err) }
        console.log(doc)
        Ranking.create({ Date: dt, DayCount: doc.DayCount + 1 }, function (err, small) {
            if (err) return handleError(err);
            res.end("start today: " + dt)
        });

    })
})

router.get('/startOfWeek', async (req, res) => {
    var dt = new Date()
    ProgramDate.updateOne({}, {
        $inc: {
            WeekCount: 1
        }
    }).exec((err, doc) => {
        if (err) { console.log(err) }
        res.end("start week")
    })
})
//three update may have sync problem fix later
router.get('/weeklyUpdate', async (req, res) => {
    ProgramDate.find({}).exec((err, doc) => {
        let WeekCount = doc[0].WeekCount
        // ------update team record
        Teams.find({}).exec((err, doc) => {
            if (err) { console.log(err) }
            doc.forEach((team) => {
                Teams.findByIdAndUpdate(team.id, {
                    $set: {
                        [`Team_Exercise_Data.Team_Program_Steps.${WeekCount}`]: team.Team_Exercise_Data.Team_Weekly_Steps_Total,
                        [`Team_Exercise_Data.Team_Program_Miles.${WeekCount}`]: team.Team_Exercise_Data.Team_Weekly_Miles_Total,
                        [`Team_Exercise_Data.Team_Program_Carloies.${WeekCount}`]: team.Team_Exercise_Data.Team_Weekly_Carloies_Total,
                        "Team_Exercise_Data.Team_Weekly_Steps_Record": [0, 0, 0, 0, 0, 0, 0],
                        "Team_Exercise_Data.Team_Weekly_Mile_Record": [0, 0, 0, 0, 0, 0, 0],
                        "Team_Exercise_Data.Team_Weekly_Carloies_Record": [0, 0, 0, 0, 0, 0, 0],
                        "Team_Exercise_Data.Team_Daily_Steps": 0,
                        "Team_Exercise_Data.Team_Daily_Miles": 0,
                        "Team_Exercise_Data.Team_Daily_Carloies": 0,

                        "Team_Exercise_Data.Team_Weekly_Steps_Total": 0,
                        "Team_Exercise_Data.Team_Weekly_Miles_Total": 0,
                        "Team_Exercise_Data.Team_Weekly_Carloies_Total": 0,
                    }
                }).exec()
            })
        })
        PersonalExercise.find({}).exec((err, doc) => {
            if (err) { console.log(err) }
            doc.forEach((Member) => {
                PersonalExercise.findByIdAndUpdate(Member.id, {
                    $set: {
                        "Individual_Step.Weekly_Step_Fitbit_Record": [0, 0, 0, 0, 0, 0, 0],
                        "Individual_Step.Weekly_Step_Self_Report_Record": [0, 0, 0, 0, 0, 0, 0],
                        "Individual_Step.Weekly_Step_Mix_Record": [0, 0, 0, 0, 0, 0, 0],
                        "Individual_Step.Weekly_Incomplete_Step": [0, 0, 0, 0, 0, 0, 0],
                        "Individual_Step.Daily_Step_Fitbit": 0,
                        "Individual_Step.Daily_Step_Self_Report": 0,
                        "Individual_Step.Daily_Step_Mix": 0,
                        "Individual_Step.Daily_Incomplete_Step": Member.Individual_Step.Daily_Step_Goal,
                        "Individual_Step.Weekly_Step_Fitbit_Total": 0,
                        "Individual_Step.Weekly_Step_Self_Report_Total": 0,
                        "Individual_Step.Weekly_Step_Mix_Total": 0,
                        [`Team_Exercise_Data.Program_Step_Fitbit.${WeekCount}`]: team.Team_Exercise_Data.Weekly_Step_Fitbit_Record,
                        [`Team_Exercise_Data.Program_Step_Mix.${WeekCount}`]: team.Team_Exercise_Data.Team_Weekly_Carloies_Total,
                        "Individual_Mile.Weekly_Mile_Fitbit_Record": [0, 0, 0, 0, 0, 0, 0],
                        "Individual_Mile.Weekly_Mile_Self_Report_Record": [0, 0, 0, 0, 0, 0, 0],
                        "Individual_Mile.Weekly_Mile_Mix_Record": [0, 0, 0, 0, 0, 0, 0],
                        "Individual_Mile.Weekly_Incomplete_Mile": [0, 0, 0, 0, 0, 0, 0],
                        "Individual_Mile.Daily_Mile_Fitbit": 0,
                        "Individual_Mile.Daily_Mile_Self_Report": 0,
                        "Individual_Mile.Daily_Mile_Mix": 0,
                        "Individual_Mile.Daily_Incomplete_Mile": Member.Individual_Mile.Daily_Mile_Goal,
                        "Individual_Mile.Weekly_Mile_Fitbit_Total": 0,
                        "Individual_Mile.Weekly_Mile_Self_Report_Total": 0,
                        "Individual_Mile.Weekly_Mile_Mix_Total": 0,
                        [`Team_Exercise_Data.Program_Mile_Fitbit.${WeekCount}`]: team.Team_Exercise_Data.Weekly_Mile_Fitbit_Record,
                        [`Team_Exercise_Data.Program_Mile_Mix.${WeekCount}`]: team.Team_Exercise_Data.Team_Weekly_Carloies_Total,
                        "Individual_Carloies.Weekly_Carloies_Fitbit_Record": [0, 0, 0, 0, 0, 0, 0],
                        "Individual_Carloies.Weekly_Carloies_Self_Report_Record": [0, 0, 0, 0, 0, 0, 0],
                        "Individual_Carloies.Weekly_Carloies_Mix_Record": [0, 0, 0, 0, 0, 0, 0],
                        "Individual_Carloies.Weekly_Incomplete_Carloies": [0, 0, 0, 0, 0, 0, 0],
                        "Individual_Carloies.Daily_Carloies_Fitbit": 0,
                        "Individual_Carloies.Daily_Carloies_Self_Report": 0,
                        "Individual_Carloies.Daily_Carloies_Mix": 0,
                        "Individual_Carloies.Daily_Incomplete_Carloies": Member.Individual_Carloies.Daily_Carloies_Goal,
                        "Individual_Carloies.Weekly_Carloies_Fitbit_Total": 0,
                        "Individual_Carloies.Weekly_Carloies_Self_Report_Total": 0,
                        "Individual_Carloies.Weekly_Carloies_Mix_Total": 0,
                        [`Team_Exercise_Data.Program_Carloies_Fitbit.${WeekCount}`]: team.Team_Exercise_Data.Weekly_Carloies_Fitbit_Record,
                        [`Team_Exercise_Data.Program_Carloies_Mix.${WeekCount}`]: team.Team_Exercise_Data.Team_Weekly_Carloies_Total,
                        "Individual_FV.Daily_FV_Report": 0,
                        "Individual_FV.Weekly_FV_Report": [0, 0, 0, 0, 0, 0, 0],
                    }
                }).exec()

            })
            res.end("success")
        })
        const filter = {};
        const update = {
            $set: {
                Daily_Activity: [],
                Weekly_Activity: []
            }
        };
        SelfReport.updateMany(filter, update).exec((err, doc) => {
            if (err) { console.log(err) }
        });

        res.send("done")
    })

})

router.get('/dailyRankingUpdate', async (req, res) => {
    ProgramDate.find({}).exec((err, doc) => {
        let WeekCount = doc[0].WeekCount
        let DayCount = doc[0].DayCount
        let DayofWeek = doc[0].DayofWeek - 1
        //Individual_Rankings
        //Daily_Individual_Ranking
        //Program_Individual_Ranking
        //Weekly_Individual_Ranking
        PersonalExercise.aggregate([
            { $match: {} },
            {
                $group: {
                    _id: "$User",
                    step: {
                        $sum: "$Individual_Step.Daily_Step_Mix"
                    }
                }
            },
            { $sort: { step: -1 } },
            {
                $group: {
                    _id: null,
                    PersonalExercise: { $push: { User: "$_id", Step: "$step" } }
                }
            },
            { "$unwind": { "path": "$PersonalExercise", "includeArrayIndex": "PersonalExercise.rank" } },
            {
                $replaceRoot: {
                    newRoot: "$PersonalExercise"
                }
            },
            {
                $addFields: {
                    rank: {
                        $add: [
                            "$rank",
                            1
                        ]
                    }
                }
            }
        ]).exec((err, doc) => {
            if (err) console.log(err)
            doc.forEach((result) => {
                PersonalExercise.findOneAndUpdate(
                    { User: result.User },
                    {
                        $set: {
                            "Individual_Rankings.Daily_Individual_Ranking": result.rank,
                            [`Individual_Rankings.Program_Individual_Ranking.${DayCount}`]: result.rank
                        },
                    }).exec((err, doc) => {
                        if (err) console.log(err)
                        let update = doc.Individual_Rankings.Weekly_Individual_Ranking
                        update[DayofWeek] = result.rank
                        PersonalExercise.findOneAndUpdate({ User: result.User }, {
                            $set: {
                                "Individual_Rankings.Weekly_Individual_Ranking": update,
                            },
                        }).exec()
                    })

                if (result.rank <= 10)
                {
                    rankUpdate = {
                        $push: {
                            Daily_Top10_Individual: result.User,
                            Daily_Overall_Individual: result.User,
                        }
                    }
                }
                else
                {
                    rankUpdate = {
                        $push: {
                            Daily_Overall_Individual: result.User,
                        }
                    }
                }
                Ranking.updateOne(
                    { DayCount: DayCount }, rankUpdate
                ).exec()


            })


        })

        PersonalExercise.aggregate([
            { $match: {} },
            {
                $group: {
                    _id: "$User",
                    step: {
                        $sum: "$Individual_Step.Weekly_Step_Mix_Total"
                    }
                }
            },
            { $sort: { step: -1 } },
            {
                $group: {
                    _id: null,
                    PersonalExercise: { $push: { User: "$_id", Step: "$step" } }
                }
            },
            { "$unwind": { "path": "$PersonalExercise", "includeArrayIndex": "PersonalExercise.rank" } },
            {
                $replaceRoot: {
                    newRoot: "$PersonalExercise"
                }
            },
            {
                $addFields: {
                    rank: {
                        $add: [
                            "$rank",
                            1
                        ]
                    }
                }
            }
        ]).exec((err, doc) => {
            if (err) console.log(err)
            doc.forEach((result) => {
                PersonalExercise.findOneAndUpdate(
                    { User: result.User },
                    {
                        $set: {
                            "Individual_Rankings.Weekly_Individual_Ranking": result.rank,
                        },
                    }).exec((err, doc) => {
                        if (err) console.log(err)
                        let update = doc.Individual_Rankings.Weekly_Individual_Ranking
                        update[DayofWeek] = result.rank
                        PersonalExercise.findOneAndUpdate({ User: result.User }, {
                            $set: {
                                "Individual_Rankings.Weekly_Individual_Ranking": update,
                            },
                        }).exec()
                    })

                if (result.rank <= 10)
                {
                    rankUpdate = {
                        $push: {
                            Daily_Top10_Individual: result.User,
                            Daily_Overall_Individual: result.User,
                        }
                    }
                }
                else
                {
                    rankUpdate = {
                        $push: {
                            Daily_Overall_Individual: result.User,
                        }
                    }
                }
                Ranking.updateOne(
                    { DayCount: DayCount }, rankUpdate
                ).exec()


            })


        })

        res.send("done")
    })
})


module.exports = router;