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

  addBot(name){

    let newBot = new Bot(8080);
    this.bots.set(name,newBot);
    var iterator = this.bots.keys();
    console.log("contains "+iterator.next().value);
    return this.getBot(name);
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

  /*updateTodo(updatedTodo){

    const hasTodo = this.todos.has(updatedTodo.id);

    if(hasTodo){

      this.todos.set(updatedTodo.id,updatedTodo);

      return updatedTodo;

    } else {

      return undefined;

    }
 }*/

  getAllBots(){

    let tabBots = [];
    for (const v of this.bots.values()) {
      tabBots.push(v);
    }
    return tabBots;
  }

  deleteBots(){
    this.bots.clear();
  }

}

module.exports = Bots;
