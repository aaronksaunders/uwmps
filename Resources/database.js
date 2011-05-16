(function() {
    uwmps.db = {};

    //bootstrap database
    var db = Ti.Database.open('uwmps_database');
    db.execute('CREATE TABLE IF NOT EXISTS favorites(id INTEGER PRIMARY KEY, user_id TEXT, data_object TEXT, time_stamp DATE);');
    db.close();
    Ti.App.fireEvent("app:database.initialized", {});

    /** ---------------------------------------------------------------------------
     *
     */
    uwmps.db.addFavorite = function( _data) {
        var db = Ti.Database.open('uwmps_database');
        var dataObject = null;
        if (_data) {
            dataObject = JSON.stringify(_data);
        }
        db.execute("INSERT INTO favorites(data_object,time_stamp) VALUES(?,?)", dataObject, new Date());
        var lastID = db.lastInsertRowId;
        db.close();

        //Dispatch a message to let others know the database has been updated
        Ti.App.fireEvent("app:favorites.updated", {
            lastID:lastID
        });

        return lastID;
    };
    /** ---------------------------------------------------------------------------
     *
     */
    uwmps.db.deleteFavorite = function(_id) {
        var db = Ti.Database.open('uwmps_database');
        db.execute("DELETE FROM favorites WHERE id = ?",_id);
        db.close();

        //Dispatch a message to let others know the database has been updated
        Ti.App.fireEvent("app:favorites.updated", {});
    };
    /** ---------------------------------------------------------------------------
     *
     */
    uwmps.db.getFavorites = function() {
        var favsList = [];
        var db = Ti.Database.open('uwmps_database');
        var result = db.execute('SELECT * FROM favorites');
        while (result.isValidRow()) {
            favsList.push({
                data_object: result.fieldByName('data_object'),
                id: result.fieldByName('id'),
                time_stamp: result.fieldByName('time_stamp')
            });
            result.next();
        }
        result.close();
        db.close();

        Ti.API.debug("getFavorites "+JSON.stringify(favsList));

        return favsList;
    };
})();