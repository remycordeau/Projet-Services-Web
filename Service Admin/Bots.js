const Bot = require("./Bot.js");

class Bots{

  constructor(){
  this.bots = new Map();
  }

  get size(){
    return this.bots.size;
  }

  getBotList(){
    return this.bots;
  }

  addBot(name,port){
    let newBot = new Bot(port);
    this.bots.set(name,newBot);
    var iterator = this.bots.keys();
    console.log("contains "+iterator.next().value);
  }

  getBot(name){
    return this.bots.get(name);
  }

  deleteBot(name){

    let bot = this.bots.get(name);
    if(bot != null){
        this.bots.delete(name);
      return name;
    } else {
      return null;
    }
  }

  getAllBots(){

    let tabBots = [];
    for (const v of this.bots.values()) {
      tabBots.push(v);
    }
    return tabBots;
  }

  getAllPorts(){
    let allPorts = [];
    for (const v of this.bots.values()) {
      allPorts.push(v.getPort());
    }
    return allPorts;
  }

  deleteBots(){
    this.bots.clear();
  }

}

module.exports = Bots;
