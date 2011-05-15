// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// APPLICATION NAMESPACE
var uwmps = {};

Titanium.include('utils.js');
Titanium.include('geo.js');
Titanium.include('ui.js');
//Titanium.include('http.js');

// Make namespace globally available
Ti.App.uwmps = uwmps;

Ti.App.uwmps.isAndroid = (Titanium.Platform.osname == 'android');

var window = uwmps.ui.createLocationWindow();
