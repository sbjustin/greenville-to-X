var originCity = "greenville, sc"
var destinationCities = new Array("orlando, fl","chantilly, va","chesapeake, va", "asheville, nc");

var map;
var mapOptions = { center: new google.maps.LatLng(34.8444, -82.3856), zoom: 3,
  mapTypeId: google.maps.MapTypeId.ROADMAP };

var directionsDisplays = new Array()
for (var i = 0; i < destinationCities.length; i++) {
  directionsDisplays[i] = new google.maps.DirectionsRenderer({
      suppressMarkers: false,
      suppressInfoWindows: true,
      preserveViewport: false
    });
  directionsDisplays[i].setMap(map);
};


function initialize() {
  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  directionsService = new google.maps.DirectionsService();

  for (var i = 0; i < destinationCities.length; i++) {
    var request = { origin:       originCity, 
                    destination:  destinationCities[i], 
                    travelMode:   google.maps.DirectionsTravelMode.DRIVING };
    

    directionsService.route(request, function(response, status) {
      console.log (response)
      temp = response
      if (status == google.maps.DirectionsStatus.OK) {
        i = i - 1; //i is incrementing by 1 for some reason
        // directionsDisplays[i].markerOptions = {title: "magic"};
        directionsDisplays[i].setMap(map);
        directionsDisplays[i].setDirections(response);
      };
    });
  };

}
temp = ""
google.maps.event.addDomListener(window, 'load', initialize);