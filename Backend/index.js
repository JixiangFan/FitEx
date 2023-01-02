const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');
const dashboardroutesHandler = require('./routes/dashboardroutesHandler.js');
const mongoose = require('mongoose');
require('dotenv/config')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routesHandler);
app.use('/Dashboard', dashboardroutesHandler);

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