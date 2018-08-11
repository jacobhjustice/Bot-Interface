function login() {
    GMConsole.token = document.getElementById("groupmeLogin").value;
    GMConsole.groups = [];
   _login();
}

function selectGroup() {
    _selectGroup();
}

function randomize() {
    _randomize();
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

    httpRequest('https://api.groupme.com/v3/groups?per_page=100&token=' + GMConsole.token, false, cb)
};

function _selectGroup() {
    var index = document.querySelector("input[name='group']:checked").value;
    var group = GMConsole.groups[index];
    GMConsole.currentGroup = group;
    document.getElementById("contentWrapper").innerHTML = document.getElementById("scriptSelector").innerHTML;
    document.getElementById("groupName").innerHTML = group.name;
}

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