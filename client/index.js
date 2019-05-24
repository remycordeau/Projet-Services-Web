const express = require('express') //use express
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
const client = require("./js/client.js");

app.use(bodyParser.urlencoded({ extended: true })); // to use bodyParser
app.set('view engine', 'ejs'); //to use ejs

const server = app.listen(3000, () => { //run server
  console.log(`Express (client) is running on port ${server.address().port}`);
});


//////////////// ROUTES /////////////////////

app.get('/', function(req, res){
  req.body.error = "";
  res.render("login",{error: req.body.error});
});

app.get('/disconnect', function(req,res){
  res.render('login');
});

app.get('/create',function(req,res){
  res.render('create');
});

app.post('/AdminPage', function(req,res){
  login = req.body.name;
  res.render('Administration',{username: login});
});

app.post('/connectToBot', function(req,res){
    client.getBot(req.body.name);
    res.render("connect",{botName: req.body.name, reply: ""})
});

app.post("/talk", function(req,res){
  reply = client.getBotReply();
  res.render("connect",{username: req.body.username,botName: req.body.name,reply: reply})
});
