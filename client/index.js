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
  res.render("login");
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
    res.render("chat",{botName: req.body.name, reply: ""});
});

app.post("/createBot", function(req,res){
  client.newBot(botName);
  res.render("chat",{botName: req.body.name, reply: ""});
});

app.get("/deleteBot",function(req,res){
  res.render("delete");
});

app.post("/delete",function(req,res){
  client.deleteBot(req.body.name);
  res.render("delete");
})

app.post("/talk", function(req,res){
  client.getBotReply(req.body.name);
  //console.log("bot Reply"+res.json.reply);
  res.render("connect",{botName: req.body.name, reply:""});
});
