var express = require("express");
const {
  Users,
  Teams,
  SelfReportActivity,
  SelfReport,
  PersonalExercise,
} = require("../models/Schemas.js");

var router = express.Router();
const Schemas = require("../models/Schemas.js");

//以及team member在schemas中的设计感觉还是不太对，lift和组员的contribution全都进不去，这个api get能得到的基本都不是核心数据
//或者运算全移到前端或者单写一个来处理组员数据计算

router.get("/test", async (req, res) => {
  res.send("good Test");
});

router.get("/TeamMemberInfo/:UID", async (req, res) => {
  Users.findById(req.params.UID)
    .select("Team_Id")
    .exec(function (err, txs) {
      //这里缺了team_member_lift detail
      Teams.findById(txs.Team_Id)
        .select("Team_Name Team_Member")
        .exec(function (err, txs) {
          Users.find()
            .where("_id")
            .in(txs.Team_Member)
            .select("User_Name Email Location Gender Age Goal User_Type")
            .exec(function (err, txs) {
              //console.log(txs);
              res.json(txs);
            });
        });
    });
});

router.get("/TeamMemberExerciseInfo/:UID", async (req, res) => {
  let result = [];
  Users.findById(req.params.UID)
    .select("Team_Id")
    .exec(function (err, txs) {
      Teams.findById(txs.Team_Id)
        .select(
          "Team_Name Team_Goals Team_Exercise_Data Team_Rankings Team_Member"
        )
        .exec(function (err, txs) {
          result = result.concat(txs);

          PersonalExercise.find()
            .where("User")
            .in(txs.Team_Member)
            .select(
              "User Individual_Step.Daily_Step_Mix Individual_Step.Weekly_Step_Mix_Total Individual_Mile.Daily_Mile_Mix Individual_Mile.Weekly_Mile_Mix_Total  "
            )
            .exec(function (err, txs) {
              result = result.concat(txs);
              //console.log(result);
              res.json(result);
            });
        });
    });
});

router.get("/", function (req, res, next) {
  res.render("hey this worked");
});

router.get("/another/route", function (req, res, next) {
  res.json({ hello: "world" });
});

module.exports = router;
