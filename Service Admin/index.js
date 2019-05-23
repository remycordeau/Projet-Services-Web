const express = require('express') //use express
const app = express();
const port = 8081;
var bodyParser = require("body-parser");
var cors = require('cors');
const Bot = require("./Bot.js");
const Bots = require("./Bots.js");
var bots = new Bots();

app.use(bodyParser.urlencoded({ extended: true })); // to use bodyParser
app.use(cors());
  var corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.set('view engine', 'ejs'); //to use ejs

const server = app.listen(8081, () => { //run server
  console.log(`Express is running on port ${server.address().port}`);
});

app.post('/',function(req,res){
  if(!bots.has(req.param.name)){
    Bots.addBot(req.param.name);
    currentBot = Bots.getBot(req.param.name);
    res.render("connect",{botName: req.param.name,reply: ""});
  }
});

app.post('/talk',function(req,res){
  message = req.body.message;
  currentBot = Bots.getBot(req.body.name);
  reply = currentBot.ask(message);
  //console.log(reply);
  res.render("connect",{botName: req.body.name,reply: reply})
});
