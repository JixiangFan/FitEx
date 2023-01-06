const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    //_id: Schema.Types.ObjectId,
    Name: {
        First_Name: {type:String, required: true},
        Last_Name: {type:String, required: true},
        Middle_Name: {type:String},
    },    
    User_Name: {type:String, required: true, unique: true},
    Avater: {type:String, required: false},
    Email: {type:String, required: true, unique: true},
    Password: {type:String, required: true},
    Location: {type:String, required: true},
    Gender: {type:String, enum: ["male", "female", "other"], required: true},
    Age: {type:Number, min: 10, max: 100, required: true},
    Weight: {type:Number, min: 4, max: 1400, required: true},
    Height: {
        Height_feet: {type:Number, min: 2, max: 10, required: true},
        Height_Inch: {type:Number, min: 0, max: 12, required: true},
        Height_Inch_total: {type:Number, min: 20, max: 120, required: true},
    },   
    Device: {type:String, enum: ["Fitbit", "Mix", "Self-report"], required: true},
    Last_Sync_Time: {type:Date, default: Date.now},
    Today: {type:Date},
    StartofWeek: {type:Date},
    EndofWeek:  {type:Date},
    Fitbit_Access_Token: {type:String, unique: true},
    Team_Id: {type:Schema.Types.ObjectId, ref:'Teams'},
    Goal: {
        Daily_Step_Goal: {type:Number, min: 0, max: 100000, required: true},
        Daily_Mile_Goal: {type:Number, min: 0, max: 100000, required: true},
        Weekly_Step_Goal: {type:Number, min: 0, max: 1000000, required: true},
        Weekly_Mile_Goal: {type:Number, min: 0, max: 1000000, required: true},
        Daily_FV_Goal: {type:Number, min: 0, max: 700, required: true},
        Weekly_FV_Goal: {type:Number, min: 0, max: 7000, required: true},
    },
    User_Type: {type:String, enum: ["Member", "Leader", "Agent", "Admin"], required: true},
    Unit_Prefernece: {type:String, enum: ["Step", "Mile", "Exercise Time", "Calorie"]},
    Exercise_Profile: {
        type: mongoose.Schema.Types.ObjectId, ref:'PersonalExercise', 
    },
    Self_Report_Profile: {
        type: mongoose.Schema.Types.ObjectId, ref:'SelfReport', 
    },

});

const teamSchema = new Schema({
    //team_id
    Team_Name:{type:String, required: true},
    
    Team_Goals: {
        Team_Daily_Step_Goal: {type:Number, required: true},
        Team_Daily_Mile_Goal: {type:Number, required: true},
        Team_Weekly_Step_Goal: {type:Number, required: true},
        Team_Weekly_Mile_Goal: {type:Number, required: true},   
    },

    Team_Exercise_Data: {
        Team_Daily_Steps: {type:Number},
        Team_Daily_Miles: {type:Number},
        Team_Daily_Carloies: {type:Number},
        Team_Weekly_Steps_Total: {type:Number},
        Team_Weekly_Miles_Total: {type:Number},
        Team_Weekly_Carloies_Total: {type:Number},
        Team_Weekly_Steps_Record: 
            {type:[
            {
                type:Number,
            }],
            validate: [arrayLimit, '{PATH} exceeds the limit of 7']
            },

        Team_Weekly_Mile_Record: 
            {type:[
            {
                type:Number,
            }],
            validate: [arrayLimit, '{PATH} exceeds the limit of 7']
            },
    
        Team_Weekly_Carloies_Record: 
            {type:[
            {
                type:Number,
            }],
            validate: [arrayLimit, '{PATH} exceeds the limit of 7']
            },

        Team_Program_Steps:
        {
            //define a map whose values are numbers. A map's keys are always strings. You specify the type of values using `of`.
            //key is the week datetime
            type: Map,
            of: Number
        },

        Team_Program_Miles:
        {
            //define a map whose values are numbers. A map's keys are always strings. You specify the type of values using `of`.
            //key is the week datetime
            type: Map,
            of: Number
        },

        Team_Program_Carloies:
        {
            //define a map whose values are numbers. A map's keys are always strings. You specify the type of values using `of`.
            //key is the week datetime
            type: Map,
            of: Number
        },
    },


    Team_Member: 
    {
        type:[
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref:'Users'
            }]
       
    },

    Team_Rankings: {
        Team_Daily_Step_Lift: {type:Number, required: true},
        Team_Daily_Mile_Lift: {type:Number, required: true},
        Team_Weekly_Step_Lift: {type:[
            {
                type:Number,
            }],
            validate: [arrayLimit, '{PATH} exceeds the limit of 7']
            },
        Team_Weekly_Mile_Lift: {type:[
            {
                type:Number,
            }],
            validate: [arrayLimit, '{PATH} exceeds the limit of 7']
            },
        Team_Program_Mile_Lift: {
            type:Map,
            of: Number
        },
        Team_Program_Step_Lift: {
            type:Map,
            of: Number
        },
        Daily_Team_Ranking: {type:Number, required: true},
        Weekly_Team_Ranking: {type:[
            {
                type:Number,
            }],
            validate: [arrayLimit, '{PATH} exceeds the limit of 7'],
            required: true
            },
        Program_Team_Ranking: {
            type:Map,
            of: Number
        },
    },

});

