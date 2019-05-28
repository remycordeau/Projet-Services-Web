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

//login page
app.get('/', function(req, res){
  res.render("login");
});

//admin page
app.post('/AdminPage', function(req,res){
  username = req.body.username;
  client.getAllBots(username,req,res);
});

app.get('/disconnect', function(req,res){
  res.render('login');
});

//create page
app.get('/create',function(req,res){
  res.render('create');
});

app.post("/createBot", function(req,res){
  botName = req.body.name;
  botPort = req.body.port;
  client.newBot(botName,botPort,req,res);
});

//delete page
app.get("/deleteBot",function(req,res){
  res.render("delete");
});

app.post("/delete",function(req,res){
  client.deleteBot(req.body.name,req,res);
});

//information page
app.get("/info", function(req,res){
  res.render("information",{username: req.body.username})
});

app.post("/botInfo",function(req,res){
  username = req.body.username;
  client.getBot(username,req.body.name,req,res);
});
