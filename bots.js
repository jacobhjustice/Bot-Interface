GMConsole = {
    token: "",
    groups: [],
    currentGroup: undefined,
    userData: undefined,

    GroupMember: function(name, id) {
        this.name = name;
        this.uid = id;
        this.used = false;
    },

    getRandomNameFromGroupMembers: function(members){
        var name = "";
        var gotten = false;
        while (!gotten){
            var test = members[Math.floor(Math.random()*members.length)];
            if (!test.used){
                name = test.name.replace(" ", "  ");
                test.used = true;
                gotten = true;
            }
        }
        return name;
    },
};