
/**
 * Constructor
 */
function Webservice(){
    //private variables
    var url;
    var request;
}




/**
 * This function is a typical AJAX-client-side data request (cross-site-scripting isn't possible)
 */
var xmlService = function(url){
    request = new XMLHttpRequest();     // creates request-object
    request.open("GET",url);            // type of request and address 
    request.onload = requestHandler;    // function that is called after request fulfilled
    request.send(null);                 // Gogogo request
}


/**
 * *private method
 * This function askes for a json-serialized object from a webservice (cross-site-scripting possible) 
 */
var jsonpService = function(url){
    
}



/**
 * private method
 */
var requestHandler = function(){
    
}


