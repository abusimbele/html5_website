/*########################
  #     HTML5            #
  ########################*/


//geolocation
var coordsHTML5;
var watchID;
var continousTracking=false;

//javascript executed after window is loaded.
window.onload = mainfct;




/**
 * This is the main-procedure for this script
 */
function mainfct(){
    registerEvents();
    getMyLocation(continousTracking);
    
    }
    

/**
 * This function registers all events we have implemented in the html-file 
 */
function registerEvents(){
    //Regsiter html5-events

    var clearButton = document.getElementById("clearWatch");
    clearButton.onclick = clearWatch;
    
    
    var watchButton = document.getElementById("watch");
    watchButton.onclick = function(){getMyLocation(true);window.alert("Tracking activated!");};
    

}
    



/*########################
  #  HTML5-Geolocation   #
  ########################*/



/**
 *
 * This function is responsible for html5-geolocation-magic!
 * @continousTracking: if true, the position will be continous renewed
 * @return: return true if location information is available, otherwise false. default: false
 */ 
function getMyLocation(continousTracking){
    var continousTracking = typeof continousTracking !== 'undefined' ? continousTracking : false; //default value
    // Geolocation options for enery-saving(accuracy), maximumAge for "realtime-" behaviour and timeout for faster error-handling (infinety otherwise!).
    var geo_options = {
    enableHighAccuracy: true,//energy vs. exact position 
    maximumAge        : 0, // through cache and old? we use: new postion without cache!
    timeout           : 10000 // how long to react for the browser untill an error will be thrown #default:infinity # we use: reaction time of 10s for the browser, because GPS needs its time
    };
    
    //Check if geolocation is available and if so, connect the handler!
    //There are two options: 1.) continous tracking that will monitor and reactor on location changes and 2.) only once current-position display
    if(checkLocationAvailable()) {
          if(continousTracking){
            watchID=navigator.geolocation.watchPosition(displayLocation,displayError,geo_options);
        }       
        else{ 
            navigator.geolocation.getCurrentPosition(displayLocation,displayError,geo_options);
            }
        return true;
    }
    return false;
  
}

/**
 * Checks if location information are available 
 * If no location-information exists an alert-window will be shown
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
 * Handler
 * This function needs the position-object from geolocation and fills the DOM-element div with id "location" with the latidude and longitude of the current location.   
 */
function displayLocation(position){
    coordsHTML5 = position.coords;
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var div = document.getElementById("location");
    div.innerHTML="Lat: " + latitude + " Long: " + longitude; 
    
    showAccuracy(position);
    
    showMap(coordsHTML5);
    
    //window.alert(position.timestamp);
}


/**
 * This function handles errors raised by getting the current position and let the browser show an alert-window with specific an error-message.
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

/**
 * This
 */
function showAccuracy(position){
    var div = document.getElementById("accuracy");
    div.innerHTML="The actual accuracy to estimate your current location is ca.: " + (position.coords.accuracy/1000)+"km";
}


function clearWatch(){
    navigator.geolocation.clearWatch(watchID);
    window.alert("Tracking deactivated!");
}



/*#######################
  #   GOOGLE-MAPS       #
  #######################*/


var mapGoogle;





/**
 * This function sets the google-map with the current location to the DOM.
 * It also initialises the map-variable with the current location and options.
 */
function showMap(coords){
    
    
    /**
     * Transform the html5 geolocation-Lat and -Long to an google-maps LatLong-Object
     */
    
    var googleLatAndLong = new google.maps.LatLng(coords.latitude,coords.longitude);
    
    
    
   
    //Options-object for google-maps
     mapOptions = {
        zoom:       15,
        center:     googleLatAndLong,
        mapTypeId:  google.maps.MapTypeId.ROADMAP //other options: SATELLITE, HYPRID
    };
    
    var mapDiv = document.getElementById("googlemaps"); 
    
    
    if(mapGoogle){}
    else{mapGoogle = new google.maps.Map(mapDiv,mapOptions);}
    
    
    addMarker(mapGoogle,googleLatAndLong,"Current Position","Here you are!");
   
}


/**
 * This function adds adds a marker to a map and shows a tooltip and a info-window after a click-event
 */
function addMarker(map,googleLatAndLong,title,content){
    
    var markerOptions = {
        position    :   googleLatAndLong,
        map         :   map,
        title       :   title,
        clickable   :   true
    };
    
    
    //Options for the info-window
    var infoWindowOptions={
        content     :   content, //text that will be shown
        position    :   googleLatAndLong //geolocation of the marker
    };
    
    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    
    var marker = new google.maps.Marker(markerOptions);
    
    //UI-interaction with listener and handler
    google.maps.event.addListener(marker,"click",function(){infoWindow.open(map);});
    
    
    
}

