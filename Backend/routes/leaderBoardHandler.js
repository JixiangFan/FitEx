var express = require("express");
const {
  Users,
  Teams,
  SelfReportActivity,
  SelfReport,
  PersonalExercise,
  Ranking,
} = require("../models/Schemas.js");

var router = express.Router();
const Schemas = require("../models/Schemas.js");

router.get("/test", async (req, res) => {
  res.send("good Test");
});

router.get("/IndividualRanking/:UID", async (req, res) => {
  Users.findById(req.params.UID)
    .select("Exercise_Profile")
    .exec(function (err, txs) {
      PersonalExercise.findById(txs.Exercise_Profile)
        .select("User Individual_Rankings")
        .exec(function (err, txs) {
          res.json(txs);
        });
    });
});

router.get("/TeamRanking/:UID", async (req, res) => {
  Users.findById(req.params.UID)
    .select("Team_Id")
    .exec(function (err, txs) {
      Teams.findById(txs.Team_Id)
        .select("Team_Name Team_Rankings")
        .exec(function (err, txs) {
          res.json(txs);
        });
    });
});

router.get("/OverallRanking", async (req, res) => {
  Ranking.find().exec(function (err, txs) {
    //console.log(txs);
    res.json(txs);
  });
});

router.get("/", function (req, res, next) {
  res.render("hey this worked");
});

router.get("/another/route", function (req, res, next) {
  res.json({ hello: "world" });
});

module.exports = router;
