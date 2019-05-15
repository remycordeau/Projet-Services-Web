const express = require('express') //use express
const app = express();
const port = 3000;
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true })); // to use bodyParser
app.set('view engine', 'ejs'); //to use ejs

const server = app.listen(3000, () => { //run server
  console.log(`Express is running on port ${server.address().port}`);
});

app.get('/', function(req, res){
  req.body.error = "";
  res.render("login",{error: req.body.error});
});


app.post('/AdminPage', function(req,res){
  login = req.body.name;
  res.render('Administration',{username: login});
});

app.get('/disconnect', function(req,res){
  res.render('login');
});
