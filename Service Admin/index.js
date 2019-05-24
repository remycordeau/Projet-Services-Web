const express = require('express') //use express
const app = express();
const port = 8081;
var bodyParser = require("body-parser");
var cors = require('cors');
const Bot = require("./Bot.js");
const Bots = require("./Bots.js");
var bots = new Bots();;

app.use(bodyParser.urlencoded({ extended: true })); // to use bodyParser
app.use(cors());
  var corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.set('view engine', 'ejs'); //to use ejs

const server = app.listen(8081, () => { //run server
  console.log(`Express (service) is running on port ${server.address().port}`);
});

app.post('/',cors(corsOptions),function(req,res){
  console.log("body value" + req.body.bot);
  if(!bots.getBotList().has(req.body)){
    bots.addBot(req.body.name);
  }
  var iterator = bots.getBotList().keys();
  console.log("contains "+iterator.next().value);
});

app.post('/talk',cors(corsOptions),function(req,res){
  var iterator = bots.getBotList().keys();
  console.log("contains "+iterator.next().value);
  currentBot = bots.getBot(req.body.name);
  reply = currentBot.getReply(req,res);
  console.log(reply);
  return reply;
});
