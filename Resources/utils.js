(function() {
    var isAndroid = uwmps.isAndroid;

    /**
     *
     */
    uwmps.showActivityIndicator = function(currentWindow) {

        if (isAndroid) {
            currentWindow.toolActInd = Titanium.UI.createActivityIndicator({
                bottom:10,
                height:50,
                width:10,
                style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN
            });
            currentWindow.toolActInd.show();
            currentWindow.toolActInd.message = 'Loading...';
        } else {
            //movieTest.currentWindow = currentWindow;
            currentWindow.toolActInd = Titanium.UI.createActivityIndicator();
            currentWindow.toolActInd.style = Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN;
            currentWindow.toolActInd.font = {
                fontFamily:'Helvetica Neue',
                fontSize:15,
                fontWeight:'bold'
            };
            currentWindow.toolActInd.barColor = 'black';
            currentWindow.toolActInd.color = 'white';
            currentWindow.toolActInd.message = 'Loading...';
            currentWindow.setToolbar([currentWindow.toolActInd], {
                animated:true
            });
            currentWindow.toolActInd.show();
        }
    }
    /**
     *
     */
    uwmps.hideActivityIndicator = function(currentWindow) {
        var win = currentWindow || uwmps.ui.currentWindow;

        if (isAndroid) {
            if (win.toolActInd != undefined) {
                win.toolActInd.hide();
            }
        } else {
            win.setToolbar(null, {
                animated:true
            });
        }
    }
})();