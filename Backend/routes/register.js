var express = require('express');
const { Users, Teams } = require('../models/Schemas.js');

var router = express.Router();
const Schemas = require('../models/Schemas.js');

router.get('/test', async (req, res) => {
    res.send("good Test")
})


router.post('/AddUserWithoutTeam', async (req, res) => {

    const user = {
        Name: {
            First_Name: req.body.First_Name,
            Last_Name: req.body.Last_Name,
            Middle_Name: req.body.Middle_Name,
        },
        User_Name: req.body.User_Name,
        Avater: req.body.Avater,
        Email: req.body.Email,
        Password: req.body.Password,
        Location: req.body.Location,
        Gender: req.body.Gender,
        Age: req.body.Age,
        Weight: req.body.Weight,
        Height: {
            Height_feet: req.body.Height_feet,
            Height_Inch: req.body.Height_Inch,
            Height_Inch_total: req.body.Height_Inch_total,
        },
        Device: req.body.Device,
        Last_Sync_Time: Date.now(),
        Today: Date.now(),
        StartofWeek: Date.now(), //future update
        EndofWeek: Date.now(), //future update
        Fitbit_Access_Token: req.body.Fitbit_Access_Token,
        Goal: {
            Daily_Step_Goal: req.body.Daily_Step_Goal,
            Daily_Mile_Goal: req.body.Daily_Mile_Goal,
            Weekly_Step_Goal: req.body.Weekly_Step_Goal,
            Weekly_Mile_Goal: req.body.Weekly_Mile_Goal,
            Daily_FV_Goal: req.body.Daily_FV_Goal,
            Weekly_FV_Goal: req.body.Weekly_FV_Goal,
            Daily_Carloies_Goal: req.body.Daily_Carloies_Goal,
            Weekly_Carloies_Goal: req.body.Weekly_Carloies_Goal,
            FV_Goal: req.body.FV_Goal
        },
        User_Type: req.body.User_Type,
        Unit_Prefernece: req.body.Unit_Prefernece,
    }
    const newUser = new Schemas.Users(user);
    try
    {
        await newUser.save(async (err, newUserResult) => {
            if (err) { res.end(err); console.log(err) }
            const PersonalExerciseSchema = {
              User: newUserResult.id,
              //set every thing to 0 for update
              Individual_Step: {
                Daily_Incomplete_Step: req.body.Daily_Step_Goal,
                Daily_Step_Goal: req.body.Daily_Step_Goal,
                Daily_Step_Fitbit: 0,
                Daily_Step_Self_Report: 0,
                Daily_Step_Mix: 0,
                Weekly_Step_Fitbit_Total: 0,
                Weekly_Step_Self_Report_Total: 0,
                Weekly_Step_Mix_Total: 0,
                Weekly_Step_Goal: req.body.Weekly_Step_Goal,
                Weekly_Step_Fitbit_Record: [0, 0, 0, 0, 0, 0, 0],
                Weekly_Step_Self_Report_Record: [0, 0, 0, 0, 0, 0, 0],
                Weekly_Step_Mix_Record: [0, 0, 0, 0, 0, 0, 0],

                Weekly_Incomplete_Step: [0, 0, 0, 0, 0, 0, 0],

                Program_Step_Fitbit: {
                  0: 0,
                },

                Program_Step_Mix: {
                  0: 0,
                },

                Annual_Step: {
                  0: 0,
                },

                Total_Step: 0,
              },
              Individual_Mile: {
                Daily_Incomplete_Mile: req.body.Daily_Mile_Goal,
                Daily_Mile_Goal: req.body.Daily_Mile_Goal,
                Weekly_Mile_Goal: req.body.Weekly_Mile_Goal,
                Daily_Mile_Fitbit: 0,
                Daily_Mile_Self_Report: 0,
                Daily_Mile_Mix: 0,
                Weekly_Mile_Fitbit_Total: 0,
                Weekly_Mile_Self_Report_Total: 0,
                Weekly_Mile_Mix_Total: 0,
                Weekly_Mile_Fitbit_Record: [0, 0, 0, 0, 0, 0, 0],
                Weekly_Mile_Self_Report_Record: [0, 0, 0, 0, 0, 0, 0],
                Weekly_Mile_Mix_Record: [0, 0, 0, 0, 0, 0, 0],

                Weekly_Incomplete_Mile: [0, 0, 0, 0, 0, 0, 0],

                Program_Mile_Fitbit: {
                  0: 0,
                },

                Program_Mile_Mix: {
                  0: 0,
                },

                Annual_Mile: {
                  0: 0,
                },

                Total_Mile: 0,
              },

              Individual_Carloies: {
                Daily_Carloies_Goal: req.body.Daily_Carloies_Goal,
                Daily_Incomplete_Carloies: req.body.Daily_Carloies_Goal,
                Weekly_Carloies_Goal: req.body.Weekly_Carloies_Goal,
              },

              Individual_FV: {
                FV_Goal: req.body.FV_Goal,
                Daily_FV_Report: 0,
                Weekly_FV_Report: {
                  0: 0,
                },
              },
              Individual_Rankings: {
                Daily_Step_Lift: 0,
                Daily_Mile_Lift: 0,
                Weekly_Step_Lift: [0, 0, 0, 0, 0, 0, 0],
                Weekly_Mile_Lift: [0, 0, 0, 0, 0, 0, 0],
                Program_Step_Lift: {
                  0: 0,
                },
                Program_Mile_Lift: {
                  0: 0,
                },
                Daily_Individual_Ranking: 0,
                Weekly_Individual_Ranking: [0, 0, 0, 0, 0, 0, 0],
                Program_Individual_Ranking: {
                  0: 0,
                },
                Daily_InTeam_Ranking: 0,
                Weekly_InTeam_Ranking: [0, 0, 0, 0, 0, 0, 0],
                Program_InTeam_Ranking: {
                  0: 0,
                },
              },
            };
            const newPersonalExerciseSchema = new Schemas.PersonalExercise(PersonalExerciseSchema);
            try
            {
                await newPersonalExerciseSchema.save(async (err, Result) => {
                    const SelfReport = {
                        User: newUserResult.id
                    }
                    const newSelfReportSchema = new Schemas.SelfReport(SelfReport);
                    await newSelfReportSchema.save(async (err, Result2) => {
                        console.log(err)
                        Users.findByIdAndUpdate(newUserResult.id, { Exercise_Profile: Result.id, Self_Report_Profile: Result2.id },
                            function (err, docs) {
                                if (err)
                                {
                                    console.log(err)
                                }
                                else
                                {
                                    res.end('new User created')
                                }
                            });
                    })

                })

            } catch (err)
            {
                console.log(err);
                res.end('User exercise profile not created');
            }

        })
    } catch (err)
    {
        console.log(err);
        res.end('User not added!');
    }
});

