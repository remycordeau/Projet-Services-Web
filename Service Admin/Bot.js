const RiveScript = require("rivescript");
require("babel-polyfill");
const express = require("express");
const bodyParser = require("body-parser");


class Bot{

  constructor(){
    this.bot = new RiveScript();
    this.bot.loadDirectory("./brain").then(this.success_handler).catch(this.error_handler);
  }


  getResponse(){
      return this.response;
  }

  success_handler() {
  	console.log("Brain successfully loaded!");
  	this.bot.sortReplies();
  }

  error_handler (loadcount, err) {
  	//console.log("Error loading batch #" + loadcount + ": " + err + "\n");
  }

  getReply(req,res) {
    this.bot.sortReplies();
  	this.bot.reply(req.body.username,req.body.message).then(function(reply) {
        console.log(reply);
        let botResponse = {"reply": reply};
        res.setHeader('Content-Type', 'application/json');
        res.json(botResponse);
      });
}

}
module.exports = Bot;
