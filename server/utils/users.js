class Users {
    constructor(){
        this.users = [];
    }

    addUser(id,name,room){
        let user = {id,name,room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
        let user = this.getUser(id);
        if(user){
            this.users = this.users.filter((user)=>user.id!==id);
        }
        return user;
    }

    getUser(id){
        let users = this.users;
        let oneUser = users.filter(user=>user.id === id);
        return oneUser[0];
    }

    getUserList(room){
        let users = this.users.filter(user=>user.room === room);
        let nameList = users.map(user=>user.name);
        return nameList;
    }
}

module.exports = {Users};