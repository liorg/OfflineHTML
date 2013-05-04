function getNetworkXmlValues(xmlNetWorkDetail, xmlNetWorkDetailsn1) {
    var netWorkDetails = new Object();
    populateNetworkDetails(netWorkDetails, xmlNetWorkDetail);
    populateLinesObject(netWorkDetails, xmlNetWorkDetailsn1);
    return netWorkDetails;
    debugger;
}

function populateLinesObject(netWorkDetails, xmlNetWorkDetailsn1) {
    netWorkDetails.LineNumbersValue = "";
    if (xmlNetWorkDetailsn1 == undefined)
        return;
    else if (isEmpty(xmlNetWorkDetailsn1))
        return;
   // var $netWorkDetailsn1 = $(xmlNetWorkDetailsn1);
    var wk = parseXml(xmlNetWorkDetailsn1);

    var smartXmlNode = new newSmartXmlNode(wk);
    var phones = smartXmlNode.getList("phone>p");
    netWorkDetails.LineNumbersValue = getLine(phones);
    alert(netWorkDetails.Lines);
}

function populateNetworkDetails(netWorkDetails, xmlNetWorkDetail) {
//    var $netWorkDetail = $(xmlNetWorkDetail);
    //    var smartXmlNode = new newSmartXmlNode($netWorkDetail);
    debugger;
    var wk = parseXml(xmlNetWorkDetail);
    var smartXmlNode = new newSmartXmlNode(wk);

    netWorkDetails.LineTypeValue = smartXmlNode.getText("ldesc");
    netWorkDetails.ExchangeValue = smartXmlNode.getText("cnet") + " " + smartXmlNode.getText("ctype");
    netWorkDetails.LastUpdateValue = ifNullReturnEmpty(smartXmlNode.getText("lastupdate"));
    netWorkDetails.cvlan = ifNullReturnEmpty(smartXmlNode.getText("vc"));
    netWorkDetails.sxeLen = new Object();
    var sxeLen = smartXmlNode.getKeyValue("len");
    netWorkDetails.sxeLen.ru = ifNullReturnEmpty(sxeLen["ru"]);
    netWorkDetails.sxeLen.system = ifNullReturnEmpty(sxeLen["system"]);
    netWorkDetails.sxeLen.tag = ifNullReturnEmpty(sxeLen["tag"]);
    netWorkDetails.sxeLen.center = ifNullReturnEmpty(sxeLen["center"]);
    var sxeAdsl = smartXmlNode.getKeyValue("adsl");
    netWorkDetails.sxeAdsl = new Object();
    netWorkDetails.sxeAdsl.blocklen = ifNullReturnEmpty(sxeAdsl["blocklen"]);
    netWorkDetails.sxeAdsl.sysnum = ifNullReturnEmpty(sxeAdsl["sysnum"]);
    netWorkDetails.sxeAdsl.tagnum = ifNullReturnEmpty(sxeAdsl["tagnum"]);
    netWorkDetails.sxeAdsl.tagnum2 = ifNullReturnEmpty(sxeAdsl["tagnum2"]);
    netWorkDetails.sxeAdsl.sysnum2 = ifNullReturnEmpty(sxeAdsl["sysnum2"]);
    netWorkDetails.sxeAdsl.dslam = ifNullReturnEmpty(sxeAdsl["dslam"]);
    netWorkDetails.sxeAdsl.shelf_slot = ifNullReturnEmpty(sxeAdsl["shelf_slot"]);
    netWorkDetails.sxeAdsl.port = ifNullReturnEmpty(sxeAdsl["port"]);
    netWorkDetails.sxeAdsl.fuseblock = ifNullReturnEmpty(sxeAdsl["fuseblock"]);

    var xmlNodedetailedroute = smartXmlNode.getNode("detailedroute");

    var sxeDetailedroute = new newSmartXmlNode(xmlNodedetailedroute);
    var distribpoints = sxeDetailedroute.getDictionary("distribpoint");
    netWorkDetails.RouterValue = getRouting(distribpoints);

    var faddress = sxeDetailedroute.getDictionary("faddress");
    netWorkDetails.FramesAddressValue = getFramesAddress(faddress);
}

