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
    Last_Sync_Time: {type:Date, default: Date.now, required: true},
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
});

const teamSchema = new Schema({
    //team_id
    Team_Goal: {
        Team_Daily_Step_Goal: {type:Number, required: true},
        Team_Daily_Mile_Goal: {type:Number, required: true},
        Team_Weekly_Step_Goal: {type:Number, required: true},
        Team_Weekly_Mile_Goal: {type:Number, required: true},   
    },
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
        maxlength: 7,
    }]},
    Team_Weekly_Mile_Record: 
    {type:[
    {
        type:Number,
        maxlength: 7,
    }]},
    Team_Weekly_Carloies_Record: 
    {type:[
    {
        type:Number,
        maxlength: 7,
    }]},
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

    Team_Member: 
    {
        //{0:uuid1, 1:uuid2}
        type: Map,
        of: {
            type: Schema.Types.ObjectId, 
            ref:'PersonalExercise'
        }
    },

    Team_Daily_Step_Lift: {type:Number, required: true},
    Team_Daily_Mile_Lift: {type:Number, required: true},
    Team_Weekly_Step_Lift:
    {type:[
    {
        type:Number,
        maxlength: 7,
    }]},
    Team_Weekly_Mile_Lift:
    {type:[
    {
        type:Number,
        maxlength: 7,
    }]},
    Daily_Team_Ranking: {type:Number, required: true},
    Weekly_Team_Ranking: {type:[
    {
        type:Number,
        maxlength: 7,
    }],
    required: true
    },

});

const Users = mongoose.model('Users', userSchema);
const Teams = mongoose.model('Teams', teamSchema);
const mySchemas = {'Users':Users, 'Teams':Teams};

module.exports = mySchemas;