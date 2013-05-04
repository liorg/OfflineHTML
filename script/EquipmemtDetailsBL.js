function GenerateListToValue(xml) {
    var wk = parseXml(xml);
    var smartXmlNode = new newSmartXmlNode(wk);
    var listsEquips = smartXmlNode.getList("equip > eid");
    var sbValues = new StringBuilder();
    $(listsEquips).each(function (index, value) {
        var xn = this;
        sbValues.Append(xn);
        sbValues.Append(",");
    });
    if (sbValues.Length() > 1) {
        sbValues.RemoveLast(1);
    }
    return sbValues.ToString();
}

function CallBackDataAndMergeWithXmlEquips(data, xmlEqupid, uiHandler) {
    var blCallback = uiHandler;
    var exchangeEquipmentsDt = [];

    var wk = parseXml(xmlEqupid);
    var smartXmlNode = new newSmartXmlNode(wk);
    var equips = smartXmlNode.getDictionary("equip");

    if (data.rows.length > 0) {
        debugger;
    
        for (var index_1 = 0; index_1 < data.rows.length; index_1++) {
            var OL_V_Event_1 = new Object();
            var exchangeEquipments = new Object();
            var code=data.rows.item(index_1)['EQUIPMENTCODEID']
            var itemEid = $.grep(equips, function (n, i) {
                return n.row["eid"] == code;
            });
            debugger;
            if (itemEid.length == 0) continue;
            var sxe = itemEid[0].row;
            exchangeEquipments.EquipmentCode = sxe["eid"];
            exchangeEquipments.Amount = sxe["amount"];
            exchangeEquipments.CodeAndDesc = sxe["eid"] + " - " + data.rows.item(index_1)['EQUIPMENTDESC'];
            exchangeEquipments.FamilyCode = data.rows.item(index_1)['FAMILYCODE'];
            exchangeEquipmentsDt.push(exchangeEquipments);
        }
    }
    debugger;
    if (blCallback)
        debugger;
        blCallback(exchangeEquipmentsDt);
}

function ReturnEquipsUi(data) {
    var dataItems = [];
    $.each(data, function (item) {
        OL_V_Event_1 = new Object();
        // debugger;
        OL_V_Event_1.id = this.EquipmentCode;
        OL_V_Event_1.value = this.CodeAndDesc;
        dataItems.push(OL_V_Event_1);
    });
    debugger;
    return dataItems;
}