function getLine(phones) {
    var sbLines = new StringBuilder();
    $(phones).each(function (index, value) {
        var xn = this;
        sbLines.Append(xn);
        sbLines.Append("  ");
    });
    return sbLines.ToString();
}

function getFramesAddress(faddress) {
    var p_sbFrames = new StringBuilder();
    $(faddress).each(function (index, value) {
        var p_sxnFaddress = this.row;
        var tempValue;
        tempValue = p_sxnFaddress["typedesc"];
        if (isEmpty(tempValue) != null) {
            p_sbFrames.Append(tempValue);
            p_sbFrames.Append(" ");
        }
        tempValue = p_sxnFaddress["frame"];
        if (isEmpty(tempValue) != null) {
            p_sbFrames.Append(tempValue);
            p_sbFrames.Append(" ");
        }
        tempValue = p_sxnFaddress["street"];
        if (isEmpty(tempValue) != null) {
            p_sbFrames.Append(tempValue);
            p_sbFrames.Append(" ");
        }
        tempValue = p_sxnFaddress["housenum"];
        if (isEmpty(tempValue) != null) {
            p_sbFrames.Append(tempValue);
            p_sbFrames.Append(" ");
        }
        tempValue = p_sxnFaddress["city"];
        if (isEmpty(tempValue) != null) {
            p_sbFrames.Append(tempValue);
        }
        tempValue = p_sxnFaddress["placedesc"];
        if (isEmpty(tempValue) != null) {
            p_sbFrames.Append(", ");
            p_sbFrames.Append(tempValue);
        }
        tempValue = p_sxnFaddress["locationdesc"];
        if (isEmpty(tempValue) != null) {
            p_sbFrames.Append(", ");
            p_sbFrames.Append(tempValue);
        }

        p_sbFrames.Append(newLine());

    });
    if (p_sbFrames.Length > 2) {
        p_sbFrames.RemoveLast(2);
    }
    return p_sbFrames.ToString();
}

function getLine(phones) {
    var sbLines = new StringBuilder();
    $(phones).each(function (index, value) {
        var xn = this;
        sbLines.Append(xn);
        sbLines.Append("  ");
    });
    return sbLines.ToString();
}
function getRouting(distribpoints) {
    var sbRouter = new StringBuilder();
    var isFromTag = true;
    if (distribpoints.length == 0)
        return "";
    var lastIterator = distribpoints.length - 1;
    $(distribpoints).each(function (index, value) {
        var sxeNode = this.row;
        if (index == 0) {// first point
            sbRouter.Append(sxeNode["center"]);
            if (isEmpty(sxeNode["frame"]) != null) {
                sbRouter.Append(sxeNode["frame"]);
                sbRouter.Append('-');
            }
            sbRouter.Append(sxeNode["tag"]);
            sbRouter.Append(newLine());
        }
        // last point
        else if (index == lastIterator) {
            sbRouter.Append(sxeNode["frame"]);
            sbRouter.Append('/');
            sbRouter.Append(sxeNode["tag"]);
            sbRouter.Append(newLine());
        }
        else {
            if (isFromTag == true) {
                sbRouter.Append(sxeNode["frame"]);
                sbRouter.Append('/');
                sbRouter.Append(sxeNode["tag"]);
            }
            else {
                if (isEmpty(sxeNode["tag"]) != null) {
                    sbRouter.Append('-');
                    sbRouter.Append(sxeNode["tag"]);
                }
                sbRouter.Append(newLine());
            }
            isFromTag = !isFromTag;
        }
    });
    if (sbRouter.Length > 2) {
        sbRouter.RemoveLast(2);
    }
    return sbRouter.ToString();
}