router.post('/AddUserWithTeam', async (req, res) => {

    const user = {
        Name: {
            First_Name: req.body.First_Name,
            Last_Name: req.body.Last_Name,
            Middle_Name: req.body.Middle_Name,
        },
        User_Name: req.body.User_Name,
        Avater: req.body.Avater,
        Email: req.body.Email,
        Password: req.body.Password,
        Location: req.body.Location,
        Gender: req.body.Gender,
        Age: req.body.Age,
        Weight: req.body.Weight,
        Height: {
            Height_feet: req.body.Height_feet,
            Height_Inch: req.body.Height_Inch,
            Height_Inch_total: req.body.Height_Inch_total,
        },
        Device: req.body.Device,
        Last_Sync_Time: Date.now(),
        Today: Date.now(),
        StartofWeek: Date.now(), //future update
        EndofWeek: Date.now(), //future update
        Fitbit_Access_Token: req.body.Fitbit_Access_Token,
        Goal: {
            Daily_Step_Goal: req.body.Daily_Step_Goal,
            Daily_Mile_Goal: req.body.Daily_Mile_Goal,
            Weekly_Step_Goal: req.body.Weekly_Step_Goal,
            Weekly_Mile_Goal: req.body.Weekly_Mile_Goal,
            Daily_FV_Goal: req.body.Daily_FV_Goal,
            Weekly_FV_Goal: req.body.Weekly_FV_Goal,
            Daily_Carloies_Goal: req.body.Daily_Carloies_Goal,
            Weekly_Carloies_Goal: req.body.Weekly_Carloies_Goal,
            FV_Goal: req.body.FV_Goal
        },

        User_Type: req.body.User_Type,
        Unit_Prefernece: req.body.Unit_Prefernece,
        Team_Id: req.body.Team_ID
    }
    const newUser = new Schemas.Users(user);
    try
    {
        await newUser.save(async (err, newUserResult) => {
            if (err)
            {
                console.log(err)
                res.end(err)
            }
            const PersonalExerciseSchema = {
              User: newUserResult.id,
              //set every thing to 0 for update
              Individual_Step: {
                Daily_Incomplete_Step: req.body.Daily_Step_Goal,
                Daily_Step_Goal: req.body.Daily_Step_Goal,
                Daily_Step_Fitbit: 0,
                Daily_Step_Self_Report: 0,
                Daily_Step_Mix: 0,
                Weekly_Step_Fitbit_Total: 0,
                Weekly_Step_Self_Report_Total: 0,
                Weekly_Step_Mix_Total: 0,
                Weekly_Step_Goal: req.body.Weekly_Step_Goal,
                Weekly_Step_Fitbit_Record: [0, 0, 0, 0, 0, 0, 0],
                Weekly_Step_Self_Report_Record: [0, 0, 0, 0, 0, 0, 0],
                Weekly_Step_Mix_Record: [0, 0, 0, 0, 0, 0, 0],

                Weekly_Incomplete_Step: [0, 0, 0, 0, 0, 0, 0],

                Program_Step_Fitbit: {
                  0: 0,
                },

                Program_Step_Mix: {
                  0: 0,
                },

                Annual_Step: {
                  0: 0,
                },

                Total_Step: 0,
              },
              Individual_Mile: {
                Daily_Incomplete_Mile: req.body.Daily_Mile_Goal,
                Daily_Mile_Goal: req.body.Daily_Mile_Goal,
                Weekly_Mile_Goal: req.body.Weekly_Mile_Goal,
                Daily_Mile_Fitbit: 0,
                Daily_Mile_Self_Report: 0,
                Daily_Mile_Mix: 0,
                Weekly_Mile_Fitbit_Total: 0,
                Weekly_Mile_Self_Report_Total: 0,
                Weekly_Mile_Mix_Total: 0,
                Weekly_Mile_Fitbit_Record: [0, 0, 0, 0, 0, 0, 0],
                Weekly_Mile_Self_Report_Record: [0, 0, 0, 0, 0, 0, 0],
                Weekly_Mile_Mix_Record: [0, 0, 0, 0, 0, 0, 0],

                Weekly_Incomplete_Mile: [0, 0, 0, 0, 0, 0, 0],

                Program_Mile_Fitbit: {
                  0: 0,
                },

                Program_Mile_Mix: {
                  0: 0,
                },

                Annual_Mile: {
                  0: 0,
                },

                Total_Mile: 0,
              },

              Individual_Carloies: {
                Daily_Carloies_Goal: req.body.Daily_Carloies_Goal,
                Daily_Incomplete_Carloies: req.body.Daily_Carloies_Goal,
                Weekly_Carloies_Goal: req.body.Weekly_Carloies_Goal,
              },

              Individual_FV: {
                FV_Goal: req.body.FV_Goal,
                Daily_FV_Report: 0,
                Weekly_FV_Report: {
                  0: 0,
                },
              },
              Individual_Rankings: {
                Daily_Step_Lift: 0,
                Daily_Mile_Lift: 0,
                Weekly_Step_Lift: [0, 0, 0, 0, 0, 0, 0],
                Weekly_Mile_Lift: [0, 0, 0, 0, 0, 0, 0],
                Program_Step_Lift: {
                  0: 0,
                },
                Program_Mile_Lift: {
                  0: 0,
                },
                Daily_Individual_Ranking: 0,
                Weekly_Individual_Ranking: [0, 0, 0, 0, 0, 0, 0],
                Program_Individual_Ranking: {
                  0: 0,
                },
                Daily_InTeam_Ranking: 0,
                Weekly_InTeam_Ranking: [0, 0, 0, 0, 0, 0, 0],
                Program_InTeam_Ranking: {
                  0: 0,
                },
              },
            };
            const newPersonalExerciseSchema = new Schemas.PersonalExercise(PersonalExerciseSchema);
            try
            {
                await newPersonalExerciseSchema.save(async (err, Result) => {
                    if(err){console.log(err)}
                    const SelfReport = {
                        User: newUserResult.id
                    }
                    const newSelfReportSchema = new Schemas.SelfReport(SelfReport);
                    await newSelfReportSchema.save(async (err, Result2) => {
                        console.log(err)
                        Users.findByIdAndUpdate(newUserResult.id, { Exercise_Profile: Result.id, Self_Report_Profile: Result2.id },
                            function (err, docs) {
                                if (err)
                                {
                                    console.log(err)
                                }
                                else
                                {
                                    Teams.findByIdAndUpdate(req.body.Team_ID, { $push: { Team_Member: newUserResult.id } },
                                        function (err, docs) {
                                            if (err)
                                            {
                                                console.log(err)
                                            }
                                            else
                                            {
                                                res.end('new User created')
                                            }

                                        })
                                }
                            });
                    })

                })

            } catch (err)
            {
                console.log(err);
                res.end('User exercise profile not created');
            }

        })
    } catch (err)
    {
        console.log(err);
        res.end('User not added!');
    }
});

