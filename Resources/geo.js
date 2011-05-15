(function() {

    var geo = {
        "f_lat":null,
        "f_lng":null
    };
    uwmps.geo = geo;

    Ti.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
    Ti.Geolocation.purpose = "testing";
    Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
    Titanium.Geolocation.distanceFilter = 10;

    var isAndroid = uwmps.isAndroid;

    Ti.App.addEventListener("app:got.location", function(d) {
        uwmps.geo.f_lng = d.longitude;
        uwmps.geo.f_lat = d.latitude;
        Ti.API.debug(JSON.stringify(d));

        // you need to remove this listener, see the blog post mentioned above
        Ti.Geolocation.removeEventListener('location', uwmps.geo.updatePosition);

    });
    uwmps.geo.updatePosition = function(e) {

        if( ! e.success || e.error ) {
            alert("Unable to get your location.");
            Ti.API.debug(JSON.stringify(e));
            Ti.API.debug(e);
            return;
        }

        //geo.f_lng = e.coords.longitude;
        //geo.f_lat = e.coords.latitude;

        Ti.App.fireEvent("app:got.location",  e.coords );
    };
    uwmps.geo.initLocationServices = function() {

        if( Titanium.Geolocation.locationServicesEnabled === false ) {
            Ti.API.debug('Your device has GPS turned off. Please turn it on.');
        }

        Titanium.Geolocation.getCurrentPosition( uwmps.geo.updatePosition );
        //Titanium.Geolocation.addEventListener( 'location', geo.updatePosition );
    }
    uwmps.geo.initLocationServices();
})();