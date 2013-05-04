function UcSupplierSalesAddItem() {
    this.dic = {};
    this.cboxItemCode;
    this.cboxItemName;
    this.cboxItemType;
    this.cboxSubItemType;
    this.cboxSaleName;
    this.lblPriceNoVatValue;
    this.lblPriceValue;
    this.lblDiscountValue;
    this.lblPriceSaleNoVatValue;
    this.lblPriceSaleValue;

    this.bCboxItemCodeSelcted = false;
    this.bCboxItemNameSelcted = false;
    this.bCboxItemTypeSelcted = false;

    this.iItemCodeLevel = -1;
    this.iItemNameLevel = -1;
    this.iItemTypeLevel = -1;
    this.iCurrentLevel = 1;

    this.MAX_PAYMENTS = 36;

    this._maxPayments = 0;
    this._discountVal = 0;

    this.item = function (key, value) {
        if (value != undefined)
            this.dic[key] = value;
        return this.dic[key];
    };

    this.SetFieldsIdForm = function (cboxItemCode, cboxItemName
       , cboxItemType, cboxSubItemType, cboxSaleName
       , lblPriceNoVatValue, lblPriceValue
       , lblDiscountValue, lblPriceSaleNoVatValue, lblPriceSaleValue) {

        this.cboxItemCode = cboxItemCode;
        this.cboxItemName = cboxItemName;
        this.cboxItemType = cboxItemType;
        this.cboxSubItemType = cboxSubItemType;
        this.cboxSaleName = cboxSaleName;
        this.lblPriceNoVatValue = lblPriceNoVatValue;
        this.lblPriceValue = lblPriceValue;
        this.lblDiscountValue = lblDiscountValue;
        this.lblPriceSaleNoVatValue = lblPriceSaleNoVatValue;
        this.lblPriceSaleValue = lblPriceSaleValue;
    };


    this.AttachEventSelectedChange = function (typeCboBox, cboBoxid, currentValue) {
        var currentGazitCatalogItem;
        var isAnyCoBoxIsSelected = this.setFlagCoBoxWhenSelected(typeCboBox);
        if (isAnyCoBoxIsSelected) {
            this.setComboBoxesLevel(typeCboBox);
            var iState = this.calcState();
            var rowsItems = this.getGazitCatalogItemsRows(iState);
            if (rowsItems == undefined)
                return;

            var selectedItems = rowsItems.items;
            if (selectedItems == undefined)
                return;
            this.setComboBoxes(iState, selectedItems);

            currentGazitCatalogItem = JSLINQ(selectedItems).FirstOrDefault();
            this.setValues(currentGazitCatalogItem);

        }
        else {
            currentGazitCatalogItem = this.getRowBySelectedItem();
        }
        this.setValues(currentGazitCatalogItem);

    }
    this.getRowBySelectedItem = function () {
        debugger;
        var gizmoxHelper = this.getHelperObject();
        var findRow = null ;
        var data = objUcSupplierSalesAddItem.dic["GazitCatalogItemsRows"];
        var itemCode = gizmoxHelper.GetSelectedValue(this.cboxItemCode);
        var itemType = gizmoxHelper.GetSelectedValue(this.cboxItemType);
        var itemName = gizmoxHelper.GetSelectedValue(this.cboxItemName);
        var itemName = gizmoxHelper.GetSelectedValue(this.cboxItemName);
        var subItemType = gizmoxHelper.GetSelectedValue(this.cboxSubItemType);
        var saleName = gizmoxHelper.GetSelectedValue(this.cboxSaleName);
        var cboxItemCodeCorrectEmpty = isEmpty(itemCode);
        var cboxItemNameCorrectEmpty = isEmpty(itemType);
        var cboxItemTypeCorrectEmpty = isEmpty(itemName);
        var cboxSubItemTypeCorrectEmpty = isEmpty(subItemType);
        var cboxSaleNameCorrectEmpty = isEmpty(saleName);

        if (cboxItemCodeCorrectEmpty && cboxItemNameCorrectEmpty && cboxItemTypeCorrectEmpty) {
            findRow = null;
        }
        else if (!cboxSubItemTypeCorrectEmpty && !cboxSaleNameCorrectEmpty) {
            findRow = JSLINQ(data)
                      .Where(function (item)
                      { return item.ItemCode == itemCode && item.ItemDesc == itemName && item.FamilyTypeDesc == itemType && item.DescSale == saleName && item.SubFamilyTypeDesc == subItemType; }
                      ).FirstOrDefault();

        }
        if (findRow == undefined) return null;
        return findRow;
    };

    this.setValues = function (selectedItem) {
        debugger;
        var money = " ₪";
        var gizmoxHelper = this.getHelperObject();

        var cboxItemCodeCorrect = !isEmpty(gizmoxHelper.GetSelectedValue(this.cboxItemCode));
        var cboxItemNameCorrect = !isEmpty(gizmoxHelper.GetSelectedValue(this.cboxItemType));
        var cboxItemTypeCorrect = !isEmpty(gizmoxHelper.GetSelectedValue(this.cboxItemName));
        var cboxSubItemTypeCorrect = !isEmpty(gizmoxHelper.GetSelectedValue(this.cboxSubItemType));
        var cboxSaleNameCorrect = !isEmpty(gizmoxHelper.GetSelectedValue(this.cboxSaleName));


        if (selectedItem==null || cboxItemCodeCorrect == false ||
                    cboxItemNameCorrect == false ||
                    cboxItemTypeCorrect == false ||
                    cboxSubItemTypeCorrect == false ||
                    cboxSaleNameCorrect == false) {
            gizmoxHelper.SetValue(this.lblPriceNoVatValue, "0" + money);
            gizmoxHelper.SetValue(this.lblPriceValue, "0" + money);
            gizmoxHelper.SetValue(this.lblDiscountValue, "0" + money);
            gizmoxHelper.SetValue(this.lblPriceSaleNoVatValue, "0" + money);
            gizmoxHelper.SetValue(this.lblPriceSaleValue, "0" + money);
            this._maxPayments = objUcSupplierSalesAddItem.MAX_PAYMENTS;
            this._discountVal = 0;
        }
        else {
            gizmoxHelper.SetValue(this.lblPriceNoVatValue, selectedItem.PriceNoVat.toFixed(2) + money);
            gizmoxHelper.SetValue(this.lblPriceValue, selectedItem.Price.toFixed(2) + money);
            gizmoxHelper.SetValue(this.lblDiscountValue, selectedItem.PersentDiscount.toFixed(2) + " %");
            gizmoxHelper.SetValue(this.lblPriceSaleNoVatValue, selectedItem.PriceSaleNoVAT.toFixed(2) + money);
            gizmoxHelper.SetValue(this.lblPriceSaleValue, selectedItem.PriceSale + money);

            this._maxPayments = selectedItem.MaxPayments;
            this._discountVal = selectedItem.PersentDiscount;
        }
    }
    this.setSingleValueToCheckBoxes = function () {
        var gizmoxHelper = this.getHelperObject();
        gizmoxHelper.SetComboBoxSingleValue(this.cboxItemCode);
        gizmoxHelper.SetComboBoxSingleValue(this.cboxItemName);
        gizmoxHelper.SetComboBoxSingleValue(this.cboxItemType);
        gizmoxHelper.SetComboBoxSingleValue(this.cboxSubItemType);
        gizmoxHelper.SetComboBoxSingleValue(this.cboxSaleName);
    };
    this.setComboBoxesLevel = function (typeCboBox) {
        debugger;
        switch (typeCboBox) {
            case "cboxItemCode":
                if (this.iItemCodeLevel == -1) {
                    this.iItemCodeLevel = this.iCurrentLevel;
                    this.iCurrentLevel++;
                }
                else {
                    if (this.iItemNameLevel > this.iItemCodeLevel) {
                        this.iItemNameLevel = -1;
                        this.bCboxItemNameSelcted = false;
                    }
                    if (this.iItemTypeLevel > this.iItemCodeLevel) {
                        this.iItemTypeLevel = -1;
                        this.bCboxItemTypeSelcted = false;
                    }
                }
                break;
            case "cboxItemName":
                if (this.iItemNameLevel == -1) {
                    this.iItemNameLevel = this.iCurrentLevel;
                    this.iCurrentLevel++;
                }
                else {
                    if (this.iItemCodeLevel > this.iItemNameLevel) {
                        this.iItemCodeLevel = -1;
                        this.bCboxItemCodeSelcted = false;
                    }
                    if (this.iItemTypeLevel > this.iItemNameLevel) {
                        this.iItemTypeLevel = -1;
                        this.bCboxItemTypeSelcted = false;
                    }
                }
                break;
            case "cboxItemType":
                if (this.iItemTypeLevel == -1) {
                    this.iItemTypeLevel = this.iCurrentLevel;
                    this.iCurrentLevel++;
                }
                else {
                    if (this.iItemCodeLevel > this.iItemTypeLevel) {
                        this.iItemCodeLevel = -1;
                        this.bCboxItemCodeSelcted = false;
                    }
                    if (this.iItemNameLevel > this.iItemTypeLevel) {
                        this.iItemNameLevel = -1;
                        this.bCboxItemNameSelcted = false;
                    }
                }
                break;
            default:
                break;
        }
    }
    this.setFlagCoBoxWhenSelected = function (typeCboBox) {
        var isAnyCoBoxIsSelected = true;
        switch (typeCboBox) {
            case "cboxItemCode":
                this.bCboxItemCodeSelcted = true;
                break;
            case "cboxItemName":
                this.bCboxItemNameSelcted = true;
                break;
            case "cboxItemType":
                this.bCboxItemTypeSelcted = true;
                break;
            default:
                isAnyCoBoxIsSelected = false;
                break;
        }
        return isAnyCoBoxIsSelected;
    }
    this.getGazitCatalogItemsRows = function (iState) {
        debugger;
        var gazitCatalogItemsRows;
        var data = objUcSupplierSalesAddItem.dic["GazitCatalogItemsRows"];
        var gizmoxHelper = this.getHelperObject();
        var itemType = "";
        var itemName = "";
        var itemCode = "";
        switch (iState) {
            case 1:
                itemType = gizmoxHelper.GetSelectedValue(this.cboxItemType);
                if (!isEmpty(itemType)) {
                    gazitCatalogItemsRows = JSLINQ(data)
                     .Where(function (item) { return item.FamilyTypeDesc == itemType; })
                }
                break;
            case 2:
                itemName = gizmoxHelper.GetSelectedValue(this.cboxItemName);
                if (!isEmpty(itemName)) {
                    gazitCatalogItemsRows = JSLINQ(data)
                      .Where(function (item) { return item.ItemDesc == itemName; })
                }
                break;
            case 3:
                itemName = gizmoxHelper.GetSelectedValue(this.cboxItemName);
                itemType = gizmoxHelper.GetSelectedValue(this.cboxItemType);
                if (!isEmpty(itemName) && !isEmpty(itemType)) {
                    gazitCatalogItemsRows = JSLINQ(data)
                     .Where(function (item) { return item.ItemDesc == itemName && item.FamilyTypeDesc == itemType; })
                }
                break;
            case 4:
                itemCode = gizmoxHelper.GetSelectedValue(this.cboxItemCode);
                if (!isEmpty(itemCode)) {
                    gazitCatalogItemsRows = JSLINQ(data)
                     .Where(function (item) { return item.ItemCode == itemCode; })
                }
                break;
            case 5:
                itemCode = gizmoxHelper.GetSelectedValue(this.cboxItemCode);
                itemType = gizmoxHelper.GetSelectedValue(this.cboxItemType);
                if (!isEmpty(itemCode) && !isEmpty(itemType)) {
                    gazitCatalogItemsRows = JSLINQ(data)
                     .Where(function (item) { return item.ItemCode == itemCode && item.FamilyTypeDesc == itemType; })
                }
                break;
            case 6:
                itemCode = gizmoxHelper.GetSelectedValue(this.cboxItemCode);
                itemName = gizmoxHelper.GetSelectedValue(this.cboxItemName);
                if (!isEmpty(itemCode) && !isEmpty(itemName)) {
                    gazitCatalogItemsRows = JSLINQ(data)
                     .Where(function (item) { return item.ItemCode == itemCode && item.ItemDesc == itemName; })
                }
                break;
            case 7:
                itemCode = gizmoxHelper.GetSelectedValue(this.cboxItemCode);
                itemName = gizmoxHelper.GetSelectedValue(this.cboxItemName);
                itemType = gizmoxHelper.GetSelectedValue(this.cboxItemType);
                if (!isEmpty(itemCode) && !isEmpty(itemType) && !isEmpty(itemName)) {
                    gazitCatalogItemsRows = JSLINQ(data)
                     .Where(function (item) { return item.ItemCode == itemCode && item.ItemDesc == itemName && item.FamilyTypeDesc == itemType; })
                }
                break;
            default:
                gazitCatalogItemsRows = null;
                break;
        }

        return gazitCatalogItemsRows;
    }

    this.setComboBoxes = function (iState, items) {
        switch (iState) {
            case 1:
                this.clearComboBoxes(true, true, false);
                this.FillcboxItemCode(items);
                this.FillcboxItemName(items);
                //this.FillcboxItemType(items);
                this.FillcboxSubItemType(items);
                this.FillcboxSaleName(items);
                break;
            case 2:
                this.clearComboBoxes(true, false, true);
                this.FillcboxItemCode(items);
                // this.FillcboxItemName(items);
                this.FillcboxItemType(items);
                this.FillcboxSubItemType(items);
                this.FillcboxSaleName(items);
                break;
            case 3:
                this.clearComboBoxes(true, false, false);
                this.FillcboxItemCode(items);
                // this.FillcboxItemName(items);
                // this.FillcboxItemType(items);
                this.FillcboxSubItemType(items);
                this.FillcboxSaleName(items);
                break;
            case 4:
                this.clearComboBoxes(false, true, true);
                //this.FillcboxItemCode(items);
                this.FillcboxItemName(items);
                this.FillcboxItemType(items);
                this.FillcboxSubItemType(items);
                this.FillcboxSaleName(items);
                break;
            case 5:
                this.clearComboBoxes(false, true, false);
                //this.FillcboxItemCode(items);
                this.FillcboxItemName(items);
                //this.FillcboxItemType(items);
                this.FillcboxSubItemType(items);
                this.FillcboxSaleName(items);
                break;
            case 6:
                this.clearComboBoxes(false, false, true);
                //this.FillcboxItemCode(items);
                // this.FillcboxItemName(items);
                this.FillcboxItemType(items);
                this.FillcboxSubItemType(items);
                this.FillcboxSaleName(items);
                break;
            case 7:
                this.clearComboBoxes(false, false, false);
                // this.FillcboxItemCode(items);
                // this.FillcboxItemName(items);
                // this.FillcboxItemType(items);
                this.FillcboxSubItemType(items);
                this.FillcboxSaleName(items);
                break;
            default:
                break;
        }
        this.setSingleValueToCheckBoxes();
    }

    this.clearComboBoxes = function (p_CboxItemCode, p_CboxItemName, p_CboxItemType) {
        var gizmoxHelper = this.getHelperObject();
        if (p_CboxItemCode) {
            gizmoxHelper.ClearComboBox(this.cboxItemCode);
        }
        if (p_CboxItemName) {
            gizmoxHelper.ClearComboBox(this.cboxItemName);
        }
        if (p_CboxItemType) {
            gizmoxHelper.ClearComboBox(this.cboxItemType);
        }
        gizmoxHelper.ClearComboBox(this.cboxSubItemType);
        gizmoxHelper.ClearComboBox(this.cboxSaleName);
    }
    this.calcState = function () {
        var iState;
        if (this.bCboxItemCodeSelcted == false && this.bCboxItemNameSelcted == false && this.bCboxItemTypeSelcted == false)    //000
            iState = 0;
        else if (this.bCboxItemCodeSelcted == false && this.bCboxItemNameSelcted == false && this.bCboxItemTypeSelcted == true)    //001
            iState = 1;
        else if (this.bCboxItemCodeSelcted == false && this.bCboxItemNameSelcted == true && this.bCboxItemTypeSelcted == false)    //010
            iState = 2;
        else if (this.bCboxItemCodeSelcted == false && this.bCboxItemNameSelcted == true && this.bCboxItemTypeSelcted == true)    //011
            iState = 3;
        else if (this.bCboxItemCodeSelcted == true && this.bCboxItemNameSelcted == false && this.bCboxItemTypeSelcted == false)    //100
            iState = 4;
        else if (this.bCboxItemCodeSelcted == true && this.bCboxItemNameSelcted == false && this.bCboxItemTypeSelcted == true)    //101
            iState = 5;
        else if (this.bCboxItemCodeSelcted == true && this.bCboxItemNameSelcted == true && this.bCboxItemTypeSelcted == false)    //110
            iState = 6;
        else if (this.bCboxItemCodeSelcted == true && this.bCboxItemNameSelcted == true && this.bCboxItemTypeSelcted == true)    //111
            iState = 7;
        return iState;
    }

    this.SetData = function (items) {
        objUcSupplierSalesAddItem.dic["GazitCatalogItemsRows"] = items;
    }
    this.FillAllComboBox = function () {
        this.clearComboBoxes(true, true, true);

        this.bCboxItemCodeSelcted = false;
        this.bCboxItemNameSelcted = false;
        this.bCboxItemTypeSelcted = false;

        this.iItemCodeLevel = -1;
        this.iItemNameLevel = -1;
        this.iItemTypeLevel = -1;
        this.iCurrentLevel = 1;

        var items = objUcSupplierSalesAddItem.dic["GazitCatalogItemsRows"];

        this.FillcboxItemCode(items);
        this.FillcboxItemName(items);
        this.FillcboxItemType(items);
        this.FillcboxSubItemType(items);
        this.FillcboxSaleName(items);
    };
    this.getHelperObject = function () {
        var gizmoxHelper = new MockHelper();
        return gizmoxHelper;
    }
    this.FillcboxItemCode = function (data) {
        var tempData = JSLINQ(data)
                           .Distinct(function (item) {
                               return { id: item.ItemCode, value: item.ItemCode };
                           });
        var gizmoxHelper = this.getHelperObject();
        gizmoxHelper.FillComboBox(this.cboxItemCode, tempData.items);
    };
    this.FillcboxItemName = function (data) {
        var tempData = JSLINQ(data)
                           .Distinct(function (item) {
                               return { id: item.ItemDesc, value: item.ItemDesc };
                           });
        var gizmoxHelper = this.getHelperObject();
        gizmoxHelper.FillComboBox(this.cboxItemName, tempData.items);
    };
    this.FillcboxItemType = function (data) {
        var tempData = JSLINQ(data)
                           .Distinct(function (item) {
                               return { id: item.FamilyTypeDesc, value: item.FamilyTypeDesc };
                           });
        var gizmoxHelper = this.getHelperObject();
        gizmoxHelper.FillComboBox(this.cboxItemType, tempData.items);
    };

    this.FillcboxSubItemType = function (data) {
        var tempData = JSLINQ(data)
                           .Distinct(function (item) {
                               return { id: item.SubFamilyTypeDesc, value: item.SubFamilyTypeDesc };
                           });
        var gizmoxHelper = this.getHelperObject();
        gizmoxHelper.FillComboBox(this.cboxSubItemType, tempData.items);
    }
    this.FillcboxSaleName = function (data) {
        var tempData = JSLINQ(data)
                           .Distinct(function (item) {
                               return { id: item.DescSale, value: item.DescSale };
                           });
        var gizmoxHelper = this.getHelperObject();
        gizmoxHelper.FillComboBox(this.cboxSaleName, tempData.items);
    };
    this.CachData = function (uiHandler) {
        var blCallback = uiHandler;
        GetGazitcatalogitemsDal(this.CallBackCachData, blCallback);
    };

    this.CallBackCachData = function (data, uiHandler) {
        debugger;
        var blCallback = uiHandler;
        objUcSupplierSalesAddItem.dic["GazitCatalogItemsRows"] = [];
        var gazitCatalogItemsRows = [];

        if (data.rows.length > 0) {
            OL_V_Event_1 = new Object();
            for (var index_1 = 0; index_1 < data.rows.length; index_1++) {
                gazitCatalogItemsRows.push({
                    ItemCode: data.rows.item(index_1)['ItemCode'],
                    ItemDesc: data.rows.item(index_1)['ItemDesc'],
                    FeatureCode: data.rows.item(index_1)['FeatureCode']
                });
            }
        }

        objUcSupplierSalesAddItem.dic["GazitCatalogItemsRows"] = gazitCatalogItemsRows;
        this.FillAllComboBox();
        if (blCallback)
            window[blCallback]();
    };
    this.getSelectedRow = function () {
        var items = objUcSupplierSalesAddItem.dic["GazitCatalogItemsRows"];

    }

  
}
var objUcSupplierSalesAddItem = new UcSupplierSalesAddItem();