'use strict'

let mocha  = require('mocha');
let expect = require('chai').expect;
let genit = require('../lib/genit');
let _      = require('lodash');

describe('miscellaneous', function () {
  describe('.isGenerator', function () {
    it('should return true for generators', function () {
      expect(genit.isGenerator(function *() {})).to.be.true;
    });
    it('should return false for non-generators', function () {
      expect(genit.isGenerator(function () {})).to.be.false;
      expect(genit.isGenerator(null)).to.be.false;
    });
  });

  describe('.inject', function () {
    let genitKeys = Object.keys(genit);
    let genLength  = genitKeys.length;
    let baseKeys   = Object.keys(_);
    let baseLength = baseKeys.length;
    genit.inject(_);
    let newLength    = Object.keys(_).length;
    let nestLength   = Object.keys(_.genit || {}).length;
    let newPropcount = newLength + nestLength;

    it('should inject ' + genLength + ' new properties into lodash', function () {
      expect(newPropcount).to.be.equal(genLength + baseLength + 1);
    });
    it('should add unclaimed properties to target object', function () {
      _.each(genitKeys, function (key) {
        expect(_[key]).not.to.be.undefined;
      });
    });

    it('should apply claimed properties to the .genit property', function () {
      _.each(genitKeys, function (key) {
        _.each(baseKeys, function (baseKey) {
          if (baseKey === key) {
            expect(_.genit[key]).not.to.be.undefined;
          }
        })
      });
    });
  });
});