const PersonalExerciseSchema = new Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },

  Individual_Step: {
    Daily_Step_Goal: { type: Number, required: true },
    Daily_Step_Fitbit: { type: Number },
    Daily_Step_Self_Report: { type: Number },
    Daily_Step_Mix: { type: Number },
    Daily_Incomplete_Step: { type: Number },
    Weekly_Step_Goal: { type: Number, required: true },
    Weekly_Step_Fitbit_Total: { type: Number },
    Weekly_Step_Self_Report_Total: { type: Number },
    Weekly_Step_Mix_Total: { type: Number },
    Weekly_Step_Fitbit_Record: {
      type: [
        {
          type: Number,
        },
      ],
      validate: [arrayLimit, "{PATH} exceeds the limit of 7"],
    },
    Weekly_Step_Self_Report_Record: {
      type: [
        {
          type: Number,
        },
      ],
      validate: [arrayLimit, "{PATH} exceeds the limit of 7"],
    },
    Weekly_Step_Mix_Record: {
      type: [
        {
          type: Number,
        },
      ],
      validate: [arrayLimit, "{PATH} exceeds the limit of 7"],
    },

    Weekly_Incomplete_Step: {
      type: [
        {
          type: Number,
        },
      ],
      validate: [arrayLimit, "{PATH} exceeds the limit of 7"],
    },

    Program_Step_Fitbit: {
      type: Map,
      of: Number,
    },

    Program_Step_Mix: {
      type: Map,
      of: Number,
    },

    Annual_Step: {
      type: Map,
      of: Number,
    },

    Total_Step: { type: Number },
  },

  Individual_Mile: {
    Daily_Mile_Goal: { type: Number, required: true },
    Daily_Mile_Fitbit: { type: Number },
    Daily_Mile_Self_Report: { type: Number },
    Daily_Mile_Mix: { type: Number },
    Daily_Incomplete_Mile: { type: Number },
    Weekly_Mile_Goal: { type: Number, required: true },
    Weekly_Mile_Fitbit_Total: { type: Number },
    Weekly_Mile_Self_Report_Total: { type: Number },
    Weekly_Mile_Mix_Total: { type: Number },
    Weekly_Mile_Fitbit_Record: {
      type: [
        {
          type: Number,
        },
      ],
      validate: [arrayLimit, "{PATH} exceeds the limit of 7"],
    },
    Weekly_Mile_Self_Report_Record: {
      type: [
        {
          type: Number,
        },
      ],
      validate: [arrayLimit, "{PATH} exceeds the limit of 7"],
    },
    Weekly_Mile_Mix_Record: {
      type: [
        {
          type: Number,
        },
      ],
      validate: [arrayLimit, "{PATH} exceeds the limit of 7"],
    },

    Weekly_Incomplete_Mile: {
      type: [
        {
          type: Number,
        },
      ],
      validate: [arrayLimit, "{PATH} exceeds the limit of 7"],
    },

    Program_Mile_Fitbit: {
      type: Map,
      of: Number,
    },

    Program_Mile_Mix: {
      type: Map,
      of: Number,
    },

    Annual_Mile: {
      type: Map,
      of: Number,
    },

    Total_Mile: { type: Number },
  },

  Individual_Carloies: {
    Daily_Carloies_Goal: { type: Number, required: true },
    Daily_Carloies_Fitbit: { type: Number },
    Daily_Carloies_Self_Report: { type: Number },
    Daily_Carloies_Mix: { type: Number },
    Daily_Incomplete_Carloies: { type: Number },
    Weekly_Carloies_Goal: { type: Number, required: true },
    Weekly_Carloies_Fitbit_Total: { type: Number },
    Weekly_Carloies_Self_Report_Total: { type: Number },
    Weekly_Carloies_Mix_Total: { type: Number },
    Weekly_Carloies_Fitbit_Record: {
      type: [
        {
          type: Number,
        },
      ],
      validate: [arrayLimit, "{PATH} exceeds the limit of 7"],
    },
    Weekly_Carloies_Self_Report_Record: {
      type: [
        {
          type: Number,
        },
      ],
      validate: [arrayLimit, "{PATH} exceeds the limit of 7"],
    },
    Weekly_Carloies_Mix_Record: {
      type: [
        {
          type: Number,
        },
      ],
      validate: [arrayLimit, "{PATH} exceeds the limit of 7"],
    },

    Weekly_Incomplete_Carloies: {
      type: [
        {
          type: Number,
        },
      ],
      validate: [arrayLimit, "{PATH} exceeds the limit of 7"],
    },

    Program_Carloies_Fitbit: {
      type: Map,
      of: Number,
    },

    Program_Carloies_Mix: {
      type: Map,
      of: Number,
    },

    Annual_Carloies: {
      type: Map,
      of: Number,
    },

    Total_Carloies: { type: Number },
  },

  Individual_FV: {
    FV_Goal: { type: Number, required: true },
    Daily_FV_Report: { type: Number },
    Weekly_FV_Report: {
      type: Map,
      of: Number,
    },
  },

  Individual_Rankings: {
    Daily_Step_Lift: { type: Number },
    Daily_Mile_Lift: { type: Number },
    Weekly_Step_Lift: {
      type: [
        {
          type: Number,
        },
      ],
      validate: [arrayLimit, "{PATH} exceeds the limit of 7"],
    },
    Weekly_Mile_Lift: {
      type: [
        {
          type: Number,
        },
      ],
      validate: [arrayLimit, "{PATH} exceeds the limit of 7"],
    },
    Program_Step_Lift: {
      type: Map,
      of: Number,
    },
    Program_Mile_Lift: {
      type: Map,
      of: Number,
    },
    Daily_Individual_Ranking: { type: Number },
    Weekly_Individual_Ranking: {
      type: [
        {
          type: Number,
        },
      ],
      validate: [arrayLimit, "{PATH} exceeds the limit of 7"],
    },
    Program_Individual_Ranking: {
      type: Map,
      of: Number,
    },
    Daily_InTeam_Ranking: { type: Number },
    Weekly_InTeam_Ranking: {
      type: [
        {
          type: Number,
        },
      ],
      validate: [arrayLimit, "{PATH} exceeds the limit of 7"],
    },
    Program_InTeam_Ranking: {
      type: Map,
      of: Number,
    },
  },
});


