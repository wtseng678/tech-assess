const express = require('express');
const bodyParser = require('body-parser');

const db = require('../database-mysql');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// UNCOMMENT FOR REACT
// app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));


app.get('/api/lines', (req, res) => {
  // TODO - your code here!

});

// Write additional route handlers as needed below!

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
