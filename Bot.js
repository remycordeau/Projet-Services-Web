const RiveScript = require("rivescript");
const Readline = require("readline");

const rl = Readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Bot{

constructor(){
    this.bot = new RiveScript();
    this.initBot();
  }

getBot(){
    return this.bot;
  }

  initBot(){
    this.bot.loadFile("./brain/standard.rive")
    .then(this.load_successfull())
  }

  load_successfull(){
    console.log("Bot files loaded successfully !");
    this.bot.sortReplies();
    this.ask();
  }

  ask(message){
    this.bot.sortReplies();
    this.bot.reply(message)
    .then(console.log);
  }


}
module.exports = Bot;