//req.body:
//          userID: team owner ID
//          Team_Name
// Team_Daily_Step_Goal
// Team_Daily_Mile_Goal
// Team_Weekly_Step_Goal
// Team_Weekly_Mile_Goal
router.post('/CreateTeam', async (req, res) => {

    const team = {
        Team_Name: req.body.Team_Name,

        Team_Goals: {
            Team_Daily_Step_Goal: req.body.Team_Daily_Step_Goal,
            Team_Daily_Mile_Goal: req.body.Team_Daily_Mile_Goal,
            Team_Weekly_Step_Goal: req.body.Team_Weekly_Step_Goal,
            Team_Weekly_Mile_Goal: req.body.Team_Weekly_Mile_Goal,
        },

        Team_Exercise_Data: {
            Team_Daily_Steps: 0,
            Team_Daily_Miles: 0,
            Team_Daily_Carloies: 0,
            Team_Weekly_Steps_Total: 0,
            Team_Weekly_Miles_Total: 0,
            Team_Weekly_Carloies_Total: 0,
            Team_Weekly_Steps_Record: [0, 0, 0, 0, 0, 0, 0],

            Team_Weekly_Mile_Record: [0, 0, 0, 0, 0, 0, 0],

            Team_Weekly_Carloies_Record: [0, 0, 0, 0, 0, 0, 0],

            Team_Program_Steps: { 0: 0 },

            Team_Program_Miles: { 0: 0 },

            Team_Program_Carloies: { 0: 0 },
        },


        Team_Member:
            [req.body.userID,],

        Team_Rankings: {
            Team_Daily_Step_Lift: 0,
            Team_Daily_Mile_Lift: 0,
            Team_Weekly_Step_Lift: [0, 0, 0, 0, 0, 0, 0],
            Team_Weekly_Mile_Lift: [0, 0, 0, 0, 0, 0, 0],
            Team_Program_Mile_Lift: { 0: 0 },
            Team_Program_Step_Lift: { 0: 0 },
            Daily_Team_Ranking: 0,
            Weekly_Team_Ranking: [0, 0, 0, 0, 0, 0, 0],
            Program_Team_Ranking: { 0: 0 },
        },
    }
    const newTeam = new Schemas.Teams(team);
    try
    {
        await newTeam.save(async (err, newTeamResult) => {
            console.log(newTeamResult.id)
            Users.findByIdAndUpdate(req.body.userID, { Team_Id: newTeamResult.id, User_Type: "Leader" },
                function (err, docs) {
                    if (err)
                    {
                        console.log(err)
                        res.end('fail to update leader profile' + err)
                    }
                    else
                    {
                        res.end('success create new Team')
                    }
                });
        })
    } catch (error)
    {
        res.end('fail to create team' + error)
    }




});

router.post('/AddTeamToUser', async (req, res) => {
    Users.findByIdAndUpdate(req.body.userID, { Team_Id: req.body.Team_Id },
        function (err, docs) {
            if (err)
            {
                console.log(err)
            }
            else
            {
                res.end('team add to user')
            }
        });
});



module.exports = router;