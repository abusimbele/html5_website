window.onload = getMyLocation;

function getMyLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(displayLocation,displayError)
    }
    else{
        window.alert("Moep Moep!!!");
        
    }
    
}


function displayLocation(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var div = document.getElementByID("location");
    div.innerHTML="Lat: " + latitude + " Long: " + longitude; 
    
}

function displayError(error){
    var errorTypes ={
        0 : "Unknown error",
        1 : "Permission denied by user",
        2 : "Position is not available",
        3 : "Request timed out"
    };
    
    var errorMessage = errorTypes[error.code];
/*    if (error.code == 0 || error.code == 2){
      errorMessage = errorMessage*/
    window.alert(""+errorMessage);

}