var express = require('express');
var router = express.Router();
const Schemas = require('../models/Schemas.js');
router.get('/addUser', async (req, res) => {
    const user = {
        Name: {
            First_Name: "testFirst",
            Last_Name: "testlast",
            Middle_Name: "testMiddle",
         },
        User_Name: "testUserName",
        Avater: "testAvaterLink",
        Email: "testUser@test.com",
        Password: "testTestTest",
        Location: "testLocation",
        Gender: "male",
        Age: 23,
        Weight: 160,
        Height: {
            Height_feet: 4,
            Height_Inch: 3,
            Height_Inch_total: 21,
        },
        Device: "Fitbit",
        Fitbit_Access_Token:"testtoken",
        Goal: {
            Daily_Step_Goal: 1000,
            Daily_Mile_Goal: 1001,
            Weekly_Step_Goal: 1002,
            Weekly_Mile_Goal: 10003,
            Daily_FV_Goal: 500,
            Weekly_FV_Goal: 501,
        },
        User_Type:"Member",
        Unit_Prefernece: "Step",
    }
    const newUser = new Schemas.Users(user);
    try{
        await newUser.save( async(err, newUserResult) => {
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


router.get('/', function (req, res, next) {
    res.render('hey this worked');
});

router.get('/another/route', function (req, res, next) {
    res.json({ hello: 'world' });
});

module.exports = router;