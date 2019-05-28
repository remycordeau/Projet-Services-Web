class Bot{

  constructor(port){
    
    const express = require("express");
    const RiveScript = require("rivescript");
    require("babel-polyfill");
    const bodyParser = require("body-parser");
    this.bot = new RiveScript();
    this.port = port;
    this.app = express();
    this.reply = "";
    this.bot.loadDirectory("brain").then(this.defineRoutes).catch(this.error_handler);
  }

  defineRoutes(){
    console.log("testRoutesinter");
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.set('view engine', 'ejs');

    this.app.get("/",function(req,res){
      console.log("bot status" + this.bot);
      res.render("chat",{bot: this.bot, reply: ""});
    });

    this.app.post("/",function(req,res){
      this.getReply(req,res);
    });

    console.log("Brain successfully loaded!");
    this.app.listen(this.port, () => { //run server for bot
      console.log(`Bot is running on port ${this.port}`);
    });
  }

  success_handler() {
  	console.log("Brain successfully loaded!");
	console.log("test");
	this.defineRoutes();  	
        console.log("testRoutesexter");
  }

  error_handler (loadcount, err) {
  	console.log("Error loading batch #" + loadcount + ": " + err + "\n");
  }

  getPort(){
    return this.port;
  }

  getReply(req,res) {
    this.bot.sortReplies();
  	this.bot.reply(req.body.username,req.body.message).then(function(reply) {
        console.log(reply);
        res.render("chat",{bot: this.bot, reply: reply});
   });
}

}
module.exports = Bot;
