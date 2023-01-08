var express = require("express");
const {
  Users,
  Teams,
  SelfReportActivity,
  SelfReport,
  Ranking,
  PersonalExercise,
  ProgramDate,
} = require("../models/Schemas.js");

var router = express.Router();
const Schemas = require("../models/Schemas.js");

router.get("/test", async (req, res) => {
  res.send("good Test2");
});

router.get("/teamDailyRankingUpdate", async (req, res) => {
  Teams.aggregate([
    { $match: {} },
    {
      $group: {
        _id: "$_id",
        step: {
          $sum: "$Team_Exercise_Data.Team_Daily_Steps",
        },
      },
    },
    { $sort: { step: -1 } },
    {
      $group: {
        _id: null,
        Teams: { $push: { _id: "$_id", Step: "$step" } },
      },
    },
    {
      $unwind: {
        path: "$Teams",
        includeArrayIndex: "Teams.rank",
      },
    },

    {
      $replaceRoot: {
        newRoot: "$Teams",
      },
    },
    {
      $addFields: {
        rank: {
          $add: ["$rank", 1],
        },
      },
    },
  ]).exec((err, doc) => {
    console.log(doc);
    if (err) console.log(err);
    doc.forEach((result) => {
      Teams.findOneAndUpdate(
        { _id: result._id },
        {
          $set: {
            "Team_Rankings.Daily_Team_Ranking": result.rank,
          },
          $push: {
            "Team_Rankings.Daily_Team_Ranking_Record:": result.rank,
            "Team_Rankings.Program_Daily_Team_Ranking:": result.rank,
          },
        }
      ).exec((err, doc) => {
        if (err) console.log(err);
        //console.log(doc)
      });

    });
    res.send("done");
  });
});

module.exports = router;
