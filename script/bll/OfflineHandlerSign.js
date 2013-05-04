debugger;
if (typeof (Signature) == "undefined")
    var Signature = {};

Signature.isUpdate = true;
Signature.isRetrieve = false;
Signature.OnLoad = function () {
    debugger;
    Signature.isUpdate = false;
    Signature.isRetrieve = false;
}
Signature.SavePicOffline = function (missionId, missionSoId, TechnicianId, signature) {
    debugger;
    Signature.isUpdate = false;
    var sql = "";
    CreateSignaturesIfNotExsist();
    signatureData = signature.split(',');
    var typePic = signatureData[0];
    var pic = signatureData[1];
    var param = [missionId, missionSoId, TechnicianId];
    executeNonQuery('select missionId, missionsoid,technicianid,typePic, signature from Signatures where  missionId= ? and missionsoid=? and TechnicianId=?',
        param,
        function (data) {
            debugger;
            if (data.rows.length == 0) {
                sql = "INSERT INTO Signatures (typepic,signature,missionId, missionsoid,technicianid) VALUES ( ?,?,?,?,?)";
            }
            else {
                sql = "UPDATE Signatures set typepic=?,signature=? where missionId=? and  missionsoid= ? and technicianid=?";
            }
            param = [typePic, pic, missionId, missionSoId, TechnicianId];
            executeNonQuery(sql, param, function (data) {
                debugger;
                Signature.CallBackSavePic(data);
            });
        });
}
Signature.GetPicOffline = function (missionId, missionSoId, TechnicianId, picElement) {
    debugger
    Signature.isRetrieve = false;
    var param = [missionId, missionSoId, TechnicianId];
    executeNonQuery('select missionId, missionsoid,technicianid,typePic, signature from Signatures where  missionId= ? and missionsoid=? and TechnicianId=?',
         param,
        function (data) {
            debugger;
            Signature.CallBackGetPic(data, picElement);
        });
}
Signature.CallBackGetPic = function (data, picElement) {
    debugger;
    var src = "";
    var gizmoxHelper = Signature.getHelperObject();
    if (data.rows.length > 0) {

        for (var index_1 = 0; index_1 < data.rows.length; index_1++) {
            debugger

            src = data.rows.item(index_1)['typepic'] + "," + data.rows.item(index_1)['signature'];
            break;
        }
    }
    gizmoxHelper.SetDataImage(picElement, src);

    debugger;
    Signature.isRetrieve = true;
}
Signature.CallBackSavePic = function (data) {
    debugger;
    Signature.isUpdate = true;
}
Signature.getHelperObject = function () {
    var gizmoxHelper = new MockHelper();
    return gizmoxHelper;
}
    
    