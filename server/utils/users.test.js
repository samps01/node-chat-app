const expect = require('expect');

const {Users} = require('./users');


describe('Users', ()=>{
    let users;
    beforeEach(()=>{
        users = new Users();
        users.users = [{
                id:'1',
                name:'sam',
                room:'Node Room'
            },
            {
                id:'2',
                name:'ben',
                room:'Node Room'
            },
            {
                id:'3',
                name:'ten',
                room:'java Room'
            }];
    });
   it('should add a new user',()=>{
        let users = new Users();
        let user = {
            id: '123',
            name:'sam',
            room: 'Node Room'
        };

        let resUser = users.addUser(user.id,user.name,user.room);

        expect(users.users).toEqual([user]);
   });
   it('should remove a user',()=>{
       let removeUser = users.removeUser('1');
       expect(removeUser).toEqual([{
               id:'2',
               name:'ben',
               room:'Node Room'
            },
           {
               id:'3',
               name:'ten',
               room:'java Room'
           }]);
   });

   it('should not remove user',()=>{
       let removeUser = users.removeUser('5');
       expect(removeUser).toEqual([]);
   });

    it('should find a user',()=>{
        let oneUser = users.getUser('1');
        expect(oneUser).toEqual([{
            id:'1',
            name:'sam',
            room:'Node Room'

        }]);
    });

    it('should not find user',()=>{
        let oneUser = users.getUser('a');
        expect(oneUser).toEqual([]);
    });

   it('should return names for node room',()=>{
        let userList = users.getUserList('Node Room');
        expect(userList).toEqual(['sam','ben']);
   });

   it('should return names for java room',()=>{
        let userList = users.getUserList('java Room');
        expect(userList).toEqual(['ten']);
    });
});