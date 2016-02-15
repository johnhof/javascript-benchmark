'use strict'

let mocha   = require('mocha');
let expect  = require('chai').expect;
let co      = require('co');
let genit  = require('../lib/genit');

function onErr (done) {
  return function (e) {
    // console.log(e.stack);
    done(e);
  };
}

describe('synchronous', function () {
  describe('.each', function () {
    it('should iterate arrays', function (done) {
      co(function *() {
        let array  = ['one', 'two', 'three', 'four'];
        let count  = 0;
        let length = array.length;
        yield genit.each(array, function *(value, index) {
          expect(value).to.be.equal(array[count]);
          expect(this).to.be.equal(array[count]);
          expect(index).to.be.equal(count);
          count++;
        });
        expect(count).to.be.equal(length);
        done();
      }).catch(onErr(done));
    });
    it('should iterate objects', function (done) {
      co(function *() {
        let obj    = { one:'foo', two:'bar', three:'biz', four:'baz' };
        let count  = 0;
        let keys   = Object.keys(obj);
        let length = keys.length
        yield genit.each(obj, function *(value, key) {
          let expectKey = keys[count];
          expect(value).to.be.equal(obj[expectKey]);
          expect(this).to.be.equal(obj[expectKey]);
          expect(key).to.be.equal(expectKey);
          count++;
        });
        expect(count).to.be.equal(length);
        done();
      }).catch(onErr(done));
    });

    it('should stop if false is returned (Array)', function (done) {
      co(function *() {
        let array  = ['one', 'two', 'three', 'four'];
        let count  = -1;
        let stopAt = 2;
        yield genit.each(array, function *(value, index) {
          count++;
          return (index < stopAt);
        }, false, true);
        expect(count).to.be.equal(stopAt);
        done();
      }).catch(onErr(done));
    });
    it('should stop if false is returned (Object)', function (done) {
      co(function *() {
        let obj    = { one:'foo', two:'bar', three:'biz', four:'baz' };
        let count  = -1;
        let stopAt = 'three';
        yield genit.each(obj, function *(value, key) {
          count++;
          return (key !== stopAt);
        }, false, true);
        expect(Object.keys(obj)[count]).to.be.equal(stopAt);
        done();
      }).catch(onErr(done));
    });
  });


  describe('.map', function () {
    it('should iterate arrays', function (done) {
      co(function *() {
        let array  = ['one', 'two', 'three', 'four'];
        let count  = 0;
        let length = array.length;
        yield genit.map(array, function *(value, index) {
          expect(value).to.be.equal(array[count]);
          expect(this).to.be.equal(array[count]);
          expect(index).to.be.equal(count);
          count++;
        });
        expect(count).to.be.equal(length);
        done();
      }).catch(onErr(done));
    });
    it('should iterate objects', function (done) {
      co(function *() {
        let obj    = { one:'foo', two:'bar', three:'biz', four:'baz' };
        let count  = 0;
        let keys   = Object.keys(obj);
        let length = keys.length
        yield genit.map(obj, function *(value, key) {
          let expectKey = keys[count];
          expect(value).to.be.equal(obj[expectKey]);
          expect(this).to.be.equal(obj[expectKey]);
          expect(key).to.be.equal(expectKey);
          count++;
        });
        expect(count).to.be.equal(length);
        done();
      }).catch(onErr(done));
    });

    it('should return result array  (Array)', function (done) {
      co(function *() {
        let array    = ['one', 'two', 'three', 'four'];
        let expected = [1, 2, 3, 4];
        let result   = yield genit.map(array, function *(value, index) {
          return index + 1;
        }, true);
        expect(result).to.have.members(expected);
        done();
      }).catch(onErr(done));
    });
    it('should return result array (Object)', function (done) {
      co(function *() {
        let obj      = { one:'foo', two:'bar', three:'biz', four:'baz' };
        let expected = [1, 2, 3, 4];
        let count    = 1;
        let result   = yield genit.map(obj, function *() {
          return count++;
        }, true);
        expect(result).to.have.members(expected);
        done();
      }).catch(onErr(done));
    });
  });

  
  describe('.filter', function () {
    it('should iterate and filter the array', function (done) {
      co(function *() {
        let array  = [1,2,3,4,5,-1,-2,-3];
        var filteredArray = yield genit.filter(array, function *(n) {
          return n < 0;
        });
        expect(filteredArray).to.eql([-1, -2, -3]);
        expect(filteredArray.length).to.be.equal(3);
        done();
      }).catch(onErr(done));
    });
    it('should iterate and filter the objects', function (done) {
      co(function *() {
        let obj    = { one:'foo', two:'bar', three:'biz', four:'baz' };
        let count  = 0;
        let keys   = Object.keys(obj);
        let length = keys.length
        var filteredObject = yield genit.filter(obj, function *(value, key) {
            return value == "biz" || value == "baz";
        });
        expect(filteredObject).to.deep.equal({three : 'biz', four : 'baz'});
        done();
      }).catch(onErr(done));
    });
  });
});