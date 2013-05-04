var results = document.getElementById('results');

var id = document.getElementById('id');

var firstName = document.getElementById('firstName');

var lastName = document.getElementById('lastName');

var phone = document.getElementById('phone');
var createStatement = "CREATE TABLE ExchangeAndRefund([CATALOGID] TEXT , [EQUIPMENTCODEID] INTEGER , [EQUIPMENTDESC] TEXT , [FAMILYCODE] TEXT , [FAMILYDESC] TEXT , [DELTAID] INTEGER , [UPDATEDATE] TEXT , [TRANSACTIONID] TEXT )";

var selectAllStatement = "SELECT * FROM ExchangeAndRefund";
var insertStatement = "INSERT INTO {0} (CATALOGID, EQUIPMENTCODEID, EQUIPMENTDESC, FAMILYCODE, FAMILYDESC, DELTAID, UPDATEDATE, TRANSACTIONID) VALUES (?,?,?,?,?,?,?,?)";
var updateStatement = "UPDATE Contacts SET firstName = ?, lastName = ?, phone = ? WHERE id = ?";
var deleteStatement = "DELETE FROM ExchangeAndRefund WHERE CATALOGID=?";
var dropStatement = "DROP TABLE ExchangeAndRefund";
var db = openDatabase("test", "1.0", "test test", 500000);
var dataset;
createTable();
function onError(tx, error) {
    alert(error.message);
}
function showRecords() {
    results.innerHTML = '';
    db.transaction(function (tx) {
        tx.executeSql(selectAllStatement, [], function (tx, result) {
            dataset = result.rows;
            for (var i = 0, item = null; i < dataset.length; i++) {
                item = dataset.item(i);
                results.innerHTML +=
                  '<li>' + item['CATALOGID'] + ' , ' + item['EQUIPMENTCODEID']  +" , "+ item['EQUIPMENTDESC']+ <a href="#" onclick="loadRecord(' + i + ')">edit</a>  ' +
 '<a href="#" onclick="deleteRecord(' + item['CATALOGID'] + ')">delete</a></li>';
            }
        });
    });
}
function createTable() {
    db.transaction(function (tx) {
        tx.executeSql(createStatement, [], showRecords, onError);
    });
}
function insertRecord() {
    db.transaction(function (tx) {
        tx.executeSql(insertStatement, [firstName.value, lastName.value, phone.value], loadAndReset, onError);
    });
}
function loadRecord(i) {
    var item = dataset.item(i);
    firstName.value = item['firstName'];
    lastName.value = item['lastName'];
    phone.value = item['phone'];
    id.value = item['CATALOGID'];
}

function updateRecord() {
    db.transaction(function (tx) {
        tx.executeSql(updateStatement, [firstName.value, lastName.value, phone.value, id.value], loadAndReset, onError);
    });
}
function deleteRecord(id) {
    db.transaction(function (tx) {
        tx.executeSql(deleteStatement, [id], showRecords, onError);
    });
    resetForm();
}
function dropTable() {
    db.transaction(function (tx) {
        tx.executeSql(dropStatement, [], showRecords, onError);
    });
    resetForm();
}

function loadAndReset() {
    resetForm();
    showRecords();
}

function resetForm() {
    firstName.value = '';
    lastName.value = '';
    phone.value = '';
    id.value
}
