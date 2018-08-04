function login() {
    GMConsole.token = document.getElementById("groupmeLogin").value;
    GMConsole.groups = [];
   _login();
}

function selectGroup() {
    print("SELECT")
}

function _login() {
    function cb(data) {
        var arr = JSON.parse(data).response;
        for(var i = 0; i < arr.length; i++) {
            GMConsole.groups.push(arr[i]);
        }
        document.getElementById("content").innerHTML = "";
        _displayGroups();
    };

    httpRequest('https://api.groupme.com/v3/groups?token=' + GMConsole.token, false, cb)
};

function _displayGroups(){
    document.getElementById("instruction").innerHTML = "Select which group you would like to operate within:";
    var groups = GMConsole.groups;
    var html = "";
    for(var i = 0; i < groups.length; i++) {
        html += "<label class = 'groupLabel'><input type = 'radio' class = 'group' name = 'group' value = '" + i + "'/>" + groups[i].name + "</label>";
    }
    html += '<div class = "btn" id = "selectGroup" onclick = "selectGroup()">Select</div>';
    document.getElementById("content").innerHTML = html;
}