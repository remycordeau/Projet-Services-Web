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
  res.send({botNames: [...bots.getBotList().keys()]}); //parsing map into array to allow it to be send as a json
});

app.post("/newBot/:botName",cors(corsOptions),function(req,res){
  if(!bots.getBotList().has(req.params.botName)){
    bots.addBot(req.params.botName);
  }else{
    res.send("Bot already exists");
  }
});

app.post("/delete/:botName",cors(corsOptions),function(req,res){
  if(bots.getBotList().has(req.params.botName)){
    bots.deleteBot(req.params.botName);
  } else{
    /*message = "Bot you want to delete does not exists";
    res.render("error",{message: message});*/
  }
});

app.post('/:botName',cors(corsOptions),function(req,res){
  if(!bots.getBotList().has(req.params.botName)){
    /*message = "Bot does not exist";
    res.render("error",{message: message});*/
  }
});
