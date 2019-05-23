var XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;
var exports = module.exports;
var param = "";
const getAllBotsURL="http://localhost:8081/";
const getBotURL="http://localhost:8081?bot="+param;
const postBotURL="http://localhost:8081";
const putBotURL="http://localhost:8081";
const deleteBotURL="http://localhost:8081";
const getBotReplyURL = "http://localhost:8080/reply"
const invocation = new XMLHttpRequest();


exports.getBotReply = function(){
  if(invocation){
    invocation.open('POST', getBotReplyURL, true);
    //invocation.onreadystatechange = handler;
    invocation.send(null);
  }else{
    console.error("No Invocation TookPlace At All");
  }

  exports.getBot = function(botName){
      if(invocation){
        param = botName;
        invocation.open('POST', getBotURL, true);
        //invocation.onreadystatechange = handler;
        invocation.send(null);
        param = "";
      } else{
        console.error("No Invocation TookPlace At All");
      }
  }
}
