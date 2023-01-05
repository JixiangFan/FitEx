const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');

const registerHandler = require('./routes/register.js');
const exerciseHandler = require('./routes/exerciseUpdate.js');
const dashboardroutesHandler = require('./routes/dashboardroutesHandler.js');
const teamMemberHandler = require("./routes/teamMemberHandler.js");
const mongoose = require('mongoose');
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

const PORT = process.env.PORT || 5000;


//DB Collection
mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then( () => {
  console.log('DB Connected!')
})
.catch( (err) => {
  console.log(err)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});