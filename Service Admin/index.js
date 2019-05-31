const express = require('express') //use express
const app = express();
const port = 8081;
var bodyParser = require("body-parser");
var cors = require('cors');
const Bot = require("./Bot.js");
const Bots = require("./Bots.js");
var bots = new Bots();

app.set('views', __dirname + '/../views');
app.use(bodyParser.urlencoded({ extended: true })); // to use bodyParser
app.use(cors());
  var corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  optionsSuccessStatus: 200
};

app.set('view engine', 'ejs'); //to use ejs
const server = app.listen(8081, () => { //run server
  console.log(`Express (service) is running on port ${server.address().port}`);
});

////////////////////////////ROUTES////////////////////////////////

app.get("/",cors(corsOptions),function(req,res){
  let allPorts = bots.getAllPorts();
  res.send({botNames: [...bots.getBotList().keys()],ports: allPorts}); //parsing map into array to allow it to be send as a json
});

app.post("/newBot/:botName/on/:botPort",cors(corsOptions),function(req,res){

  let allPorts = bots.getAllPorts();
  let portIsAlreadyTaken = allPorts.includes(req.params.botPort);
  let error ="";

  if(bots.getBotList().has(req.params.botName) && portIsAlreadyTaken){
   error = "Bot already exists and specified port is already in use !";
  }else if(portIsAlreadyTaken){
   error = "Specified port is already in use !";
  }else if(bots.getBotList().has(req.params.botName)) {
   error = "Bot already exists !";
  }else{ //no mistakes made by user
   bots.addBot(req.params.botName,req.params.botPort);
 }
 res.send({Error: error});
});

app.post("/delete/:botName",cors(corsOptions),function(req,res){
  let error = "";
  if(bots.getBotList().has(req.params.botName)){
    bots.deleteBot(req.params.botName);
  }else{
    error = "Specified bot doesn't exist";
  }
  res.send({Error: error});
});

app.get('/:botName',cors(corsOptions),function(req,res){
  if(bots.getBotList().has(req.params.botName)){ // if bot exists
    let bot = bots.getBot(req.params.botName);
    res.send({Error: "",botName: req.params.botName, port: bot.getPort()});
  }else{
    res.send({Error : "Specified bot doesn't exist"});
  }
});
