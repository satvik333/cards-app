const express = require('express');
const app = express();
const port = 4000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017')
.then(
  () => {console.log('Database connection is successful') },
  err => { console.log('Error when connecting to the database'+ err)}
);

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.post('/login', (req, res) => {
  res.send('helloooooooooooo')
});
     
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });
module.exports