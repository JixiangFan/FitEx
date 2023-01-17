
const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');

const registerHandler = require('./routes/register.js');
const exerciseHandler = require('./routes/exerciseUpdate.js');

const teamrankHandler = require("./routes/teamrankUpdate.js");

const dashboardroutesHandler = require('./routes/dashboardroutesHandler.js');
const teamMemberHandler = require("./routes/teamMemberHandler.js");
const leaderBoardHandler = require("./routes/leaderBoardHandler.js");
const mongoose = require('mongoose');

const cronitor = require('cronitor')('96d85cc045bd43bdb5d7f556964b4408');//monitor autoRun
const cron = require('node-cron');

require('dotenv/config')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routesHandler);
app.use('/register', registerHandler);
app.use('/exerciseupdate', exerciseHandler);
app.use('/Dashboard', dashboardroutesHandler);
app.use("/TeamMember", teamMemberHandler);
app.use("/LeaderBoard", leaderBoardHandler);
app.use("/teamrankupdate", teamrankHandler);
const PORT = process.env.PORT || 5000;

//DB Collection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('DB Connected!')
  })
  .catch((err) => {
    console.log(err)
  })

//autoRun commands
// ┌────────────── second (optional)
// │ ┌──────────── minute
// │ │ ┌────────── hour
// │ │ │ ┌──────── day of month
// │ │ │ │ ┌────── month
// │ │ │ │ │ ┌──── day of week
// │ │ │ │ │ │
// │ │ │ │ │ │
// * * * * * *
//how to set up the timestamp: https://crontab.guru/
cron.schedule("*/1 * * * *", function () {
  console.log("---------------------");
  console.log(new Date());
});


const monitor = new cronitor.Monitor('important-background-job');
// the job has started
monitor.ping({state: 'run'});
// the job has completed successfully
monitor.ping({state: 'complete'});
// the job has failed
monitor.ping({state: 'fail'});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});