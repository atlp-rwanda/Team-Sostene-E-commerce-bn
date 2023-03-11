"use strict";

var _index = _interopRequireDefault(require("../../index.js"));
var _chai = _interopRequireWildcard(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// This is where tests will be

// tip:
/**
 *
 * Here in tests folder is where all test files are.
 * 
 */

_chai.default.should();
_chai.default.use(_chaiHttp.default);
describe('Testing the home route', () => {
  it("should get the content of home route", function (done) {
    _chai.default.request(_index.default).get("/").end((err, response) => {
      response.should.have.status(200);
      done();
    });
  });
});
describe('Testing the home route', () => {
  it("should get the content of home route", function (done) {
    _chai.default.request(_index.default).get("/test").end((err, response) => {
      response.should.have.status(200);
      (0, _chai.expect)(response.body).to.be.a('object');
      done();
    });
  });
});