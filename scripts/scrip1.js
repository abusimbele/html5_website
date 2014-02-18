window.onload = getMyLocation;

function getMyLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(displayLocation);
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