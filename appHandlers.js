function attemptAutoLogin() {
    console.log("!")
    var token = window.location.hash;
    if(token == undefined || token.length < 2) {
        return  false;
    }
    token = token.substring(1);
    GMConsole.token = token;
    GMConsole.groups = [];
   _login();
}

function login() {
    GMConsole.token = document.getElementById("groupmeLogin").value;
    GMConsole.groups = [];
    window.location.hash = GMConsole.token;
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
        _getUserDetails();
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

function _randomize() {
    var group = GMConsole.currentGroup.members;
    var tempMembers = [];

    var finalIteration = false;
    for (var i = 0; i < group.length; i++) {
        if (group[i].user_id !== GMConsole.userData.user_id && group[i].user_id != group[i].creator_user_id) {
            tempMembers.push(new GMConsole.GroupMember(group[i].nickname, group[i].user_id));
            function cb(){
                if(finalIteration) {
                    console.log("!!!");
                    setTimeout(function(){
                        console.log("LETSA ADD");
                        for (var o = 0; o < tempMembers.length; o++) {
                            var payload = '{"members":[{"nickname":"' + GMConsole.getRandomNameFromGroupMembers(tempMembers) +'","user_id":"' + tempMembers[o].uid +'"}]}'
                            httpRequest('https://api.groupme.com/v3/groups/' + GMConsole.currentGroup.id + '/members/add?token=' + GMConsole.token, true, function(){console.log("SUCCESS")}, payload)
                        }
                    }, 5000);
                }
            }
            finalIteration = i + 1 == group.length;
            httpRequest('https://api.groupme.com/v3/groups/' + GMConsole.currentGroup.id + '/members/' + group[i].id + '/remove?token=' + GMConsole.token, true, cb)
        }
    }
}

function _getUserDetails() {
    function cb(data) {
        var json = JSON.parse(data).response;
        GMConsole.userData = json
    };

    httpRequest('https://api.groupme.com/v3/users/me?token=' + GMConsole.token, false, cb)
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