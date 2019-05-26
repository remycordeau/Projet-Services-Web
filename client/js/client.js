var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const getAllBotsURL="http://localhost:8081/";
const getBotURL="http://localhost:8081/";
const invocation = new XMLHttpRequest();


module.exports = {

  newBot: function(botName){
    if(invocation){
      invocation.open('POST',getBotURL+'/newBot/'+`${botName}`, true);
      //invocation.onreadystatechange = handler;
      invocation.send(null);
    }else{
      console.error("No Invocation TookPlace At All");
    }
  },

  deleteBot: function(botName){
    if(invocation){
      invocation.open('POST',getBotURL+'/delete/'+`${botName}`, true);
      //invocation.onreadystatechange = handler;
      invocation.send(null);
    }else{
      console.error("No Invocation TookPlace At All");
    }
  },

 getBotReply: function(botName){
    if(invocation){
      invocation.open('POST',getBotURL+`${botName}`+'/talk', true);
      //invocation.onreadystatechange = handler;
      invocation.send(null);
    }else{
      console.error("No Invocation TookPlace At All");
    }
 },

  getBot: function(botName){
      if(invocation){
        invocation.open('POST', getBotURL+`${botName}`, true);
        //invocation.onreadystatechange = handler;
        invocation.send(null);
      } else{
        console.error("No Invocation TookPlace At All");
      }
  }
};
