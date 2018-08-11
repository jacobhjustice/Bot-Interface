function httpRequest(url, isPost, callback, data) {
    var type;
    if(isPost) {
        type = "POST"
    }
    else {
        type = "GET"
    }
    http = new XMLHttpRequest();

    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (typeof callback == "function") {
                callback(this.responseText);
            }
        }
      };

    //url = "https://cors.io/?" + url;

    http.open(type, url, true);
    if(data != undefined) {
        http.send(data);
    }
    else {
        http.send();
    }
};