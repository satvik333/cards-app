const express = require('express');
const app = express();
const port = 4000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./Models/User');
const Card = require('./Models/Card');

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

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({ message: 'Please provide both username and password' });
    }
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    return res.send({ message: 'LoggedIn Successful', user });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

app.post('/registeruser', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.create({ username, email, password });
    return res.send({ message: 'Registration Successful', user });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

app.post('/addcard', async (req, res) => {
  try {
    const { cardTitle, cardNumber, cardHolder, cardExpiration, cardCvv } = req.body;

    const card = await Card.create({ cardTitle, cardNumber, cardHolder, cardExpiration, cardCvv });
    return res.send({ message: 'Successfully Added the Card', card });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

app.get('/getcards', async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.send({ message: 'Successfully fetched the Cards', cards });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

app.delete('/deletecard', async (req, res) => {
  try {
    await Card.deleteOne({_id: req.body.id});
    const cards = await Card.find({});
    return res.send({ message: 'Successfully fetched the Cards', cards });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

     
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });
module.exports