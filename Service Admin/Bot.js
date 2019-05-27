const RiveScript = require("rivescript");
require("babel-polyfill");
const express = require("express");
const bodyParser = require("body-parser");


class Bot{

  constructor(port){
    this.bot = new RiveScript();
    this.port = port;
    this.app = express();
    this.bot.loadDirectory("./brain").then(this.success_handler).catch(this.error_handler);
  }

  success_handler() {
  	console.log("Brain successfully loaded!");
  	this.bot.sortReplies();
    this.server = this.app.listen(8080, () => { //run server
      console.log(`Bot is running on port ${server.address().port}`);
    });
    this.app.get("/", function(req,res){
      res.render("login");
    });
  }

  error_handler (loadcount, err) {
  	//console.log("Error loading batch #" + loadcount + ": " + err + "\n");
  }

  getReply(req,res) {
    this.bot.sortReplies();
  	this.bot.reply(req.body.username,req.body.message).then(function(reply) {
        console.log(reply);
        let botResponse = {"reply": reply};
        res.render("chat",{reply: botResponse});
      });
}

}
module.exports = Bot;
