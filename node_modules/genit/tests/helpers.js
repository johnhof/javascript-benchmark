'use strict'

let mocha   = require('mocha');
let expect  = require('chai').expect;
let co      = require('co');
let genit  = require('../lib/genit');
let helpers = require('../lib/helpers');

function onErr (done) {
  return function (e) {
    // console.log(e.stack);
    done(e);
  };
}

describe('helpers', function () {

  describe('.for', function () {

    it('should iterate arrays', function (done) {
      co(function *() {
        let array  = ['one', 'two', 'three', 'four'];
        let count  = 0;
        let length = array.length;
        yield helpers.for(array, function *(value, index) {
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
        yield helpers.for(obj, function *(value, key) {
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

    it('should accept option to return result array  (Array)', function (done) {
      co(function *() {
        let array    = ['one', 'two', 'three', 'four'];
        let expected = [1, 2, 3, 4];
        let result   = yield helpers.for(array, function *(value, index) {
          return index + 1;
        }, true);
        expect(result).to.have.members(expected);
        done();
      }).catch(onErr(done));
    });
    it('should accept option to return result array (Object)', function (done) {
      co(function *() {
        let obj      = { one:'foo', two:'bar', three:'biz', four:'baz' };
        let expected = [1, 2, 3, 4];
        let count    = 1;
        let result   = yield helpers.for(obj, function *() {
          return count++;
        }, true);
        expect(result).to.have.members(expected);
        done();
      }).catch(onErr(done));
    });

    it('should accept option to stop if false is returned (Array)', function (done) {
      co(function *() {
        let array  = ['one', 'two', 'three', 'four'];
        let count  = -1;
        let stopAt = 2;
        yield helpers.for(array, function *(value, index) {
          count++;
          return (index < stopAt);
        }, false, true);
        expect(count).to.be.equal(stopAt);
        done();
      }).catch(onErr(done));
    });
    it('should accept option to stop if false is returned (Object)', function (done) {
      co(function *() {
        let obj    = { one:'foo', two:'bar', three:'biz', four:'baz' };
        let count  = -1;
        let stopAt = 'three';
        yield helpers.for(obj, function *(value, key) {
          count++;
          return (key !== stopAt);
        }, false, true);
        expect(Object.keys(obj)[count]).to.be.equal(stopAt);
        done();
      }).catch(onErr(done));
    });
  });


  describe('throw', function () {

  });
});



////////////////////////////////////////////////////////////////////////////////
//
// Exports
//
////////////////////////////////////////////////////////////////////////////////
