class Bot{

  constructor(port){
    
    const express = require("express");
    const RiveScript = require("rivescript");
    this.bot = new RiveScript();
    this.port = port;
    this.app = express();
    this.reply = "";
    this.bot.loadDirectory("brain").then(this.initService.bind(this)).catch(this.error_handler);
    this.discussions = new Map();
  }


  initService(){

    const bodyParser = require("body-parser");
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.set('view engine', 'ejs');

    console.log("Brain successfully loaded!");
    this.app.listen(this.port, () => { //run server for bot
      console.log(`Bot is running on port ${this.port}`);
    });
    this.defineRoutes(this);
    
}


  defineRoutes(BotInstance){

    BotInstance.app.get("/",function(req,res){
       res.render("login");
    });
    
    
    BotInstance.app.get("/talk",function(req,res){
      let username = req.body.username;
      if(!BotInstance.discussions.has(username)){
      	BotInstance.discussions.set(username,[]);
	  }
      res.render("chat",{bot: BotInstance, username: username});
    });

   BotInstance.app.post("/talk",function(req,res){
      console.log("username is : "+req.body.username);
      BotInstance.getReply(BotInstance,BotInstance.bot,BotInstance.port,req,res);
    });

}

  error_handler (loadcount, err) {
  	console.log("Error loading batch #" + loadcount + ": " + err + "\n");
  }

  getPort(){
    return this.port;
  }

  getReply(BotInstance,bot,port,req,res) {
    bot.sortReplies();
    console.log("username is : "+req.body.username);
    BotInstance.getDiscussion(req.body.username).push(req.body.message);
  	bot.reply(req.body.username,req.body.message).then(function(reply) {
        console.log(reply);
        BotInstance.getDiscussion(req.body.username).push(reply);
        res.render("chat",{bot: BotInstance, username: req.body.username});
   });
}

  getDiscussion(username){
  	return this.discussions.get(username);
}

}
module.exports = Bot;
