const expect = require('expect');

const {generateMessage,generateLocationMessage} = require('./message');
describe('generate message',()=>{
    it('should generate correct message object',()=>{
       let from = "Sam";
       let text = "Hello world!";
       let message = generateMessage(from,text);
       expect(message.createdAt).toBeA('number');
       expect(message).toInclude({from,text});
    });
});

describe('generate location message',()=>{
   it('should generate correct location object',()=>{
      let from = 'Sam';
      let latitude = 1;
      let longitude = 1;
      let url = 'https://www.google.com/maps?q=1,1';
      let message = generateLocationMessage(from,latitude,longitude);
      expect(message.createdAt).toBeA('number');
      expect(message).toInclude({from,url});
   });
});