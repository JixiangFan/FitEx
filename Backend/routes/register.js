var express = require('express');
const { Users, Teams } = require('../models/Schemas.js');

var router = express.Router();
const Schemas = require('../models/Schemas.js');

router.get('/test', async (req, res) => {
    res.send("good Test")
})


router.post('/addUser_without_team', async (req, res) => {

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
            const PersonalExerciseSchema = {
                User: newUserResult.id,
                Individual_Step: {
                    Daily_Step_Goal: req.body.Daily_Step_Goal,
                    Weekly_Step_Goal: req.body.Weekly_Step_Goal,
                },
                Individual_Mile: {
                    Daily_Mile_Goal: req.body.Daily_Mile_Goal,
                    Weekly_Mile_Goal: req.body.Weekly_Mile_Goal,
                },

                Individual_Carloies: {
                    Daily_Carloies_Goal: req.body.Daily_Carloies_Goal,

                    Weekly_Carloies_Goal: req.body.Weekly_Carloies_Goal,
                },

                Individual_FV: {
                    FV_Goal: req.body.FV_Goal
                },

            };
            console.log(PersonalExerciseSchema)
            const newPersonalExerciseSchema = new Schemas.PersonalExercise(PersonalExerciseSchema);
            try
            {
                await newPersonalExerciseSchema.save(async (err, Result) => {
                    Users.findByIdAndUpdate(newUserResult.id, { Exercise_Profile: Result.id },
                        function (err, docs) {
                            if (err)
                            {
                                console.log(err)
                            }
                            else
                            {
                                console.log("Updated User : ", docs);
                            }
                        });
                    res.end('new User created')
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








module.exports = router;