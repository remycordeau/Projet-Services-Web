class Bot{

  constructor(port){
    
    const express = require("express");
    const RiveScript = require("rivescript");
    this.bot = new RiveScript();
    this.port = port;
    this.app = express();
    this.reply = "";
    this.bot.loadDirectory("brain").then(this.initService.bind(this)).catch(this.error_handler);
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
      res.render("chat",{port: BotInstance.port, reply: ""});
    });

   BotInstance.app.post("/",function(req,res){
      BotInstance.getReply(BotInstance.bot,BotInstance.port,req,res);
    });

}

  error_handler (loadcount, err) {
  	console.log("Error loading batch #" + loadcount + ": " + err + "\n");
  }

  getPort(){
    return this.port;
  }

  getReply(bot,port,req,res) {
    bot.sortReplies();
  	bot.reply(req.body.username,req.body.message).then(function(reply) {
        console.log(reply);
        res.render("chat",{port: port, reply: reply});
   });
}

}
module.exports = Bot;
