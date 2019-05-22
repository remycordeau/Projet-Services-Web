const express = require('express') //use express
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
const Bot = require("./Bot.js");

app.use(bodyParser.urlencoded({ extended: true })); // to use bodyParser
app.set('view engine', 'ejs'); //to use ejs

const Readline = require("readline");

const rl = Readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const server = app.listen(3000, () => { //run server
  console.log(`Express is running on port ${server.address().port}`);
});


let bots = require("./Bots.js");
const Bots = new bots();
///////////////////////////////////////////////////////



//////////////////////////////////////////////////////
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

app.get('/create',function(req,res){
  res.render('create');
});

app.post('/connectToBot', function(req,res){
  Bots.addBot(req.body.name);
  currentBot = Bots.getBot(req.body.name);
  res.render("connect",{botName: req.body.name,reply: ""});
});


app.post('/talk',function(req,res){
  message = req.body.message;
  currentBot = Bots.getBot(req.body.name);
  reply = currentBot.ask(message);
  console.log(reply);
  res.render("connect",{botName: req.body.name,reply: reply})
});
