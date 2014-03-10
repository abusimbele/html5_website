
/**
 * Constructor
 */
function Webservice(){
    //private variables
    var url;
    var request;


/**
 * private method
 * This function is a typical AJAX-client-side data request (cross-site-scripting isn't possible)
 */
function xmlService(url){
    request = new XMLHttpRequest();     // creates request-object
    request.open("GET",url);            // type of request and address 
    request.onload = requestHandler;    // function that is called after request fulfilled
    request.send(null);                 // Gogogo request
}


/**
 * *private method
 * This function askes for a json-serialized object from a webservice (cross-site-scripting possible) 
 */
function jsonpService(url){
}



/**
 * private method
 */
function requestHandler(){
}


