var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const serviceURL="http://localhost:8081";
var request;
var serviceResponse;

module.exports = {

  newBot: function(botName,req,res){
    request = new XMLHttpRequest();
    if(request){
      request.open("POST",serviceURL+'/newBot/'+`${botName}`, true);
      request.onreadystatechange = handler;
      request.send(null);
      res.render("create");
    }else{
      console.error("Error during XMLHttpRequest");
    }
  },

  deleteBot: function(botName,req,res){
    request = new XMLHttpRequest();
    if(request){
      request.open('POST',serviceURL+'/delete/'+`${botName}`, true);
      request.onreadystatechange = handler;
      request.send(null);
      var botList = serviceResponse;
      res.render("delete");
    }else{
      console.error("Error during XMLHttpRequest");
    }
  },

 getAllBots: function(req,res){
   request = new XMLHttpRequest();
   if(request){
     request.open("GET",serviceURL,true);
     request.onreadystatechange = handler;
     request.send(null);
     var botList = serviceResponse;
     res.render('Administration',{username: login,botList: botList});
   } else{
     console.error("Error during XMLHttpRequest");
   }
 },

  getBot: function(botName){
    request = new XMLHttpRequest();
    if(request){
        request.open('POST', serviceURL+`${botName}`, true);
        request.onreadystatechange = handler;
        request.send(null);
    }else{
        console.error("Error during XMLHttpRequest");
    }
  }
};

function handler(evtXHR){
  if (request.readyState == 4){
    if (request.status == 200){
      try{
      		  serviceResponse = JSON.parse(request.responseText);
		        console.log(serviceResponse);
	         }catch(err){
		           console.log("request.responseText "+request.responseText);
	         }
    }else{
      console.error("request Errors Occured " + request.readyState + " and the status is " + request.status);
    }
  }else{
    console.log("currently the application is at" + request.readyState);
  }
}
