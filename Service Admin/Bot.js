const RiveScript = require("rivescript");
require("babel-polyfill");
const express = require("express");
const bodyParser = require("body-parser");


class Bot{

  constructor(){
    this.bot = new RiveScript();
    this.bot.loadDirectory("./brain").then(this.success_handler).catch(this.error_handler);
  }

  success_handler() {
  	console.log("Brain successfully loaded!");
  	this.bot.sortReplies();
  	var app = express();

  	// Parse application/json inputs.
  	app.use(bodyParser.json());
  	app.set("json spaces", 4);

  	//routes.
  	app.post("/reply", getReply);
  	app.get("/", showUsage);
  	app.get("*", showUsage);

   //run server
    const server = app.listen(8080, () => {
      console.log(`Bot is running on port ${server.address().port}`);
    });
  }

  error_handler (loadcount, err) {
  	console.log("Error loading batch #" + loadcount + ": " + err + "\n");
  }


  // POST to /reply to get bot's reply.
  getReply(req, res) {
  	// Get data from the JSON post.
    var username = req.body.username;
  	var message  = req.body.message;
  	var vars = req.body.vars;

  	// Make sure username and message are included.
  	if (typeof(username) === "undefined" || typeof(message) === "undefined") {
  		return error(res, "username and message required");
  	}

  	// Copy any user vars from the post into RiveScript.
  	if (typeof(vars) !== "undefined") {
  		for (var key in vars) {
  			if (vars.hasOwnProperty(key)) {
  				this.bot.setUservar(username, key, vars[key]);
  			}
  		}
  	}

  	// Get a reply from the bot.
  	this.bot.reply(username, message, this).then(function(reply) {
  		// Get all the user's vars back out of the bot to include in the response.
  		vars = this.bot.getUservars(username);
  		// Send the JSON response.
  		res.json({
  			"status": "ok",
  			"reply": reply,
  			"vars": vars
  		});
  	}).catch(function(err) {
  		res.json({
  			"status": "error",
  			"error": err
  		});
  	});
  }

  // All other routes shows the usage to test the /reply route.

  showUsage(req, res) {

  	var egPayload = {
  		"username": "soandso",
  		"message": "Hello bot",
  		"vars": {
  			"name": "Soandso"
  		}
  	};
  	res.writeHead(200, {"Content-Type": "text/plain"});
  	res.write("Usage: curl -i \\\n");
  	res.write("   -H \"Content-Type: application/json\" \\\n");
  	res.write("   -X POST -d '" + JSON.stringify(egPayload) + "' \\\n");
  	res.write("   http://localhost:2001/reply");
  	res.end();
  }

  // Send a JSON error to the browser.
  error(res, message) {
  	res.json({
  		"status": "error",
  		"message": message
	   });
  }
}
module.exports = Bot;
