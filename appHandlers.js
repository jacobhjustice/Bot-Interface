function login(){
    GMConsole.token = document.getElementById("groupmeLogin").value;
    GMConsole.groups = [];
   _login();
}

function _login() {
    function cb(data) {
        var arr = JSON.parse(data);
        for(var i = 0; i < arr.length; i++) {
            GMConsole.groups.push(arr[i]);
        }
    };

    httpRequest('https://api.groupme.com/v3/groups?token=' + GMConsole.token, false, cb)
};