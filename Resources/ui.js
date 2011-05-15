(function() {
    var isAndroid = uwmps.isAndroid;
    var ui = {};

    Ti.App.addEventListener("app:got.location", function(d) {
        Ti.API.debug("in ui "+d);
        ui.f_lng = d.longitude;
        ui.f_lat = d.latitude;
    });
    /**
     *
     */
    function goToNextWindow() {

        var win2 = Titanium.UI.createWindow({
            title:'Window Two',
            backgroundColor:'#fff'
        });
        tab1.open(win2);
    }

    function createAndroidMenus(e, params) {
        var menu = e.menu;
        for ( var x in params) {
            var m0 = menu.add({
                title : params[x].title
            });
            m0.addEventListener('click', params[x].callback);
        }
    }

    function addMapToWindow(_win) {
        //
        // CREATE MAP VIEW
        //
        var mapView = Titanium.Map.createView({
            mapType: Titanium.Map.STANDARD_TYPE,
            region: {
                latitude:ui.f_lat,
                longitude:ui.f_lng,
                latitudeDelta:0.2,
                longitudeDelta:0.2
            },
            animate:true,
            regionFit:true,
            //userLocation:true,
            //annotations:[map1,apple]
        });
        _win.add(mapView);
        return mapView;
    }

    function selectionTableListener(e) {

        Ti.API.info('rowData: ' + e.rowData);
        var win = ui.displayMapView(ui.currentWindow);

        // map stuff
        addMapToWindow(win);

        win.addEventListener('close', function(e) {
            ui.currentWindow.title = "Main Window";
        });
        ui.currentWindow.title = "Back";
        ui.currentTab.open(win, {
            animated:true
        });

    }

    /** ------------------------------------------------------------------------
     *
     *
     *
     ------------------------------------------------------------------------ */
    ui.displayMapView = function(_window) {
        var win1 = Titanium.UI.createWindow({
            backgroundColor:'#fff',
            tabBarHidden:true
        });

        var buttons = [{
            title:'Map',
            enabled:true
        },{
            title:'List',
            enabled:true
        }
        ];

        var tcButtonBar = Titanium.UI.createTabbedBar({
            labels:buttons,
            index: 0,
            style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
            height:30,
            width:'40%'
        });

        win1.setTitleControl(tcButtonBar);

        tcButtonBar.addEventListener('click', function(e) {
            Ti.API.log('You clicked index = ' + e.index);
            Ti.API.log('You clicked index = ' + tcButtonBar.index);
        });
        return win1;
    };
    /** ------------------------------------------------------------------------
     *
     *
     *
     ------------------------------------------------------------------------ */
    ui.createSelectionTable = function(_window) {

        var recentLocationsSection = Ti.UI.createTableViewSection({
            headerTitle:"Recent Locations"
        });
        var rmRow = Titanium.UI.createTableViewRow({
            font: {
                fontSize:20
            },
            height: '110%',
            hasChild: true
        });

        var iv = Ti.UI.createImageView({
            image:'images/locate.png',
            top:8,
            left:8,
            width:25,
            height:25
        });
        rmRow.add(iv);

        var rmLbl = Titanium.UI.createLabel({
            top:1,
            left:40,
            bottom: 3,
            text:'Use Current Location',
            font: {
                fontSize:18
            },
            textAlign : 'left',
            width:'95%',
            height:'auto'
        });
        rmRow.add(rmLbl);
        recentLocationsSection.add(rmRow);

        rmRow = Titanium.UI.createTableViewRow({
            font: {
                fontSize:20
            },
            height: '110%',
            hasChild: true
        });

        iv = Ti.UI.createImageView({
            image:'images/add.png',
            top:8,
            left:8,
            width:25,
            height:25
        });
        rmRow.add(iv);

        rmLbl = Titanium.UI.createLabel({
            top:1,
            left:40,
            bottom: 3,
            text:'Add Location',
            font: {
                fontSize:18
            },
            textAlign : 'left',
            width:'95%',
            height:'auto'
        });
        rmRow.add(rmLbl);
        recentLocationsSection.add(rmRow);

        // create table view
        var tableView = Titanium.UI.createTableView({
            data:[recentLocationsSection],
            style:Titanium.UI.iPhone.TableViewStyle.GROUPED
        });
        _window.add(tableView);

        // create table view event listener
        tableView.addEventListener('click', selectionTableListener);
    };
    /** ------------------------------------------------------------------------
     *
     *
     *
     ------------------------------------------------------------------------ */
    ui.createLocationWindow = function() {
        // create tab group
        var tabGroup = Titanium.UI.createTabGroup();
        //
        // create base UI tab and root window
        //
        var win1 = Titanium.UI.createWindow({
            title:'Main Window',
            backgroundColor:'#fff',
            tabBarHidden:true
        });
        var tab1 = Titanium.UI.createTab({
            icon:'KS_nav_views.png',
            title:'Tab 1',
            window:win1
        });

        if (uwmps.isAndroid == true) {
            // create the menus for the android version
            win1.activity.onCreateOptionsMenu = function(e) {
                createAndroidMenus(e, [{
                    title:'Next',
                    //callback:goToNextWindow
                },{
                    title:'Movie',
                    //callback:takeMovieHandler
                },{
                    title:'Close',
                    callback:closeApp
                }
                ]);
            }
        } else {
            var btn = Ti.UI.createButton({
                title:'Next'
            });
            win1.rightNavButton = btn;
            btn.addEventListener('click',goToNextWindow);

            // button to take movie
            var moviebtn = Ti.UI.createButton({
                title:'Movie'
            });
            win1.leftNavButton = moviebtn;
            moviebtn._window = win1;
            //moviebtn.addEventListener('click',takeMovieHandler);
        }

        //  add tabs
        tabGroup.addTab(tab1);

        // open tab group
        tabGroup.open();

        // keep track of current window and tab
        ui.currentTab = tab1;
        ui.currentWindow = win1;

        ui.createSelectionTable(win1);
        return win1;
    }
    uwmps.ui = ui;
})();