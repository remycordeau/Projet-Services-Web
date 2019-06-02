var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const serviceURL="http://localhost:8081";
var request;
var serviceResponse;

module.exports = {

  newBot: function(username,botName,botPort,req,res){
    request = new XMLHttpRequest();
    if(request){
      request.open("PUT",serviceURL+'/newBot/'+`${botName}`+'/on/'+`${botPort}`, true);
      request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
          serviceResponse = JSON.parse(request.responseText);
          ErrorHandler("create",username,serviceResponse,req,res);
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
      request.open('DELETE',serviceURL+'/delete/'+`${botName}`, true);
      request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
          serviceResponse = JSON.parse(request.responseText);
          ErrorHandler("delete",username,serviceResponse,req,res);
        }
      };
      request.send(null);
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
              if(serviceResponse.Error != ""){
                ErrorHandler("information",username,serviceResponse,req,res);
              }else {
                responseBotInfo(username,serviceResponse,req,res);
              }
	          }
        };
       request.send(null);
    }else{
        console.error("Error during XMLHttpRequest");
    }
  },

  setBotStatusDown: function(username,botName,req,res){
    request = new XMLHttpRequest();
    if(request){
        request.open('POST', serviceURL+'/'+`${botName}`+"/status/down", true);
        request.onreadystatechange = function() {
	           if(request.readyState == 4 && request.status == 200){
		          serviceResponse = JSON.parse(request.responseText);
		          //console.log(serviceResponse);
              responseBotInfo(username,serviceResponse,req,res);
	          }
        };
       request.send(null);
    }else{
        console.error("Error during XMLHttpRequest");
    }
  },

  setBotStatusUp: function(username,botName,req,res){
    request = new XMLHttpRequest();
    if(request){
        request.open('POST', serviceURL+'/'+`${botName}`+"/status/up", true);
        request.onreadystatechange = function() {
	           if(request.readyState == 4 && request.status == 200){
		          serviceResponse = JSON.parse(request.responseText);
		          //console.log(serviceResponse);
              responseBotInfo(username,serviceResponse,req,res);
	          }
        };
       request.send(null);
    }else{
        console.error("Error during XMLHttpRequest");
    }
  },

  changeBrain: function(username,botName,brainName,req,res){
    request = new XMLHttpRequest();
    if(request){
        request.open('POST',serviceURL+'/'+`${botName}`+"/changeBrain/"+`${brainName}`);
        request.onreadystatechange = function(){
          if(request.readyState == 4 && request.status == 200){
           serviceResponse = JSON.parse(request.responseText);
           //console.log(serviceResponse);
           responseBotInfo(username,serviceResponse,req,res);
        }
      }
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

function ErrorHandler(pageToRender,username,serviceResponse,req,res){
  if(serviceResponse.Error != ""){
    res.render("error",{message: serviceResponse.Error, username: username});
  }else{
    res.render(pageToRender,{username: username})
  }
}
