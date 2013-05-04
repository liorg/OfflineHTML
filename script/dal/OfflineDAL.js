function OnDbError(err) {
    console.log(err);
}


function GetDataSource() {
    var db = openDatabase("6", "1.0", "MMIS Mobile ", 1024 * 1024 * 5);
    return db;
}


function executeNonQuery(sqlStatement, params, callback, errorCallback) {
    try {
        var db = GetDataSource();
        var errorHandler = errorCallback;

        if (!errorCallback) {
            errorHandler = OnDbError;
        }

        db.transaction(function (tx) {
            tx.executeSql(sqlStatement, params,
                        function (tx, result) {  callback(result); },
                        function (tx, error) {  errorHandler(error); })
        });
    }
    catch (err) {
        OnDbError(err);
    }
}

//examples
function createContactsTable(parameters, blCallback) {
    executeNonQuery("CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, phone TEXT)"
        , parameters,
        function (data) {
            if (blCallback)
                blCallback(data);
        },
        null);
}

function selectContactsTable(parameters, blCallback) {
    executeNonQuery("SELECT * FROM Contacts",
        parameters,
        function (data) {

            if (blCallback) {
                blCallback(data);
            }
        },
        null);
}

function insertContact(parameters, blCallback) {
    executeNonQuery("INSERT INTO Contacts (firstName, lastName, phone) VALUES (?, ?, ?)",
        parameters,
        function (data) {
            if (blCallback)
                blCallback(data);
        },
        null);
}

function updateContact(parameters, blCallback) {
    executeNonQuery("UPDATE Contacts SET firstName = ?, lastName = ?, phone = ? WHERE id = ?",
        parameters,
        function (data) {
            if (blCallback)
                blCallback(data);
        },
        null);
}


function deleteContact(parameters, blCallback) {
    executeNonQuery("DELETE FROM Contacts WHERE id=?",
        parameters,
        function (data) {
            if (blCallback)
                blCallback(data);
        },
        null);
}
//end example for dal

function updateClientDetails() {
    var arr = paramsToArray(arguments);
    var blCallback = arguments[arguments.length - 1];
    executeNonQuery("UPDATE Missions SET SubscriberFirstName1_Update=?, SubscriberLastName1_Update=?, SubscriberId1_Update=?,SubscriberFirstName2_Update=?, SubscriberLastName2_Update=?,  SubscriberId2_Update=?, SubscriberAddress_Update=?, SubscriberHouseNumber_Update=?, SubscriberEntrance_Update=?, SubscriberFloor_Update=?,SubscriberCity_Update=?, SubscriberMobile_Update=?, SubscriberEmail_Update=?, SubscriberFax_Update=?, SubscriberNotes_Update=?, SubscriberMail_Update=? WHERE MissionId = ? and MissionSoId = ?",
        arr,
        function (data) {
            if (blCallback)
                blCallback(data);
        },
            null);

}

function GetDescriptionByMissionDAL(parameters, blCallback) {
    executeNonQuery("select distinct Description from CodeTablesData where CodeTableId=? and TableId=?",
        parameters,
        function (data) {
            if (blCallback)
                blCallback(data);
        },
        null);
}

function GetSalesByMissionDAL(parameters, blCallback) {

    executeNonQuery("select FinalPrice,Amount,SaleProductName,SaleProductType,ExchangeProductId,ActivityReason,SaleProductId from MissionSales where missionId=? and missionSoId=?",
        parameters,
        function (data) {
            //   
            if (blCallback)
                blCallback(data);
        },
        null);
}

function GetGazitSalesByMissionDAL(parameters, blCallback) {
    executeNonQuery("select FinalPrice,Amout,SaleProductName,ItemCode from GazitSales where missionId=? and missionSoId=?",
        parameters,
        function (data) {
            //   
            if (blCallback)
                blCallback(data);
        },
        null);
}


function updateCustomerConfirmationDAL(parameters, blCallback) {
    
    executeNonQuery("UPDATE Missions SET CloseMission_RecieverName = ?, CloseMission_HaveAttPower = ? , CloseMission_Signature = ?, CloseMission_TechnicComment = ?, CloseMission_ConfirmationFilled = ? WHERE MissionId = ? and MissionSoId = ?",
        parameters,
        function () {
            alert("נתונים עודכנו בהצלחה")
        },
          function () {
              alert("עדכון נכשל !")
          });
}

function paramsToArray(arguments) {
    var arr = new Array();
    for (var i = 0; i < arguments.length - 1; i++) {
        arr[i] = arguments[i];
    }
    return arr;
}

function SelectMissionsForScheduleBox(parameters, blCallback) {
    executeNonQuery("SELECT MissionId, MissionSoId, CustomerFirstName1, CustomerLastName1,SubscriberAddress, MissionStartTime, MissionEndTime, MissionStatusId, RequestorFirstName, RequestorLastName, RequestorPhone, SubscriberFirstName, SubscriberLastName, SubscriberPhoneNumber, MissionType, SubscriberSreMark, MissionSoNotes, MissionNotes, TechnicNotes, MissionOrigion, MissionWindowStartTime, MissionWindowEndTime, IsMatchedMission, ProblemNumOfDefects, END_SLA, IsClientNotified,CustomerMark,MissionWindowStartTime,MissionWindowEndTime,RepeatSoID,Defect_location , TechnicianId FROM Missions",
    parameters, function (data) {
        if (blCallback)
            blCallback(data);
    }, null);
}


function bobo(a,b,c) {
    var blCallback = c;
    var command = "SELECT CATALOGID, EQUIPMENTCODEID, EQUIPMENTDESC, FAMILYCODE, FAMILYDESC, DELTAID, UPDATEDATE, TRANSACTIONID FROM ExchangeAndRefund WHERE TRANSACTIONID = ? AND EQUIPMENTCODEID in (";
    command += b + ')';
    executeNonQuery(command, [a], function (data) {
        if (blCallback)
            window[blCallback](data);
    }, null);
}
