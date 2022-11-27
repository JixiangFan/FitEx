const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
//const routesHandler = require('./routes/handler.js');
require('dotenv/config')

//app.use('/', routesHandler);

app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

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