const SelfReportActivitySchema = new Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId, ref:'Users', 
    },

    Activty_Date: {type:Date},
    Activity_Name: {type:String},
    Activity_Description: {type:String},
    Activity_Time_Hours: {type:Number},
    Activity_Time_Minutes: {type:Number},
    Activity_Time_Minutes_Total: {type:Number},
    Activity_Miles: {type:Number},
    Activity_Steps: {type:Number},
});

const SelfReportSchema = new Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId, ref:'Users', 
    },

    Daily_Activity: {type:[
        {
            type: mongoose.Schema.Types.ObjectId, ref:'SelfReportActivity', 
        }],
    },

    Weekly_Activity:{type:[
        {
            type: mongoose.Schema.Types.ObjectId, ref:'SelfReportActivity', 
        }],
    },

    Program_Activity: {type:[
        {
            type: mongoose.Schema.Types.ObjectId, ref:'SelfReportActivity', 
        }],
    },
});

const RankingSchema  = new Schema({
    
    Daily_Top10_Individual:{type:[
        {
            type: mongoose.Schema.Types.ObjectId, ref:'Users', 
        }], 
    },
    Daily_Top10_Team:{type:[
        {
            type: mongoose.Schema.Types.ObjectId, ref:'Teams', 
        }], 
    },
    Weekly_Top10_Individual:{type:[
        {
            type: mongoose.Schema.Types.ObjectId, ref:'Users', 
        }], 
    },
    Weekly_Top10_Team:{type:[
        {
            type: mongoose.Schema.Types.ObjectId, ref:'Teams', 
        }], 
    },

});


function arrayLimit(val) {
  return val.length <= 7;
}

const Users = mongoose.model('Users', userSchema,'Users');
const Teams = mongoose.model('Teams', teamSchema,'Teams');
const PersonalExercise = mongoose.model('PersonalExercise', PersonalExerciseSchema,'PersonalExercise');
const SelfReportActivity = mongoose.model('SelfReportActivity', SelfReportActivitySchema,'SelfReportActivity');
const SelfReport = mongoose.model('SelfReport', SelfReportSchema,'SelfReport');
const Ranking = mongoose.model('Ranking', RankingSchema,'Ranking');

const mySchemas = {'Users':Users, 'Teams':Teams, 'PersonalExercise':PersonalExercise, 'SelfReportActivity':SelfReportActivity, 'SelfReport':SelfReport , 'Ranking':Ranking};
module.exports = mySchemas;