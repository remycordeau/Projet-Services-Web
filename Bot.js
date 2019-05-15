// un bot est constitué d'un nom et d'un bot rivescript
const RiveScript = require("rivescript");

class Bot{ 

  constructor(name){

    this.name = name;
    console.log(this.name);
    this.bot = new RiveScript();
    this.initBot();  
  }

  get name(){
    return this.name;
  }

  initBot(){

   this.bot.loadDirectory("brain")
   .then(this.loading_done)
   .catch(this.loading_error);

   this.bot.loadFile(["brain/standard.rive"])
   .then(this.loading_done)
   .catch(this.loading_error);
  }

  loading_done(){
	console.log("Bot has finished loading !");
	this.bot.sortReplies();
  }

  loading_error(error,filename,lineno){
	console.log("error when loading files :"+error);
  }
}

module.exports;
