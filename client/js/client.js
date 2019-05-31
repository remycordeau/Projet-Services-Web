var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const serviceURL="http://localhost:8081";
var request;
var serviceResponse;

module.exports = {

  newBot: function(username,botName,botPort,req,res){
    request = new XMLHttpRequest();
    if(request){
      request.open("POST",serviceURL+'/newBot/'+`${botName}`+'/on/'+`${botPort}`, true);
      request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
          serviceResponse = JSON.parse(request.responseText);
          handlerErr(username,serviceResponse,req,res);
        }
      }
      request.send(null);
    }else{
      console.error("Error during XMLHttpRequest");
    }
  },

  deleteBot: function(username,botName,req,res){
    request = new XMLHttpRequest();
    if(request){
      request.open('POST',serviceURL+'/delete/'+`${botName}`, true);
      request.onreadystatechange = handler;
      request.send(null);
      var botList = serviceResponse;
      res.render("delete",{username: username});
    }else{
      console.error("Error during XMLHttpRequest");
    }
  },

 getAllBots: function(username,req,res){
   request = new XMLHttpRequest();
   if(request){
     request.open("GET",serviceURL,true);
     request.onreadystatechange = function() {
	      if(request.readyState == 4 && request.status == 200){
		        serviceResponse = JSON.parse(request.responseText);
		        //console.log(serviceResponse);
		        responseAllBots(username,serviceResponse,req,res);
	      }else{
     	      console.error("request Errors Occured " + request.readyState + " and the status is " + request.status);
        }
     };
     request.send(null);
   }else{
     console.error("Error during XMLHttpRequest");
   }
 },

  getBot: function(username,botName,req,res){
    request = new XMLHttpRequest();
    if(request){
        request.open('GET', serviceURL+'/'+`${botName}`, true);
        request.onreadystatechange = function() {
	           if(request.readyState == 4 && request.status == 200){
		          serviceResponse = JSON.parse(request.responseText);
		          //console.log(serviceResponse);
		          responseBotInfo(username,serviceResponse,req,res);
	          }else{
              console.error("request Errors Occured " + request.readyState + " and the status is " + request.status);
            }
        };
       request.send(null);
    }else{
        console.error("Error during XMLHttpRequest");
    }
  }
};

function responseAllBots(username,serviceResponse,req,res){
  res.render('Administration',{username: username,botList: serviceResponse});
}


function responseBotInfo(username,serviceResponse,req,res){
  res.render('botInfo',{username: username,botInfo: serviceResponse});
}

function handlerErr(username,serviceResponse,req,res){
            if(serviceResponse.Error != ""){ // deal with error when creating a new bot
              res.render("error",{message: serviceResponse.Error, username: username});
            }else{
              res.render("create",{username: username})
            }
}
