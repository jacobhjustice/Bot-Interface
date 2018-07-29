function httpRequest(url, isPost, callback) {
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
    http.open(type, url, true);
    http.send();
};