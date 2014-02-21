/*########################
  #     HTML5            #
  ########################*/


//geolocation
var coordsHTML5;

//javascript executed after window is loaded.
window.onload = main;


function main(){
    if (getMyLocation()){
    }
    

}


/**
 *MAIN
 *This function is responsible for html5-geolocation-magic!
 *@return: return true if location information is available, otherwise false
 */ 
function getMyLocation(){
    
    // Geolocation options for enery-saving(accuracy), maximumAge for "realtime-" behaviour and timeout for faster error-handling (infinety otherwise!).
    var geo_options = {
    enableHighAccuracy: true, 
    maximumAge        : 30000, 
    timeout           : 20000
    };
    
    //Check if geolocation is available and if so, connect the handler!
    if(checkLocationAvailable()) {
        navigator.geolocation.getCurrentPosition(displayLocation,displayError,geo_options);
        return true;
    }
    return false;
    
}

/**
 *Checks if location information are available 
 *If no location-information exists an alert-window will be shown
 */
function checkLocationAvailable(){
    if(navigator.geolocation){
        return true;
    }
    else{
        window.alert("There is no location");
    }
    return false;
    
}


/**
 *Handler
 *This function needs the position-object from geolocation and fills the DOM-element div with id "location" with the latidude and longitude of the current location.   
 */
function displayLocation(position){
    coordsHTML5 = position.coords;
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var div = document.getElementById("location");
    div.innerHTML="Lat: " + latitude + " Long: " + longitude; 
    
    showMap(coordsHTML5);
    

}


/**
 *This function handles errors raised by getting the current position and let the browser show an alert-window with specific an error-message.
 */
function displayError(error){
     window.alert("fct:error reached");
    
    //Error-Type-Object that consits of all possible error-types that may occur.   
    var errorTypes ={
        0 : "Unknown error",
        1 : "Permission denied by user",
        2 : "Position is not available",
        3 : "Request timed out"
    };
    
    var errorMessage = errorTypes[error.code];
/*    if (error.code == 0 || error.code == 2){
      errorMessage = errorMessage*/
    window.alert(errorMessage);

}



/*#######################
  #   GOOGLE-MAPS       #
  #######################*/


var map;

var mapOptions;

//location in the DOM for the Google-Map
var mapDiv = document.getElementById("google_maps");


/**
 * This function sets the google-map with the current location to the DOM.
 * It also initialises the map-variable with the current location and options.
 */
function showMap(coords){
    
    /**
     * Transform the html5 geolocation-Lat and Long to an google-maps LatLong-Object
     */
    
    var googleLatAndLong = new google.maps.LatLong(coords.latitude,coords.longitude);
    
   
    //Options-object for google-maps
    mapOptions = {
        zoom:       10,
        center:     googleLatAndLong,
        mapTypeId:  MapTypeId.ROADMAP //other options: SATELLITE, HYPRID
    };
    
    map = new google.maps.Map(mapDiv,mapOptions);   
    
}











