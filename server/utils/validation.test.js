const expect = require('expect');

const {isRealString} = require('./validation');

describe('is real string',()=>{
   it('shoud reject non string values',()=>{
        let res = isRealString(98);
        expect(res).toBe(false);
   });

   it('should reject string with spaces',()=>{
    let res = isRealString('    ');
    expect(res).toBe(false);
   });

   it('should reject string with spaces',()=>{
    let res = isRealString('sam');
    expect(res).toBe(true);
   })
});