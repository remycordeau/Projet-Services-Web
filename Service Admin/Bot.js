class Bot{

  constructor(port){

    const express = require("express");
    const RiveScript = require("rivescript");
    this.bot = new RiveScript();
    this.brain = "standard";
    this.port = port;
    this.app = express();
    this.reply = "";
    this.status = "Down";
    this.bot.loadFile("brain/"+this.brain+".rive").then(this.initService.bind(this)).catch(this.error_handler);
    this.discussions = new Map();
  }

  initService(){

    const bodyParser = require("body-parser");
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.set('view engine', 'ejs');

    console.log("Brain successfully loaded!");
    this.server = this.app.listen(this.port, () => { //run server for bot
      console.log(`Bot is running on port ${this.port}`);
    });

    this.status = "Active";
    this.defineRoutes(this);
}

  defineRoutes(BotInstance){

    BotInstance.app.get("/",function(req,res){
       res.render("login");
    });

    BotInstance.app.post("/connect",function(req,res){
      let username = req.body.username;
      if(!BotInstance.discussions.has(username)){
      	BotInstance.discussions.set(username,[]);
	    }
      res.render("chat",{bot: BotInstance, username: username});
    });

    BotInstance.app.post("/talk",function(req,res){
      BotInstance.getReply(BotInstance,BotInstance.bot,BotInstance.port,req,res);
    });
}

  success_handler(){
    console.log("new brain successfully loaded");
  }

  error_handler (loadcount, err) {
  	console.log("Error loading batch #" + loadcount + ": " + err + "\n");
  }

  getReply(BotInstance,bot,port,req,res) {

    bot.sortReplies();
    BotInstance.getDiscussion(req.body.username).push(req.body.message);
    bot.reply(req.body.username,req.body.message).then(function(reply){
      //console.log(reply);
      BotInstance.getDiscussion(req.body.username).push(reply);
      res.render("chat",{bot: BotInstance, username: req.body.username});
    });
}

  // close the server and sets the bot status to down
  setStatusDown(BotInstance){
    let status = BotInstance.getStatus();
    BotInstance.getServer().close();
    console.log("Bot is not running on port "+BotInstance.getPort()+" anymore");
    BotInstance.setStatus("Down");
  }

  // starts the server and sets the bot status to active
  setStatusUp(BotInstance){
    let status = BotInstance.getStatus();
    BotInstance.server = BotInstance.app.listen(BotInstance.port, () => {
      console.log(`Bot is running again on port ${BotInstance.port}`);
    });;
    BotInstance.setStatus("Active");
  }

 //changes the bot's brain and loads it
  changeBrain(BotInstance,newBrain){
    console.log("changing old brain that was : "+BotInstance.getBrain());
    BotInstance.setBrain(newBrain);
    BotInstance.getBot().loadFile("brain/"+BotInstance.getBrain()+".rive").then(success_handler).catch(error_handler);
  }

//GETTERS and SETTERS

  getBrain(){
    return this.brain;
  }

  setBrain(newBrain){
    this.brain = newBrain;
  }

  setStatus(status){
    this.status = status;
  }

  getPort(){
    return this.port;
  }

  getStatus(){
    return this.status;
  }

  getServer(){
    return this.server;
  }

  //gets all the discussions associated with the given username
  getDiscussion(username){
  	return this.discussions.get(username);
  }

}
module.exports = Bot;
