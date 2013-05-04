
//(function ($) {
//    $.fn.SetData = function () {
//        //Link background colors 
//        var colors = new Array('4AC7ED', 'FDC015', '9F78EC', 'F25C33');
//        return this.each(function (i, obj) {
//            $this = $(this);
//            $anchors = $(obj).find("a").get();
//            $.each($anchors, function (j, ele) {
//               
//            });
//        });
//    };
//})(jQuery);
//function MockClientDOM() {
//    this.getElementById = function (ele) {
//    
//    }
//}

//function ElementGizMoxMock(ele) {
//this.
//this.setData =
//}
//function MockClientDOM() {
//    this.getElementById = function (ele) {
//    return 
//    }
//}


//var ClientDOM = new ClientDOM();

function parseXml(xml) {
    //var xDoc = $.parseXML(xml); 
    return $(xml);
}
function SQLResultSet(data) {
    this.rows = data;
    this.rows.length = data.rows.length;
}
function SQLResultSetRowList() {
    this.rows = [];
    this.length = 0;
    this.add = function (item) {
        this.rows.push(item);
    }
    this.item = function (indx) {
        return this.rows[indx];
    }
}
function mockExchangeAndRefund() {
    var data = { rows: [] };
    var item = {};
    var r =new SQLResultSetRowList();

    item["EQUIPMENTCODEID"] = "2349";
    item["EQUIPMENTDESC"] = "בזק מיקרופילטר משולב";
    item["FAMILYCODE"] = "073";
    r.add(item);

    item = {};

    item["EQUIPMENTCODEID"] = "8343";
    item["EQUIPMENTDESC"] = "מכירות מודם רשת";
    item["FAMILYCODE"] = "060";
    r.add(item);

    item = {};
    item["EQUIPMENTCODEID"] = "4670";
    item["EQUIPMENTDESC"] = "בזק-כבל סיראלי נקבה";
    item["FAMILYCODE"] = "061";
    r.add(item);

    //var mockRow = new rowsMock(r);
    var dataMock = new SQLResultSet(r);
    return dataMock;
}

function fillComboBox(elementName,data) {
    var option = $('<option />'); 
    option.attr('value', this.id).text(this.value);
    $('#' + elementName).append(option); 
}

function MockHelper() {
    this.FillComboBox = function (elementId, data) {
        $.each(data,function (indx, value) {
          var option = $('<option />');
            option.attr('value', this.id).text(this.value);
            $('#' + elementId).append(option);
        });
    }
    this.ClearComboBox = function (elementId) {
        $('#' + elementId).html("");
    }
    this.GetSelectedValue = function (elementId) {
        return this.GetValue(elementId);
    }
   this.SetValue = function (elementId,value) {
       $('#' + elementId).text(value);
   }
   this.GetValue = function (elementId) {
       return $('#' + elementId).val();
   }
   this.SetComboBoxSingleValue = function (elementId) {
      //mock
   }
   this.SetDataImage = function (elementId, value) {
       elementId.src = value;
   }
}