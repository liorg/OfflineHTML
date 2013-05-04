function GetDataSource() {
    var db = openDatabase('mydb', '1.0', 'my first database',1024 * 1024 * 5);

    return db;
}

function CreateSignaturesIfNotExsist() {
    var db = GetDataSource();
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS  Signatures (missionid , missionsoid,technicianid,signature,typepic)');
 }
       );
}

function executeNonQuery(sqlStatement, params, callback, errorCallback) {
    try {
    debugger
        var db = GetDataSource();
        var errorHandler = errorCallback;

        if (!errorCallback) {
            errorHandler = OnDbError;
        }

        db.transaction(function (tx) {
            tx.executeSql(sqlStatement, params,
                        function (tx, result) { debugger; callback(result); },
                        function (tx, error) { debugger; errorHandler(error); })
        });
    }
    catch (err) {
        debugger;
        alert(err);
        OnDbError(err);
    }
}
function OnDbError(err) {
    debugger;
    console.log(err);
}

///////////   ***** //////////////
//function LoadData(id, val) {
//    var db = GetDataSource();
//    db.transaction(function (tx) {
//        tx.executeSql('CREATE TABLE IF NOT EXISTS foo (id unique, text)');
//        tx.executeSql('INSERT INTO foo (id, text) VALUES (' + id + ', "' + val + '")');
//    }
//       );
//}

