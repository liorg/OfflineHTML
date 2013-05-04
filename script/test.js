alert(11);
MissionUnique// Initializes a new instance of the StringBuilder class
// and appends the given value if supplied
function StringBuilder() {
    this.strings = new Array("");
    // Appends the given value to the end of this instance.
    this.Append = function (value) {
        if (value) {
            this.strings.push(value);
        }
    }
    // Clears the string buffer
    this.Clear = function () {
        this.strings.length = 1;
    }
    // Converts this instance to a String.
    this.ToString = function () {
        return this.strings.join("");
    }
    // Clears the string buffer
    this.Length = function () {
        return this.strings.join("").length;
    }
    // Clears the string buffer
    this.RemoveLast = function (count) {
        var str = this.strings.join("");
        var start = 0;
        var last = str.length - count;
        var newStr = this.strings.join("").substring(start, last);
        this.strings = new Array("");
        this.strings.push(newStr);
    }
}


function newSmartXmlNode(xml) {
    this._node = xml;
    this.getNode = function (node) {
        return this._node.find(node);
    };
    this.getText = function (node) {
        return this._node.find(node).text();
    };
    this.getDictionary = function (node) {
        var res = [];
        var $so = this._node.find(node).each(function (index, value) {
            var items = { row: {} };
            $(value).children().each(function (index, childvalue) {
                var key = childvalue.nodeName.toLowerCase();
                items.row[key] = $(childvalue).text();
            });
            res.push(items);
        });
        return res;
    }
    this.getKeyValue = function (node) {
        var keyValueItem = {};
        var $so = this._node.find(node);
        $so.children().each(function (index, childvalue) {
            var key = childvalue.nodeName.toLowerCase();
            keyValueItem[key] = $(childvalue).text();
              });
        return keyValueItem;
    }
    this.getList = function (node) {
        var res = [];
        var $so = this._node.find(node).each(function (index, value) {
            res.push($(value).text());
        });
        return res;
    }
}
function newLine() {
    return "\n";
}

function isEmpty(str) {
    var res = (!str || 0 === str.length)
    return res;
}

//if the string is null or undefined , return empty string , else return the string.
function ifNullReturnEmpty(str) {
    return str ? str : "";
}

//if the string is null or undefined , return space string , else return the string.
function ifNullReturnSpace(str) {
    return str ? str : " ";
}
