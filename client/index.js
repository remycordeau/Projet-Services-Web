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
app.post('/create',function(req,res){
  res.render('create',{username: req.body.username});
});

app.post("/createBot", function(req,res){
  botName = req.body.name;
  botPort = req.body.port;
  username = req.body.name;
  client.newBot(username,botName,botPort,req,res);
});

//delete page
app.post("/deleteBot",function(req,res){
  res.render("delete",{username: req.body.username});
});

app.post("/delete",function(req,res){
  username = req.body.name;
  client.deleteBot(username,req.body.name,req,res);
});

//information page
app.post("/info", function(req,res){
  res.render("information",{username: req.body.username})
});

app.post("/botInfo",function(req,res){
  username = req.body.username;
  client.getBot(username,req.body.name,req,res);
});

//set status down
app.post("/statusDown",function(req,res){
  username = req.body.username;
  botName = req.body.botName;
  client.setBotStatusDown(username,botName,req,res);
});

//set status up
app.post("/statusUp",function(req,res){
  username = req.body.username;
  botName = req.body.botName;
  client.setBotStatusUp(username,botName,req,res);
});

//change bot brain
app.post("/newBrain",function(req,res){
  username = req.body.username;
  botName = req.body.botName;
  botBrain = req.body.botBrain;
  client.changeBrain(username,botName,botBrain,req,res);
});
