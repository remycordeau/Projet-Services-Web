var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var param = "";
const getAllBotsURL="http://localhost:8081/";
var getBotURL="http://localhost:8081/";
const postBotURL="http://localhost:8081";
const putBotURL="http://localhost:8081";
const deleteBotURL="http://localhost:8081";
const getBotReplyURL = "http://localhost:8081/talk"
const invocation = new XMLHttpRequest();


module.exports = {

 getBotReply: function(){
    if(invocation){
      invocation.open('POST', getBotReplyURL, true);
      //invocation.onreadystatechange = handler;
      invocation.send(null);
    }else{
      console.error("No Invocation TookPlace At All");
    }
 },
  getBot: function(botName){
      if(invocation){
        var params = "bot="+botName;
        console.log(params);
        console.log("URL : "+getBotURL);
        invocation.open('POST', getBotURL, true);
        //invocation.onreadystatechange = handler;
        invocation.send(params);
      } else{
        console.error("No Invocation TookPlace At All");
      }
  }
};
